import { createStore } from 'vuex'
import auth from './modules/auth'
import user from './modules/user'
import role from './modules/role'
import permission from './modules/permission'

const store = createStore({
   modules: {
      auth,
      user,
      role,
      permission,
   }
})

export default store