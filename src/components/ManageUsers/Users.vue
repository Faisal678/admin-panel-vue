<script setup>
import { ref, onMounted, computed, watch } from 'vue'
import { useStore } from 'vuex';
import Swal from 'sweetalert2'
import { fetchPermissionByRole, fetchAllPermissions } from '../../utils/permissionUtils';

const store = useStore()
const usersPermission = ref([]);
const permissions = ref([]);
const isLoading = ref(true);
const users = ref([]);

const user = computed(() => {
   return store.getters['auth/user'] && store.getters['auth/user'] ? store.getters['auth/user'] : null;
});

const fetchAllUsers = async () => {
   try {
      isLoading.value = true;
      await store.dispatch('user/fetchUsers');
      const usersList = store.getters['user/getUsers'];
      const result = usersList.length > 0 && usersList.filter((item) => item._id !== user.value.id);
      users.value = result;
      isLoading.value = false;
   } catch (err) {
      isLoading.value = false;
      toast.error(err.message)
   }
}

onMounted(async () => {
   fetchAllUsers()
   if (user.value?.roleId) {
      await fetchPermissionByRole(store, user.value.roleId, usersPermission);
      await fetchAllPermissions(store, usersPermission, permissions);
   }
})

watch(() => store.getters['auth/user'], (newUser) => {
   if (newUser) {
      fetchAllUsers()
   }
})

const isDisabled = computed(() => {
   return !usersPermission.value.includes('edit_user') && !usersPermission.value.includes('delete_user')
})

const deleteUser = async (id) => {
   const result = await Swal.fire({
      title: 'Are you sure?',
      text: "You want to delete this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes'
   })

   if (result.isConfirmed) {
      try {
         await store.dispatch('user/deleteUserById', id);
      } catch (err) {
         toast.error(err.message)
      }
   }
}

</script>

<template>
   <div class="container">
      <div class="row justify-content-center">
         <div class="col-md-8">
            <div class="card">
               <div class="card-header d-flex justify-content-between">
                  <span>Users</span>
                  <RouterLink to="/create-user" class="btn btn-primary ml-auto" v-if="permissions.includes('create_user')">
                     Create</RouterLink>
               </div>
               <div v-if="isLoading" class="text-center mt-5">
                  <div class="spinner-border text-primary" role="status">
                     <span class="visually-hidden">Loading...</span>
                  </div>
               </div>
               <div v-else class="card-body">
                  <table class="table table-bordered table-striped">
                     <thead class="thead-dark">
                        <tr>
                           <th scope="col">#</th>
                           <th scope="col">Name</th>
                           <th scope="col">Email</th>
                           <th scope="col">Phone</th>
                           <th scope="col">Action</th>
                        </tr>
                     </thead>
                     <tbody>
                        <tr v-for="(user, index) in users" :key="user._id">
                           <th scope="row">{{ index + 1 }}</th>
                           <td>{{ user.name }}</td>
                           <td>{{ user.email }}</td>
                           <td>{{ user.phone }}</td>
                           <td>
                              <div class="btn-group">
                                 <button type="button" class="btn btn-secondary btn-sm dropdown-toggle"
                                    data-bs-toggle="dropdown" aria-expanded="false" :disabled="isDisabled">
                                    Action
                                 </button>
                                 <ul class="dropdown-menu">
                                    <li v-if="permissions.includes('edit_user')">
                                       <router-link :to="{ path: `/edit-user/${user._id}` }"
                                          class="dropdown-item text-primary">Edit</router-link>
                                    </li>
                                    <li v-if="permissions.includes('delete_user')">
                                       <button class="dropdown-item text-danger"
                                          @click="deleteUser(user._id)">Delete</button>
                                    </li>
                                 </ul>
                              </div>
                           </td>
                        </tr>
                     </tbody>
                  </table>
               </div>
            </div>
         </div>
      </div>
   </div>
</template>
