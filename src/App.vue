<template>
  <router-view />
</template>

<script setup lang="ts">
// Imports
import { onMounted } from "vue";
import { useAuthStore } from "src/stores/authStore";

// Store
const authStore = useAuthStore();

// Connecting to firestore
onMounted(() => authStore.init());
</script>
