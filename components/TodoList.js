import React from "react";
import { ScrollView, Text, View } from "react-native";
import TodoItem from "./TodoItem";
import { useSelector } from "react-redux";
import { styles } from "../styles/stylesTodoList"; // Import styles

const TodoList = () => {
  const todos = useSelector((state) => state.todos.todos);

  return (
    <ScrollView contentContainerStyle={styles.list}>
      {todos.length === 0 ? (
        <Text style={styles.emptyText}>No tasks yet. Add one to get started!</Text>
      ) : (
        todos.map((item) => (
          <TodoItem key={item.id} id={item.id} text={item.text} completed={item.completed} />
        ))
      )}
    </ScrollView>
  );
};

export default TodoList;