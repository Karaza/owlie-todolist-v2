<template>
  <div class="q-pa-md" style="max-width: 600px">
    <div v-for="todo in todos" :key="todo.id" class="q-mb-md">
      <div class="q-mb-md">
        <div
          @click="todo.expanded = !todo.expanded"
          class="row justify-between items-center bg-grey-2 q-py-xs q-px-md"
        >
          <span class="text-subtitle1">{{ todo.title }}</span>
          <q-checkbox v-model="todo.done" class="text-right" />
        </div>
        <div
          class="text-caption q-py-xs q-px-md"
          :class="{ ellipsis: !todo.expanded }"
        >
          {{ todo.content }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Todo } from "./models";

interface Props {
  todos?: Todo[];
}
const props = withDefaults(defineProps<Props>(), {
  todos: () => [],
});
</script>
