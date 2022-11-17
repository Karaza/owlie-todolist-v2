<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated class="bg-primary">
      <q-toolbar class="text-blue-grey-2">
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        />
        <q-space></q-space>
        <q-btn flat round dense icon="notifications" class="q-mr-md" />
        <q-btn flat round dense icon="share" class="q-mr-md" />
        <q-btn flat round dense icon="search" />
      </q-toolbar>

      <q-toolbar inset>
        <q-toolbar-title v-show="!addNoteInputVisible" class="q-pt-md q-pb-lg">
          Owlie Todolist
        </q-toolbar-title>
        <q-input
          dark
          filled
          bottom-slots
          v-model="newNote"
          autofocus
          label="Ajouter un élement"
          bg-color="dark"
          color="secondary"
          v-show="addNoteInputVisible"
          class="col col-md-6 q-mx-auto"
        >
          <template v-slot:append>
            <q-btn @click="addNote" dense round icon="add" color="secondary" />
          </template>
        </q-input>
      </q-toolbar>
      <q-btn
        @click="toggleAddNoteInputVisibility"
        v-show="!addNoteInputVisible"
        round
        fab-mini
        icon="add"
        color="secondary"
        class="absolute"
        style="bottom: -17px; left: 15px; z-index: 1"
      />
    </q-header>

    <q-drawer v-model="leftDrawerOpen" :show-if-above="false" bordered>
      <div class="q-pa-md">
        <p class="text-h6">Me connecter</p>
        <p class="text-caption text-grey">
          Entrez vos identifiants pour vous connecter
        </p>
        <q-form @submit.prevent="onSubmit">
          <q-input
            v-model="credentials.email"
            class="q-mb-md"
            filled
            type="email"
            placeholder="Email"
          />
          <q-input
            v-model="credentials.password"
            class="q-mb-md"
            filled
            placeholder="Mot de passe"
            :type="isPwd ? 'password' : 'text'"
          >
            <template v-slot:append>
              <q-icon
                :name="isPwd ? 'visibility_off' : 'visibility'"
                class="cursor-pointer"
                @click="isPwd = !isPwd"
              />
            </template>
          </q-input>
          <div>
            <q-btn
              type="submit"
              @click="register = false"
              label="Me connecter"
              color="secondary"
            /><br />
            <q-btn
              type="submit"
              @click="register = true"
              label="Créer un compte"
              color="primary"
              flat
              class="q-mt-sm"
            />
          </div>
        </q-form>
      </div>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
// Imports
import { reactive, ref } from "vue";
import { useNotesStore } from "src/stores/notesStore";

// Store
const notesStore = useNotesStore();

// Notes
const newNote = ref("");

// Add note
const addNote = () => {
  notesStore.addNote(newNote.value);
  newNote.value = "";
  toggleAddNoteInputVisibility();
};

// Refs
const leftDrawerOpen = ref(false);
const addNoteInputVisible = ref(false);

// Register / login
const register = ref(false);
const isPwd = ref(true);

// Credentiels
const credentials = reactive({
  email: "",
  password: "",
});

// Submit
const onSubmit = () => {
  if (!credentials.email || !credentials.password) {
    alert("Veuillez saisir un email et un mot de passe");
  } else {
    if (register.value) {
      console.log("Register user with these credentials:", credentials);
    } else {
      console.log("Login user with these credentials:", credentials);
    }
  }
};

function toggleLeftDrawer() {
  leftDrawerOpen.value = !leftDrawerOpen.value;
}

function toggleAddNoteInputVisibility() {
  addNoteInputVisible.value = !addNoteInputVisible.value;
}
</script>
