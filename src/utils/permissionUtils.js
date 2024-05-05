import { ref } from 'vue';

const error = ref(null);

export const fetchPermissionByRole = async (store, roleId, usersPermission) => {
   try {
      await store.dispatch('role/fetchRoleById', roleId);
      const role = store.getters['role/role'];
      usersPermission.value = role?.permissionIds;
   } catch (e) {
      error.value = e.message;
   }
};

export const fetchAllPermissions = async (store, usersPermission, permissions) => {
   try {
      await store.dispatch('permission/fetchPermissions');
      const allPermissions = store.getters['permission/getPermissions'];
      const newPermissions = allPermissions
         .filter((item) => usersPermission.value.includes(item._id))
         .map((permission) => permission.name);
      permissions.value = newPermissions;
   } catch (e) {
      error.value = e.message;
   }
};
