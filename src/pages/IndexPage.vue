<template>
  <q-page class="row justify-evenly q-mt-md">
    <!-- <example-component
      title="Example component"
      active
      :todos="todos"
      :meta="meta"
    ></example-component> -->
    <div class="q-pa-md" style="max-width: 600px">
      <div v-for="todo in todos" :key="todo.id" class="q-mb-md">
        <div class="row justify-between items-center bg-grey-1 q-py-xs q-px-md">
          <span class="text-subtitle1">{{ todo.title }}</span>
          <q-checkbox v-model="todo.done" class="text-right" />
        </div>
        <div class="text-caption q-py-xs q-px-md">{{ todo.content }}</div>
      </div>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { Todo } from "components/models";
// import ExampleComponent from 'components/ExampleComponent.vue';
import { ref } from "vue";

const todos = ref<Todo[]>([
  {
    id: 1,
    title: "Title 1",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Atquesuscipit in aperiam veniam.",
    done: false,
  },
  {
    id: 2,
    title: "Title 2",
    content: "Reprehenderit mollitia, illo officia facere tenetur est repellat",
    done: true,
  },
  {
    id: 3,
    title: "Title 3",
    content: "Repellendus soluta at nemo minus, molestiae doloremque.",
    done: false,
  },
]);
</script>
