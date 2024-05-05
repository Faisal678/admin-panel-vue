import { createApp } from 'vue'
import App from './App.vue'
import router from './routes/router';
import store from './store/index'
import Toast from "vue-toastification";
import VueSweetalert2 from 'vue-sweetalert2';

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import 'sweetalert2/dist/sweetalert2.min.css';
import "vue-toastification/dist/index.css";
import './assets/main.css'

createApp(App).use(router).use(store).use(Toast).use(VueSweetalert2).mount('#app')
