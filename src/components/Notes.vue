<template>
  <p v-if="!notesStore.notes.length" class="text-h6">
    Aucun élement pour le moment...
  </p>
  <div v-else class="q-pa-md col-md-8 col">
    <transition-group
      appear
      enter-active-class="animated fadeIn slow"
      leave-active-class="animated fadeOut slow"
    >
      <div v-for="(note, index) in notes" :key="index" class="q-mb-md">
        <div class="q-mb-md">
          <div
            @click="note.expanded = !note.expanded"
            title="Cliquez pour dérouler le contenu"
            class="row justify-between items-center bg-grey-2 q-py-xs q-px-md cursor-pointer"
          >
            <span class="text-subtitle1">{{ note.title }}</span>
            <q-checkbox
              cursor-trash
              @click="notesStore.deleteNote(note.id as string)"
              v-model="note.done"
              class="text-right"
              color="secondary"
              title="Supprimer la note"
            />
          </div>
          <div
            class="cursor-edit text-caption q-py-xs q-px-md"
            :class="{ ellipsis: !note.expanded }"
            title="Cliquez pour éditer"
          >
            {{ note.content }}
            <q-popup-edit
              v-model="note.content"
              :validate="(val: string) => val.length > 0"
              v-slot="scope"
            >
              <q-input
                @keyup.enter="editNote(note.id as string, scope.value, scope)"
                v-model="scope.value"
                dense
                autofocus
              >
                <template v-slot:after>
                  <q-btn
                    flat
                    dense
                    color="negative"
                    icon="cancel"
                    @click.stop.prevent="scope.cancel"
                    :rules="[
                    (val: string) =>
                      scope.validate(val) || 'More than 5 chars required',
                  ]"
                  />

                  <q-btn
                    flat
                    dense
                    color="positive"
                    icon="check_circle"
                    @click.stop.prevent="
                      editNote(note.id as string, scope.value, scope)
                    "
                    :disable="
                      scope.validate(scope.value) === false ||
                      scope.initialValue === scope.value
                    "
                  />
                </template>
              </q-input>
            </q-popup-edit>
          </div>
        </div>
      </div>
    </transition-group>
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

const editNote = (id: string, noteContent: string, scope: any) => {
  notesStore.editNote(id, noteContent);
  scope.set();
};
</script>
