<template>
  <q-page class="row justify-evenly q-mt-lg">
    <p v-if="!notesStore.notesLoaded">Chargement...</p>
    <template v-else>
      <Notes title="Notes" :notes="notesStore.notes" />
    </template>
  </q-page>
</template>

<script setup lang="ts">
// Imports
import { onMounted } from "vue";
import Notes from "components/Notes.vue";
import { useNotesStore } from "src/stores/notesStore";

// Store
const notesStore = useNotesStore();

// Connecting to firestore
onMounted(() => notesStore.getNotes());
</script>
