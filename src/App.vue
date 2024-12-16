<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { useTodoStore } from './stores/todoStore';

const todoStore = useTodoStore();
const { todoItems, newTodo } = storeToRefs(todoStore);
const addTodo = todoStore.addTodo;

import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

library.add(faTrash);
</script>

<template>
  <main>
    <div class="todo-list-wrapper">
      <div class="todo-list-container">
        <ul class="todo-list" v-if="todoItems.length > 0">
          <li
            v-for="(todoItem, index) in todoItems"
            :key="index"
            style="width: 100%; display: flex; justify-content: space-between"
          >
            <label :for="'todo-' + index">
              <div style="display: flex; gap: 4px; align-items: center">
                <input
                  type="checkbox"
                  name=""
                  :id="'todo-' + index"
                  style="width: 16px; height: 16px; cursor: pointer"
                />

                {{ todoItem }}
              </div>

              <button
                class="button-remove"
                @click="todoStore.removeTodo(index)"
                style="width: 40px; height: 40px"
              >
                <font-awesome-icon :icon="['fas', 'trash']" />
              </button>
            </label>
          </li>
        </ul>

        <div v-else class="empty-list">
          <p>No items yet!</p>
          <p>Add items below</p>
        </div>
      </div>

      <div>
        <input name="new-todo" id="new-todo" v-model="newTodo" @keypress.enter="addTodo()" />
        <button type="submit" @click="addTodo()">Add to-do item</button>
      </div>
    </div>
  </main>
</template>

<style scoped>
main {
  display: flex;
  justify-content: center;
}

.todo-list-container {
  width: 300px;
  height: 400px;
  background-color: azure;
  border: 1px solid aliceblue;
}

.todo-list {
  margin: 0;
  padding: 0;
  list-style: none;
  width: 100%;
  /* height: 100%; */
}

.todo-list li {
  /* padding: 12px 16px; */
  animation: background-color cubic-bezier(0.075, 0.82, 0.165, 1) 1.4s;
}

.todo-list li:nth-of-type(even) {
  background-color: white;
}

.todo-list li:hover {
  background-color: rgb(187 255 255 / 40%);
}

.todo-list li label {
  padding: 12px 16px;
  width: 100%;
  display: flex;
  gap: 4px;
  cursor: pointer;
  align-items: center;
  align-content: center;
  justify-content: space-between;
}

.empty-list {
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
  color: rgb(200, 221, 221);
  width: 300px;
  height: 400px;
  background-color: azure;
  border: 1px solid aliceblue;
  padding: 8px 12px;
}

.empty-list p:nth-of-type(1) {
  font-weight: 500;
  margin-bottom: 8px;
}
.empty-list p:nth-of-type(2) {
  /* font-weight: 500; */
}

.button-remove {
  padding: 4px 8px;
}
</style>
