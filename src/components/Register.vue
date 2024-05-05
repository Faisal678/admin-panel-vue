<script setup>
import { ref } from 'vue'
import { useStore } from 'vuex'
import { useToast } from "vue-toastification";

const store = useStore()
const toast = useToast()
const form = ref({
   name: '',
   email: '',
   phone: '',
   password: ''
})

const Register = async () => {
   try {
      const message = await store.dispatch('auth/register', form.value)
      if (message) {
         alert(message)
         form.value = {
            name: '',
            email: '',
            phone: '',
            password: ''
         }
      }
   } catch (err) {
      toast.error(err.message)
   }
}

</script>

<template>
   <div class="container mt-5">
      <div class="row justify-content-center">
         <div class="col-md-6">
            <div class="card">
               <div class="card-header">Register</div>
               <div class="card-body">
                  <form action="#" @submit.prevent="Register">
                     <div class="form-group row pt-3">
                        <label for="name" class="col-md-4 col-form-label text-md-right">Name</label>
                        <div class="col-md-6">
                           <input id="name" type="name" class="form-control" name="name" value required autofocus
                              v-model="form.name" />
                        </div>
                     </div>
                     <div class="form-group row pt-3">
                        <label for="email" class="col-md-4 col-form-label text-md-right">Email</label>
                        <div class="col-md-6">
                           <input id="email" type="email" class="form-control" name="email" value required autofocus
                              v-model="form.email" />
                        </div>
                     </div>
                     <div class="form-group row pt-3">
                        <label for="number" class="col-md-4 col-form-label text-md-right">Phone</label>
                        <div class="col-md-6">
                           <input id="number" type="number" class="form-control" name="phone" value required autofocus
                              v-model="form.phone" />
                        </div>
                     </div>
                     <div class="form-group row pt-3">
                        <label for="password" class="col-md-4 col-form-label text-md-right">Password</label>
                        <div class="col-md-6">
                           <input id="password" type="password" class="form-control" name="password" required
                              v-model="form.password" />
                        </div>
                     </div>
                     <div class="form-group row pt-3 mb-0">
                        <div class="col-md-8 offset-md-4">
                           <button type="submit" class="btn btn-primary">Register</button>
                        </div>
                     </div>
                  </form>
               </div>
               <div class="card-footer text-center">
                  <router-link to="/login">Already registered? Login</router-link>
               </div>
            </div>
         </div>
      </div>
   </div>
</template>
