<script setup>
import { computed, onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router';
import { useStore } from 'vuex';

const store = useStore()
const route = useRoute()
const router = useRouter()
const name = ref('')
const isLoading = ref(true)
const permissionId = computed(() => route.params.id)
const permissionsData = computed(() => store.getters['permission/getPermission'])

const fetchPermissionById = async () => {
   try {
      isLoading.value = true;
      await store.dispatch('permission/fetchPermissionById', permissionId.value)
      name.value = permissionsData.value.name
      isLoading.value = false;
   } catch (err) {
      isLoading.value = false;
      toast.error(err.message)
   }
}

onMounted(() => {
   fetchPermissionById()
})

const updatePermission = async () => {
   try {
      const permissionData = {
         name: name.value
      }
      const message = await store.dispatch('permission/updatePermission', { id: permissionId.value, permissionData })
      if (message) {
         name.value = '';
         router.push('/permissions');
      }
   } catch (err) {
      toast.error(err.message)
   }
}

</script>

<template>
   <div class="container">
      <div class="row justify-content-center">
         <div class="col-md-8">
            <div class="card">
               <div class="card-header">Edit Permission </div>
               <div v-if="isLoading" class="text-center mt-5">
                  <div class="spinner-border text-primary" role="status">
                     <span class="visually-hidden">Loading...</span>
                  </div>
               </div>
               <div v-else class="card-body">
                  <form action="#" @submit.prevent="updatePermission">
                     <div class="form-group row pt-3">
                        <label for="name" class="col-md-4 col-form-label text-md-right">Name</label>
                        <div class="col-md-6">
                           <input id="name" type="name" class="form-control" name="name" value required autofocus
                              v-model="name" />
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
