<script setup>
import { computed } from "vue";
import { useStore } from "vuex";

const store = useStore();
const userName = computed(() => {
   return store.getters['auth/user'] && store.getters['auth/user'].name ? store.getters['auth/user'].name : null;
});

</script>

<template>
   <div class="container">
      <div class="row justify-content-center">
         <div class="col-md-8">
            <div class="card">
               <div class="card-header">Welcome, {{ userName }} </div>
               <div class="card-body">
               </div>
            </div>
         </div>
      </div>
   </div>
</template>
