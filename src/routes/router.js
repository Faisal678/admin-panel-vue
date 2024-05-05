import { createRouter, createWebHistory } from 'vue-router';
import Login from '../components/Login.vue';
import Register from '../components/Register.vue';
import Dashboard from '../components/Dashboard.vue';
import Users from '../components/ManageUsers/Users.vue';
import CreateUser from '../components/ManageUsers/CreateUser.vue';
import EditUser from '../components/ManageUsers/EditUser.vue';
import Roles from '../components/ManageRoles/Roles.vue';
import CreateRole from '../components/ManageRoles/CreateRole.vue';
import EditRole from '../components/ManageRoles/EditRole.vue';
import Permissions from '../components/ManagePermissions/Permissions.vue';
import ViewPermissions from '../components/ManageRoles/ViewPermissions.vue';
import CreatePermission from '../components/ManagePermissions/CreatePermission.vue';
import EditPermission from '../components/ManagePermissions/EditPermission.vue';
import store from '../store/index';

const routes = [
   {
      path: '/',
      name: 'Register',
      component: Register,
   },
   {
      path: '/login',
      name: 'Login',
      component: Login,
   },
   {
      path: '/dashboard',
      name: 'Dashboard',
      component: Dashboard,
      meta: { requiresAuth: true },
   },
   {
      path: '/users',
      name: 'Users',
      component: Users,
      meta: { requiresAuth: true },
   },
   {
      path: '/create-user',
      name: 'CreateUser',
      component: CreateUser,
      meta: { requiresAuth: true },
   },
   {
      path: '/edit-user/:id',
      name: 'EditUser',
      component: EditUser,
      meta: { requiresAuth: true },
   },
   {
      path: '/roles',
      name: 'Roles',
      component: Roles,
      meta: { requiresAuth: true },
   },
   {
      path: '/create-role',
      name: 'CreateRole',
      component: CreateRole,
      meta: { requiresAuth: true },
   },
   {
      path: '/edit-role/:id',
      name: 'EditRole',
      component: EditRole,
      meta: { requiresAuth: true },
   },
   {
      path: '/permissions',
      name: 'Permissions',
      component: Permissions,
      meta: { requiresAuth: true },
   },
   {
      path: '/create-permission',
      name: 'CreatePermission',
      component: CreatePermission,
      meta: { requiresAuth: true },
   },
   {
      path: '/edit-permission/:id',
      name: 'EditPermission',
      component: EditPermission,
      meta: { requiresAuth: true },
   },
   {
      path: '/view-permissions/:id',
      name: 'ViewPermissions',
      component: ViewPermissions,
      meta: { requiresAuth: true },
   },
];

const router = createRouter({
   history: createWebHistory(),
   routes,
});

router.beforeEach(async (to, from, next) => {
   const user = store.getters && store.getters['auth/user'];

   if (to.matched.some((record) => record.meta.requiresAuth)) {
      if (!user) {
         next('/login');
      } else {
         next();
      }
   } else {
      next();
   }
});

export default router;
