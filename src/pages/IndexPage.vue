<template>
  <q-page class="row justify-evenly q-mt-lg">
    <Notes title="Notes" :todos="notesStore.notes" />
  </q-page>
</template>

<script setup lang="ts">
// Imports
import Notes from "components/Notes.vue";
import { useNotesStore } from "src/stores/notesStore";

// Store
const notesStore = useNotesStore();
</script>
