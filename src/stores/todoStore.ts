import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useTodoStore = defineStore('todo', () => {
  const todoItems = ref<string[]>([]);
  const newTodo = ref<string>('');
  const addTodo = () => {
    if (newTodo.value) {
      todoItems.value.push(newTodo.value);
      newTodo.value = '';
    }
  };

  const removeTodo = (index: number) => {
    todoItems.value = todoItems.value.filter((_, i) => i !== index);
  };

  return { todoItems, newTodo, addTodo, removeTodo };
});
