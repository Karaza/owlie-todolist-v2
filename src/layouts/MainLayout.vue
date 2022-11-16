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
      <q-list>
        <q-item-label header> Essential Links </q-item-label>
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
import { ref } from "vue";

const leftDrawerOpen = ref(false);

function toggleLeftDrawer() {
  leftDrawerOpen.value = !leftDrawerOpen.value;
}
</script>
