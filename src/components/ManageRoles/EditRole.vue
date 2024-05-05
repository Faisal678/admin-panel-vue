<script setup>
import { computed, onMounted, ref } from 'vue'
import { useStore } from 'vuex';
import { useRoute, useRouter } from 'vue-router';
import Multiselect from '@vueform/multiselect'
import { useToast } from "vue-toastification";

const store = useStore()
const route = useRoute()
const router = useRouter()
const toast = useToast()
const options = ref([])
const isLoading = ref(true)
const roleId = computed(() => route.params.id)
const allPermissions = computed(() => store.getters['permission/getPermissions'])

const roleData = ref({
   name: '',
   permissionIds: []
})

const fetchPermissionByRole = async () => {
   try {
      isLoading.value = true;
      await store.dispatch('role/fetchRoleById', roleId.value)
      const fetchedRole = store.getters['role/role'];
      roleData.value.name = fetchedRole.name
      roleData.value.permissionIds = fetchedRole.permissionIds

      await store.dispatch('permission/fetchPermissions')
      const result = allPermissions.value.length > 0 && allPermissions.value.map((permission) => ({
         key: permission._id,
         value: permission._id,
         label: permission.name
      }));
      options.value = result
      isLoading.value = false;
   } catch (err) {
      isLoading.value = false;
      toast.error(err.message)
   }
}

onMounted(() => {
   if (roleId.value) {
      fetchPermissionByRole()
   }
})

const updateRole = async () => {
   try {
      const message = await store.dispatch('role/updateRoleById', { id: roleId.value, roleData: roleData.value })
      if (message) {
         router.push('/roles')
      }
   } catch (e) {
      toast.error(e.message)
   }
}

</script>
 
<template>
   <div class="container">
      <div class="row justify-content-center">
         <div class="col-md-8">
            <div class="card">
               <div class="card-header">Edit Role </div>
               <div v-if="isLoading" class="text-center mt-5">
                  <div class="spinner-border text-primary" role="status">
                     <span class="visually-hidden">Loading...</span>
                  </div>
               </div>
               <div v-else class="card-body">
                  <form action="#" @submit.prevent="updateRole">
                     <div class="form-group row pt-3">
                        <label for="name" class="col-md-4 col-form-label text-md-right">Name</label>
                        <div class="col-md-6">
                           <input id="name" type="name" class="form-control" name="name" required autofocus
                              v-model="roleData.name" />
                        </div>
                     </div>
                     <div class="form-group row pt-3">
                        <label for="permission" class="col-md-4 col-form-label text-md-right">Select Permissions</label>
                        <div class="col-md-6">
                           <Multiselect v-model="roleData.permissionIds" :options="options" mode="tags"
                              :close-on-select="false" :searchable="true" placeholder="Select Permissions" />
                        </div>
                     </div>
                     <div class="form-group row pt-3 mb-0">
                        <div class="col-md-8 offset-md-4">
                           <button type="submit" class="btn btn-primary">Save</button>
                        </div>
                     </div>
                  </form>
               </div>
            </div>
         </div>
      </div>
   </div>
</template>
