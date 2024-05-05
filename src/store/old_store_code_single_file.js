// import { createStore } from 'vuex'
// import axios from 'axios'

// const apiUrl = import.meta.env.VITE_SERVER_URL

// const store = createStore({
//    state: {
//       user: JSON.parse(localStorage.getItem('user')),
//       token: null
//    },
//    getters: {
//       isLoggedIn(state) {
//          return state.token !== null
//       },
//       user(state) {
//          return state.user
//       }
//    },
//    mutations: {
//       setUser(state, user) {
//          state.user = user
//          localStorage.setItem('user', JSON.stringify({ id: user._id, name: user.name }))
//       },
//       setToken(state, token) {
//          state.token = token
//       },
//       clearAuth(state) {
//          state.user = null
//          state.token = null
//       }
//    },
//    actions: {
//       async register(_, registerData) {
//          try {
//             const response = await axios.post(`${apiUrl}/api/auth/register`, registerData)
//             const { message } = response.data
//             return message
//          } catch (error) {
//             console.error(error)
//             throw error
//          }
//       },
//       async logIn({ commit }, { email, password }) {
//          try {
//             const response = await axios.post(`${apiUrl}/api/auth/login`, { email, password })
//             const { user, token } = response.data
//             commit('setUser', user?.[0])
//             commit('setToken', token)
//             // return user?.[0]
//          } catch (error) {
//             console.error(error)
//             throw error
//          }
//       },
//       async logout({ commit }) {
//          try {
//             await axios.post(`${apiUrl}/api/auth/logout`)
//             commit('clearAuth')
//             localStorage.removeItem('user')
//          } catch (error) {
//             console.error(error)
//             throw error
//          }
//       }
//    },
// })

// export default store
