<script setup>
import { ref } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import { useToast } from "vue-toastification";

const store = useStore()
const router = useRouter()
const toast = useToast()
const email = ref('')
const password = ref('')

const login = async () => {
   try {
      await store.dispatch('auth/logIn', {
         email: email.value,
         password: password.value
      })
      router.push('/dashboard')
   }
   catch (err) {
      toast.error(err.message)
   }
}

</script>

<template>
   <div class="container mt-5">
      <div class="row justify-content-center">
         <div class="col-md-6">
            <div class="card">
               <div class="card-header">Login</div>
               <div class="card-body">
                  <form action="#" @submit.prevent="login">
                     <div class="form-group row pt-3">
                        <label for="email" class="col-md-4 col-form-label text-md-right">Email</label>
                        <div class="col-md-6">
                           <input id="email" type="email" class="form-control" name="email" value required autofocus
                              v-model="email" />
                        </div>
                     </div>
                     <div class="form-group row pt-3">
                        <label for="password" class="col-md-4 col-form-label text-md-right">Password</label>
                        <div class="col-md-6">
                           <input id="password" type="password" class="form-control" name="password" required
                              v-model="password" />
                        </div>
                     </div>
                     <div class="form-group row pt-3 mb-0">
                        <div class="col-md-8 offset-md-4">
                           <button type="submit" class="btn btn-primary">Login</button>
                        </div>
                     </div>
                  </form>
               </div>
               <div class="card-footer text-center">
                  <router-link to="/">Create your account? Register</router-link>
               </div>
            </div>
         </div>
      </div>
   </div>
</template>
