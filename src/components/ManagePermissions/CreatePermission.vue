<script setup>
import { ref } from 'vue'
import { useStore } from 'vuex';
import { useToast } from "vue-toastification";

const store = useStore()
const toast = useToast()
const name = ref('')

const createPermission = async () => {
   try {
      const message = await store.dispatch('permission/createPermission', { name: name.value })
      if (message) {
         name.value = ''
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
               <div class="card-header">Create Permission </div>
               <div class="card-body">
                  <div class="card-body">
                     <form action="#" @submit.prevent="createPermission">
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
   </div>
</template>
