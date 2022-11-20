<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated class="bg-primary q-py-sm">
      <q-toolbar class="text-blue-grey-2">
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="mainStore.toggleLeftDrawer"
          class="q-mb-sm"
        />
        <q-space></q-space>
        <q-toolbar-title class="q-pt-md q-pb-lg">
          Owlie Todolist
        </q-toolbar-title>
        <q-btn flat round dense icon="notifications" class="q-mr-md" />
        <q-btn flat round dense icon="share" class="q-mr-md" />
        <q-btn flat round dense icon="search" />
      </q-toolbar>
      <q-btn
        v-if="authStore.user.uid"
        @click="addNoteModal = true"
        round
        fab-mini
        icon="add"
        color="secondary"
        class="absolute"
        style="bottom: -17px; left: 15px; z-index: 1"
      />
    </q-header>

    <q-drawer
      v-model="mainStore.leftDrawerOpen"
      :show-if-above="false"
      bordered
    >
      <div class="q-pa-md">
        <template v-if="!authStore.user.uid">
          <p class="text-h6">Me connecter / M'enregister</p>
          <p class="text-caption text-grey">
            Entrez vos identifiants pour vous connecter ou pour créer un compte
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
        </template>
        <template v-else>
          <p class="text-h6">Bonjour {{ authStore.user.email }} !</p>
          <q-btn @click="logout" label="Me déconnecter" color="secondary" />
        </template>
      </div>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>

  <q-dialog v-model="addNoteModal">
    <q-card style="width: 700px; max-width: 80vw">
      <q-card-section>
        <div class="text-h6">Ajouter une note</div>
      </q-card-section>
      <q-card-section class="q-pt-none">
        <q-form @submit="addNote" class="q-gutter-md">
          <q-input
            filled
            v-model="newNoteTitle"
            label="Titre de la note"
            hint="Celui-ci ne pourra pas être modifié après création"
            :rules="[(val) => val.length > 0 || 'Veuillez saisir un titre']"
          />
          <q-input
            filled
            v-model="newNoteContent"
            label="Contenu de la note"
            :rules="[
              (val) =>
                val.length > 0 || 'Veuillez saisir au moins un caractère',
            ]"
          />
          <div class="text-right">
            <q-btn
              label="Annuler"
              color="primary"
              flat
              class="q-ml-sm"
              v-close-popup
            />
            <q-btn label="Ajouter" type="submit" color="primary" />
          </div>
        </q-form>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script setup lang="ts">
// Imports
import { reactive, ref } from "vue";
import { useNotesStore } from "src/stores/notesStore";
import { useAuthStore } from "src/stores/authStore";
import { useMainStore } from "src/stores/mainStore";

// Store
const notesStore = useNotesStore();
const authStore = useAuthStore();
const mainStore = useMainStore();

// Notes
const newNoteTitle = ref("");
const newNoteContent = ref("");

// Add note
const addNoteModal = ref(false);
const addNote = () => {
  notesStore.addNote(newNoteTitle.value, newNoteContent.value);

  newNoteTitle.value = "";
  newNoteContent.value = "";

  addNoteModal.value = false;
};

// Register / login
const register = ref(false);
const isPwd = ref(true);

// Credentials
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
      authStore.registerUser(credentials);
    } else {
      authStore.loginUser(credentials);
    }
  }
};

// Logout
const logout = () => {
  credentials.email = "";
  credentials.password = "";
  authStore.logoutUser();
};
</script>
