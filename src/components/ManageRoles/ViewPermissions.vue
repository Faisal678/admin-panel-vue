<script setup>
import { computed, onMounted, ref } from 'vue'
import { useStore } from 'vuex';
import { useRoute } from 'vue-router'

const store = useStore()
const route = useRoute()
const isLoading = ref(true);
const permissions = ref([])
const roleId = computed(() => route.params.id)

const fetchPermissionByRole = async () => {
   try {
      isLoading.value = true;
      await store.dispatch('role/fetchRoleById', roleId.value)
      const fetchedRole = store.getters['role/role'];
      const usersPermission = fetchedRole.permissionIds

      await store.dispatch('permission/fetchPermissions');
      const allPermissions = computed(() => store.getters['permission/getPermissions'])
      const newPermissions = allPermissions.value
         .filter((item) => usersPermission.includes(item._id))
         .map((permission) => permission.name);
      permissions.value = newPermissions;
      isLoading.value = false;
   } catch (err) {
      isLoading.value = false;
      toast.error(err.message)
   }
}

onMounted(() => {
   fetchPermissionByRole()
})

</script>

<template>
   <div class="container">
      <div class="row justify-content-center">
         <div class="col-md-8">
            <div class="card">
               <div class="card-header d-flex justify-content-between">
                  <span>Assigned Permissions</span>
               </div>
               <div v-if="isLoading" class="text-center mt-5">
                  <div class="spinner-border text-primary" role="status">
                     <span class="visually-hidden">Loading...</span>
                  </div>
               </div>
               <div v-else class="card-body">
                  <div v-if="error" class="alert alert-danger col-md-6 offset-md-4">{{ error }}</div>
                  <table class="table table-bordered table-striped">
                     <thead class="thead-dark">
                        <tr>
                           <th scope="col">#</th>
                           <th scope="col">Name</th>
                        </tr>
                     </thead>
                     <tbody>
                        <tr v-for="(permission, index) in permissions" :key="permission._id">
                           <th scope="row">{{ index + 1 }}</th>
                           <td>{{ permission }}</td>
                        </tr>
                     </tbody>
                  </table>
               </div>
            </div>
         </div>
      </div>
   </div>
</template>