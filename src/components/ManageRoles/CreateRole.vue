<script setup>
import { computed, onMounted, ref } from 'vue'
import { useStore } from 'vuex';
import Multiselect from '@vueform/multiselect'
import { useToast } from "vue-toastification";

const store = useStore()
const toast = useToast()
const name = ref('')
const value = ref([])
const options = ref([])
const permissionsData = computed(() => store.getters['permission/getPermissions'])
console.log("🚀 ~ file: CreateRole.vue:13 ~ permissionsData:", permissionsData)

const createRole = async () => {
   try {
      const message = await store.dispatch('role/createRole', { name: name.value, permissionIds: value.value })
      if (message) {
         name.value = ''
         value.value = []
      }
   } catch (err) {
      toast.error(err.message)
   }
}

const fetchAllPermissions = async () => {
   try {
      await store.dispatch('permission/fetchPermissions')
      if (permissionsData.value.length > 0) {
         const result = await permissionsData.value.map((permission) => ({
            key: permission._id,
            value: permission._id,
            label: permission.name,
         }));
         options.value = result
      }
   }
   catch (err) {
      toast.error(err.message)
   }
}

onMounted(() => {
   fetchAllPermissions()
})

</script>

<template>
   <div class="container">
      <div class="row justify-content-center">
         <div class="col-md-8">
            <div class="card">
               <div class="card-header">Create Role </div>
               <div class="card-body">
                  <div class="card-body">
                     <form action="#" @submit.prevent="createRole">
                        <div class="form-group row pt-3">
                           <label for="name" class="col-md-4 col-form-label text-md-right">Name</label>
                           <div class="col-md-6">
                              <input id="name" type="name" class="form-control" name="name" value required autofocus
                                 v-model="name" />
                           </div>
                        </div>
                        <div class="form-group row pt-3">
                           <label for="permission" class="col-md-4 col-form-label text-md-right">Select Permissions</label>
                           <div class="col-md-6">
                              <Multiselect v-model="value" :options="options" mode="tags" :close-on-select="false"
                                 :searchable="true" placeholder="Select Permissions" />
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
   </div>
</template>

<style src="@vueform/multiselect/themes/default.css"></style>
