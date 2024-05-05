import axios from 'axios';
import { useToast } from 'vue-toastification'

const toast = useToast()
const apiUrl = import.meta.env.VITE_SERVER_URL;

const state = {
   roles: [],
   role: null,
};

const getters = {
   roles: (state) => state.roles,
   role: (state) => state.role,
};

const mutations = {
   setRoles(state, roles) {
      state.roles = roles;
   },
   setRole(state, role) {
      state.role = role;
   },
   deleteRole(state, id) {
      state.roles = state.roles.filter(p => p._id !== id)
   }
};

const actions = {
   async fetchRoles({ commit }) {
      try {
         const response = await axios.get(`${apiUrl}/api/role`);
         commit('setRoles', response.data);
         return response.data
      } catch (error) {
         console.error(error);
         const message = error.response?.data?.message || 'An error occurred';
         throw new Error(message);
      }
   },
   async fetchRoleById({ commit }, id) {
      try {
         const response = await axios.get(`${apiUrl}/api/role/${id}`);
         commit('setRole', response.data);
         // return response.data;
      } catch (error) {
         console.error(error);
         const message = error.response?.data?.message || 'An error occurred';
         throw new Error(message);
      }
   },
   async createRole({ }, roleData) {
      try {
         const response = await axios.post(`${apiUrl}/api/role`, roleData);
         const { message } = response.data
         toast.success(message);
         return message;
      } catch (error) {
         console.error(error);
         const message = error.response?.data?.message || 'An error occurred';
         throw new Error(message);
      }
   },
   async updateRoleById({ }, { id, roleData }) {
      try {
         const response = await axios.put(`${apiUrl}/api/role/${id}`, roleData);
         const { message } = response.data
         toast.success(message);
         return message;
      } catch (error) {
         console.error(error);
         const message = error.response?.data?.message || 'An error occurred';
         throw new Error(message);
      }
   },
   async deleteRoleById({ commit }, id) {
      try {
         const response = await axios.delete(`${apiUrl}/api/role/${id}`);
         const { message } = response.data
         commit('deleteRole', id);
         toast.success(message);
         return message;
      } catch (error) {
         console.error(error);
         const message = error.response?.data?.message || 'An error occurred';
         throw new Error(message);
      }
   },
};

export default {
   namespaced: true,
   state,
   getters,
   mutations,
   actions,
};
