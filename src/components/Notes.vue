<template>
  <div class="q-pa-md col-md-8 col">
    <div v-for="note in notes" :key="note.id" class="q-mb-md">
      <div class="q-mb-md">
        <div
          @click="note.expanded = !note.expanded"
          class="row justify-between items-center bg-grey-2 q-py-xs q-px-md"
        >
          <span class="text-subtitle1">{{ note.title }}</span>
          <q-checkbox
            @click="notesStore.deleteNote(note.id)"
            v-model="note.done"
            class="text-right"
          />
        </div>
        <div
          class="text-caption q-py-xs q-px-md"
          :class="{ ellipsis: !note.expanded }"
        >
          {{ note.content }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// Imports
import { Note } from "./models";
import { useNotesStore } from "src/stores/notesStore";

// Store
const notesStore = useNotesStore();

// Props
interface Props {
  notes?: Note[];
}
const props = withDefaults(defineProps<Props>(), {
  notes: () => [],
});
</script>
