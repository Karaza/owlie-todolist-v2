<template>
  <p v-if="!notesStore.notes.length" class="text-h6">
    Aucun élement pour le moment...
  </p>
  <div v-else class="q-pa-md col-md-8 col">
    <div class="row justify-center q-mb-sm q-gutter-md">
      <q-btn @click="notesStore.checkAll" label="Tout cocher" color="primary" />
      <q-btn
        @click="notesStore.uncheckAll"
        label="Tout décocher"
        outline
        color="primary"
      />
    </div>
    <div class="text-center">
      <q-btn
        class="q-mb-lg"
        @click="notesStore.clearDoneNotes"
        label="Supprimer les notes cochées"
        flat
        color="dark"
      />
    </div>
    <transition-group
      appear
      enter-active-class="animated fadeIn slow"
      leave-active-class="animated fadeOut slow"
    >
      <div v-for="(note, index) in notes" :key="index" class="q-mb-lg">
        <div class="q-mb-md">
          <div
            @click="note.expanded = !note.expanded"
            title="Cliquez pour dérouler le contenu"
            class="row justify-between items-center q-py-xs q-px-md cursor-pointer"
            :class="note.done ? 'bg-green-1' : 'bg-grey-2'"
          >
            <span
              class="text-subtitle1"
              :class="{ 'text-strike text-grey-6': note.done }"
              >{{ note.title }}</span
            >
            <q-checkbox
              @click="notesStore.toggleDoneNote(note.id as string, note.done)"
              v-model="note.done"
              class="text-right"
              color="secondary"
              title="Cocher/décocher la note"
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
