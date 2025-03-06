import { configureStore } from '@reduxjs/toolkit';
import todoReducer from './todoSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';

const store = configureStore({
  reducer: {
    todos: todoReducer,
  },
});

export const saveTodos = async (todos) => {
  try {
    await AsyncStorage.setItem('todos', JSON.stringify(todos));
  } catch (e) {
    console.error('Failed to save todos:', e);
  }
};

export const loadTodos = async () => {
  try {
    const todos = await AsyncStorage.getItem('todos');
    return todos ? JSON.parse(todos) : [];
  } catch (e) {
    console.error('Failed to load todos:', e);
    return [];
  }
};

export default store;