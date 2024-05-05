import axios from 'axios'
import { useToast } from 'vue-toastification'

const toast = useToast()
const apiUrl = import.meta.env.VITE_SERVER_URL

const state = {
   user: JSON.parse(localStorage.getItem('user')),
   token: null
}

const getters = {
   isLoggedIn: (state) => state.token !== null,
   user: (state) => state.user
}

const mutations = {
   setUser(state, user) {
      state.user = user
      localStorage.setItem('user', JSON.stringify({ id: user._id, name: user.name, roleId: user.roleId }))
   },
   setToken(state, token) {
      state.token = token
   },
   clearAuth(state) {
      state.user = null
      state.token = null
   }
}

const actions = {
   async register(_, registerData) {
      try {
         const response = await axios.post(`${apiUrl}/api/auth/register`, registerData)
         const { message } = response.data
         toast.success(message)
         return message
      } catch (error) {
         console.error(error)
         const message = error.response?.data?.message || 'An error occurred';
         throw new Error(message)
      }
   },
   async logIn({ commit }, { email, password }) {
      try {
         const response = await axios.post(`${apiUrl}/api/auth/admin-login`, { email, password })
         const { user, token } = response.data
         commit('setUser', user)
         commit('setToken', token)
         // return user
      } catch (error) {
         console.error(error);
         const message = error.response?.data?.message || 'An error occurred';
         throw new Error(message);
      }
   },
   async logout({ commit }) {
      try {
         await axios.post(`${apiUrl}/api/auth/logout`)
         commit('clearAuth')
         localStorage.removeItem('user')
      } catch (error) {
         console.error(error)
         throw error
      }
   }
}

export default {
   namespaced: true,
   state,
   getters,
   mutations,
   actions,
}
