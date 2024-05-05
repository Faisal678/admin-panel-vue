<script setup>
import { computed, onMounted, ref, watch } from 'vue';
import { useStore } from 'vuex';
import { fetchPermissionByRole, fetchAllPermissions } from '../utils/permissionUtils';

const store = useStore();
const usersPermission = ref([]);
const permissions = ref([]);
const isLoading = ref(true);

const user = computed(() => {
   return store.getters['auth/user'] && store.getters['auth/user'] ? store.getters['auth/user'] : null;
});

onMounted(async () => {
   if (user.value?.roleId) {
      isLoading.value = true;
      await fetchPermissionByRole(store, user.value.roleId, usersPermission);
      await fetchAllPermissions(store, usersPermission, permissions);
      isLoading.value = false;
   }
});

watch(user, async (newValue) => {
   if (newValue?.roleId) {
      isLoading.value = true;
      await fetchPermissionByRole(store, newValue.roleId, usersPermission);
      await fetchAllPermissions(store, usersPermission, permissions);
      isLoading.value = false;
   }
});
</script>

<template>
   <nav class="sidebar col-md-3 col-lg-2 d-md-block bg-light collapse" v-if="user" style="">
      <div class="position-sticky pt-3">
         <div v-if="isLoading" class="text-center mt-5">
            <div class="spinner-border text-primary" role="status">
               <span class="visually-hidden">Loading...</span>
            </div>
         </div>
         <ul v-else class="nav flex-column">
            <li class="nav-item">
               <router-link class="nav-link" to="/dashboard">Dashboard</router-link>
            </li>
            <li v-if="permissions.length > 0 && permissions.includes('view_users')" class="nav-item">
               <router-link class="nav-link" to="/users">Manage Users</router-link>
            </li>
            <li v-if="permissions.length > 0 && permissions.includes('view_roles')" class="nav-item">
               <router-link class="nav-link" to="/roles">Manage Roles</router-link>
            </li>
            <li v-if="permissions.length > 0 && permissions.includes('view_permissions')" class="nav-item">
               <router-link class="nav-link" to="/permissions">Manage Permissions</router-link>
            </li>
         </ul>
      </div>
   </nav>
</template>

<style>
.sidebar {
   border-right: 1px solid #dee2e6;
}
</style>
