<script setup>
import { RouterView } from 'vue-router';
import Navbar from './components/Navbar.vue';
import Sidebar from './components/Sidebar.vue';

</script>

<template>
  <main>
    <Navbar />
    <Sidebar />
    <RouterView />
  </main>
</template>
