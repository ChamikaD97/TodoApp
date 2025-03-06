import { createSlice } from '@reduxjs/toolkit';

const todoSlice = createSlice({
  name: 'todos',
  initialState: {
    todos: [],
  },
  reducers: {
    addTodo: (state, action) => {
      state.todos.push({
        id: Date.now(), // Unique ID based on timestamp
        text: action.payload,
        completed: false,
      });
    },
    toggleTodoCompletion: (state, action) => {
      const todo = state.todos.find((todo) => todo.id === action.payload);
      if (todo) todo.completed = !todo.completed;
    },
    deleteTodo: (state, action) => {
      state.todos = state.todos.filter((todo) => todo.id !== action.payload);
    },
    setTodos: (state, action) => {
      state.todos = action.payload; // For loading persisted todos
    },
  },
});

export const { addTodo, toggleTodoCompletion, deleteTodo, setTodos } = todoSlice.actions;
export default todoSlice.reducer;