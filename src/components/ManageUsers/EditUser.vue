<script setup>
import { computed, onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router';
import { useStore } from 'vuex'
import { useToast } from "vue-toastification";

const store = useStore()
const route = useRoute()
const router = useRouter()
const toast = useToast()
const roles = ref([])
const isLoading = ref(true);
const userId = computed(() => route.params.id)
const usersData = computed(() => store.getters['user/getUser'])
const form = ref({
   name: '',
   email: '',
   phone: '',
   roleId: ''
})

const fetchUserById = async () => {
   try {
      isLoading.value = true;
      await store.dispatch('user/fetchUserById', userId.value);
      form.value = usersData.value
      isLoading.value = false;
   } catch (e) {
      toast.error(e.message)
   }
}

const updateUser = async () => {
   try {
      const message = await store.dispatch('user/updateUserById', {
         id: userId.value,
         userData: form.value
      });
      if (message) {
         form.value = {
            name: '',
            email: '',
            phone: '',
            roleId: ''
         }
         router.push('/users')
      }
   } catch (e) {
      toast.error(e.message)
   }
};

const fetchAllRoles = async () => {
   try {
      const result = await store.dispatch('role/fetchRoles')
      roles.value = result
   } catch (err) {
      toast.error(err.message)
   }
}

onMounted(() => {
   fetchAllRoles()
   fetchUserById()
})

</script>

<template>
   <div class="container">
      <div class="row justify-content-center">
         <div class="col-md-8">
            <div class="card">
               <div class="card-header">Edit User </div>
               <div v-if="isLoading" class="text-center mt-5">
                  <div class="spinner-border text-primary" role="status">
                     <span class="visually-hidden">Loading...</span>
                  </div>
               </div>
               <div v-else class="card-body">
                  <form action="#" @submit.prevent="updateUser">
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
                        <label for="role" class="col-md-4 col-form-label text-md-right">Role</label>
                        <div class="col-md-6">
                           <select id="role" class="form-control" name="role" v-model="form.roleId">
                              <option value="" disabled>Select a role</option>
                              <option v-for="role in roles" :key="role._id" :value="role._id">{{ role.name }}</option>
                           </select>
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
