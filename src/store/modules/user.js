import axios from 'axios'
import { useToast } from 'vue-toastification'

const toast = useToast()
const apiUrl = import.meta.env.VITE_SERVER_URL

const state = {
   users: [],
   user: null
}

const getters = {
   getUsers: (state) => state.users,
   getUser: (state) => state.user
}

const mutations = {
   setUsers(state, users) {
      state.users = users
   },
   setUser(state, user) {
      state.user = user
   },
   addUser(state, user) {
      state.users.push(user)
   },
   updateUser(state, user) {
      const index = state.users.findIndex(u => u._id === user._id)
      if (index !== -1) {
         state.users.splice(index, 1, user)
      }
   },
   deleteUser(state, userId) {
      state.users = state.users.filter(u => u._id !== userId)
   }
}

const actions = {
   async fetchUsers({ commit }) {
      try {
         const response = await axios.get(`${apiUrl}/api/user`)
         commit('setUsers', response.data)
         // return response.data
      } catch (error) {
         console.error(error)
         const message = error.response?.data?.message || 'An error occurred';
         throw new Error(message)
      }
   },
   async fetchUserById({ commit }, userId) {
      try {
         const response = await axios.get(`${apiUrl}/api/user/${userId}`)
         const user = response.data
         commit('setUser', user)
      } catch (error) {
         console.error(error)
         const message = error.response?.data?.message || 'An error occurred';
         throw new Error(message)
      }
   },
   async createUser(_, userData) {
      try {
         const response = await axios.post(`${apiUrl}/api/user`, userData)
         const { message } = response.data
         toast.success(message);
         return message;
      } catch (error) {
         console.error(error)
         const message = error.response?.data?.message || 'An error occurred';
         throw new Error(message)
      }
   },
   async updateUserById({ commit }, { id, userData }) {
      try {
         const response = await axios.put(`${apiUrl}/api/user/${id}`, userData)
         const { message } = response.data
         commit('updateUser', response.data)
         toast.success(message);
         return message
      } catch (error) {
         console.error(error)
         const message = error.response?.data?.message || 'An error occurred';
         throw new Error(message)
      }
   },
   async deleteUserById({ commit }, userId) {
      try {
         const response = await axios.delete(`${apiUrl}/api/user/${userId}`)
         const { message } = response.data
         commit('deleteUser', userId)
         toast.success(message);
      } catch (error) {
         console.error(error)
         const message = error.response?.data?.message || 'An error occurred';
         throw new Error(message)
      }
   }
}

export default {
   namespaced: true,
   state,
   getters,
   mutations,
   actions
}
