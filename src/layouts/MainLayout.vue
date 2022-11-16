<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated class="bg-primary q-pt-md">
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
        <q-toolbar-title> Owlie Todolist </q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" show-if-above bordered>
      <div class="q-pa-md">
        <q-title class="text-h6">Me connecter</q-title>
        <p class="text-caption text-grey">
          Entrez vos identifiants pour vous connecter
        </p>
        <q-form>
          <q-input
            v-model="email"
            class="q-mb-md"
            filled
            type="email"
            placeholder="Email"
          />
          <q-input
            v-model="password"
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
            <q-btn label="Me connecter" type="submit" color="secondary" /><br />
            <q-btn
              label="Créer un compte"
              type="reset"
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
import { ref } from "vue";

const leftDrawerOpen = ref(false);
const email = ref("");
const password = ref("");
const isPwd = ref(true);

function toggleLeftDrawer() {
  leftDrawerOpen.value = !leftDrawerOpen.value;
}
</script>
