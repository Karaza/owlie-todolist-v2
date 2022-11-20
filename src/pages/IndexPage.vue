<template>
  <q-page class="row justify-evenly q-mt-lg">
    <template v-if="!authStore.user.uid">
      <div class="text-center">
        <p class="text-caption">
          Afin d'accéder à votre Todolist,<br />merci de bien vouloir vous
          authentifier.
        </p>
        <q-btn
          @click="mainStore.toggleLeftDrawer"
          label="M'authentifier"
          color="secondary"
        />
      </div>
    </template>
    <template v-else>
      <p v-if="!notesStore.notesLoaded">Chargement...</p>
      <template v-else>
        <Notes title="Notes" :notes="notesStore.notes" />
      </template>
    </template>
  </q-page>
</template>

<script setup lang="ts">
// Imports
import Notes from "components/Notes.vue";
import { useNotesStore } from "src/stores/notesStore";
import { useAuthStore } from "src/stores/authStore";
import { useMainStore } from "src/stores/mainStore";

// Store
const notesStore = useNotesStore();
const authStore = useAuthStore();
const mainStore = useMainStore();
</script>
