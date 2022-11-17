<template>
  <router-view />
</template>

<script setup lang="ts">
// Imports
import { onMounted } from "vue";
import { useNotesStore } from "src/stores/notesStore";

// Store
const notesStore = useNotesStore();

// Connecting to firestore
onMounted(() => notesStore.getNotes());
</script>
