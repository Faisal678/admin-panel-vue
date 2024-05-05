import axios from 'axios'
import { useToast } from 'vue-toastification'

const toast = useToast()
const apiUrl = import.meta.env.VITE_SERVER_URL

const state = {
  permissions: [],
  permission: null
}

const getters = {
  getPermissions: (state) => state.permissions,
  getPermission: (state) => state.permission
}

const mutations = {
  setPermissions(state, permissions) {
    state.permissions = permissions
  },
  setPermission(state, permission) {
    state.permission = permission
  },
  addPermission(state, permission) {
    state.permissions.push(permission)
  },
  updatePermission(state, permission) {
    const index = state.permissions.findIndex(p => p._id === permission._id)
    if (index !== -1) {
      state.permissions.splice(index, 1, permission)
    }
  },
  deletePermission(state, permissionId) {
    state.permissions = state.permissions.filter(p => p._id !== permissionId)
  }
}

const actions = {
  async fetchPermissions({ commit }) {
    try {
      const response = await axios.get(`${apiUrl}/api/permission`)
      commit('setPermissions', response.data)
    } catch (error) {
      console.error(error)
      const message = error.response?.data?.message || 'An error occurred';
      throw new Error(message)
    }
  },
  async fetchPermissionById({ commit }, permissionId) {
    try {
      const response = await axios.get(`${apiUrl}/api/permission/${permissionId}`)
      const permission = response.data
      commit('setPermission', permission)
    } catch (error) {
      console.error(error)
      const message = error.response?.data?.message || 'An error occurred';
      throw new Error(message)
    }
  },
  async createPermission(_, permissionData) {
    try {
      const response = await axios.post(`${apiUrl}/api/permission`, permissionData)
      const { message } = response.data
      toast.success(message)
      return message;
    } catch (error) {
      console.error(error)
      const message = error.response?.data?.message || 'An error occurred';
      throw new Error(message)
    }
  },
  async updatePermission({ commit }, { id, permissionData }) {
    try {
      const response = await axios.put(`${apiUrl}/api/permission/${id}`, permissionData)
      const { message } = response.data
      commit('updatePermission', response.data)
      toast.success(message)
      return message
    } catch (error) {
      console.error(error)
      const message = error.response?.data?.message || 'An error occurred';
      throw new Error(message)
    }
  },
  async deletePermissionById({ commit }, permissionId) {
    try {
      const response = await axios.delete(`${apiUrl}/api/permission/${permissionId}`)
      commit('deletePermission', permissionId)
      const { message } = response.data
      toast.success(message)
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
