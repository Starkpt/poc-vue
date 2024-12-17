import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useTodoStore = defineStore('todo', () => {
  const todoItems = ref<{ id: number; text: string; completed: boolean }[]>([]);

  const newTodo = ref<string>('');

  const addTodo = () => {
    if (newTodo.value) {
      todoItems.value.push({
        id: todoItems.value.length + 1,
        text: newTodo.value,
        completed: false,
      });

      newTodo.value = '';
    }
  };

  const removeTodo = (index: number) => {
    todoItems.value = todoItems.value.filter((_, i) => i !== index);
  };

  const handleItemCheckbox = (index: number) => {
    const item = todoItems.value.find((_, i) => i === index);
    if (item) {
      Object.assign(item, { ...item, completed: !item.completed });
    }
  };

  return {
    todoItems,
    newTodo,
    addTodo,
    removeTodo,
    handleItemCheckbox,
  };
});
