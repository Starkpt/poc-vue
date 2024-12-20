<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { useTodoStore } from './stores/todoStore';

import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

const todoStore = useTodoStore();
const { newTodo, todoItems } = storeToRefs(todoStore);
const { addTodo, removeTodo, handleItemCheckbox } = todoStore;

library.add(faTrash);
</script>

<template>
  <main>
    <h1>To-do list</h1>
    <div class="todo-list-wrapper">
      <div class="todo-list-container">
        <ul class="todo-list" v-if="todoItems.length > 0">
          <li v-for="(todoItem, index) in todoItems" :key="todoItem.id">
            <label :for="'todo-' + index">
              <div :class="{ completed: todoItem.completed }" class="item-text">
                <input
                  type="checkbox"
                  name=""
                  :id="'todo-' + index"
                  @click="handleItemCheckbox(index)"
                  :value="todoItem.completed"
                />

                {{ todoItem.text }}
              </div>

              <button class="delete-item" @click="removeTodo(index)">
                <font-awesome-icon :icon="['fas', 'trash']" />
              </button>
            </label>
          </li>
        </ul>

        <div v-else class="empty-list">
          <p>The list is empty!</p>
          <p>Add items below</p>
        </div>
      </div>

      <div id="submit-new-todo-fieldset">
        <input name="new-todo" id="new-todo" v-model="newTodo" @keypress.enter="addTodo()" />
        <button id="submit-new-todo" type="submit" @click="addTodo()">Create</button>
      </div>
    </div>
  </main>
</template>

<style scoped>
main {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}

h1 {
  font-weight: 700;
}

.todo-list-wrapper {
  width: 300px;
  height: 400px;
  padding: 8px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background-color: aliceblue;
  border: 1px solid aliceblue;
  border-radius: 4px;
}

.todo-list-container {
  height: 400px;
  max-height: 400px;
  overflow-y: auto;
}

.todo-list {
  margin: 0;
  padding: 0;
  list-style: none;
  width: 100%;
  /* height: 100%; */
}

.todo-list li {
  width: 100%;
  display: flex;
  justify-content: space-between;
  /* padding: 12px 16px; */
  background-color: azure;
  transition: background-color cubic-bezier(0.075, 0.82, 0.165, 1) 1.4s;
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
.todo-list li label .item-text {
  display: flex;
  gap: 4px;
  align-items: center;
  font-weight: 500;
}

.todo-list li label .item-text.completed {
  text-decoration: line-through;
  color: gray;
  font-weight: 100;
}

.empty-list {
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
  color: rgb(200, 221, 221);
  /* width: 300px; */
  height: 100%;
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

.delete-item {
  padding: 8px;
  display: flex;
  align-items: center;
  background-color: crimson;
  border: 0;
  border-radius: 2px;
  color: white;
  cursor: pointer;

  transition: background-color ease-in-out 0.2s;
}

.delete-item:hover {
  background-color: red;
}

#submit-new-todo-fieldset {
  margin: 12px 0 4px;
  display: flex;
  gap: 8px;
}

#submit-new-todo-fieldset input {
  width: 100%;
  padding-left: 12px;
  border: 1px solid aliceblue;
  border-radius: 2px;
}

#submit-new-todo {
  padding: 8px;
  background-color: cornflowerblue;
  border: 0;
  border-radius: 2px;
  color: white;
  font-weight: 600;

  transition: background-color ease-in-out 0.2s;
}

#submit-new-todo:hover {
  background-color: deepskyblue;
  cursor: pointer;
}
</style>
