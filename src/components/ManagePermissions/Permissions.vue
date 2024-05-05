<script setup>
import { ref, onMounted, computed } from 'vue'
import { useStore } from 'vuex';
import Swal from 'sweetalert2'
import { fetchPermissionByRole, fetchAllPermissions } from '../../utils/permissionUtils';

const store = useStore()
const usersPermission = ref([]);
const permissions = ref([]);
const isLoading = ref(true);
const permissionsData = computed(() => store.getters['permission/getPermissions'])

const user = computed(() => {
   return store.getters['auth/user'] && store.getters['auth/user'] ? store.getters['auth/user'] : null;
});

const fetchAllPermissionsData = async () => {
   try {
      isLoading.value = true;
      await store.dispatch('permission/fetchPermissions')
      isLoading.value = false;
   } catch (err) {
      isLoading.value = false;
      toast.error(err.message)
   }
}

onMounted(async () => {
   fetchAllPermissionsData()
   if (user.value?.roleId) {
      await fetchPermissionByRole(store, user.value.roleId, usersPermission);
      await fetchAllPermissions(store, usersPermission, permissions);
   }
})

const isDisabled = computed(() => {
   return !permissions.value.includes('edit_permission') && !permissions.value.includes('delete_permission')
})

const deletePermission = async (id) => {
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
         await await store.dispatch('permission/deletePermissionById', id);
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
                  <span>Permissions</span>
                  <RouterLink to="/create-permission" class="btn btn-primary ml-auto"
                     v-if="permissions.includes('create_permission')">Create</RouterLink>
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
                           <th scope="col">Action</th>
                        </tr>
                     </thead>
                     <tbody>
                        <tr v-for="(permission, index) in permissionsData" :key="permission._id">
                           <th scope="row">{{ index + 1 }}</th>
                           <td>{{ permission.name }}</td>
                           <td>
                              <div class="btn-group">
                                 <button type="button" class="btn btn-secondary btn-sm dropdown-toggle"
                                    data-bs-toggle="dropdown" aria-expanded="false" :disabled="isDisabled">
                                    Action
                                 </button>
                                 <ul class="dropdown-menu">
                                    <li v-if="permissions.includes('edit_permission')">
                                       <router-link :to="{ path: `/edit-permission/${permission._id}` }"
                                          class="dropdown-item text-primary">Edit</router-link>
                                    </li>
                                    <li v-if="permissions.includes('delete_permission')">
                                       <button class="dropdown-item text-danger"
                                          @click="deletePermission(permission._id)">Delete</button>
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