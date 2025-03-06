import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  Animated,
} from "react-native";
import { Provider, useDispatch, useSelector } from "react-redux";
import { LinearGradient } from "expo-linear-gradient";
import { loadTodos, saveTodos } from "../redux/store";
import { addTodo } from "../redux/todoSlice";

const TaskInput = ({ onAddTask }) => {
    const [input, setInput] = useState("");
    const dispatch = useDispatch();
    const todos = useSelector((state) => state.todos.todos);
    const [fadeAnim] = useState(new Animated.Value(0)); // Animation for fade-in
  
    useEffect(() => {
      loadTodos().then((loadedTodos) => {
        dispatch(setTodos(loadedTodos));
      });
      // Fade-in animation on load
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }).start();
    }, [dispatch, fadeAnim]);
  
    useEffect(() => {
      saveTodos(todos);
    }, [todos]);
  
    const handleAddTodo = () => {
      if (input.trim()) {
        dispatch(addTodo(input));
        setInput("");
      }
    };

  return (
    <Animated.View style={[styles.inputContainer, { opacity: fadeAnim }]}>
      <TextInput
        style={styles.input}
        value={input}
        onChangeText={setInput}
        placeholder="Add a new task..."
        placeholderTextColor="#aaa"
      />

      <TouchableOpacity
        style={[styles.addButton, !input.trim() && styles.disabledButton]}
        onPress={handleAddTodo}
        disabled={!input.trim()}
      >
        <LinearGradient
          colors={["#4a00e0", "#8e2de2"]}
          style={styles.addButtonGradient}
        >
          <Text style={styles.addButtonText}>Add</Text>
        </LinearGradient>
      </TouchableOpacity>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: "row",
    padding: 15,
    backgroundColor: "#fff",
    marginHorizontal: 20,
    marginTop: -20, // Overlaps header slightly for a floating effect
    borderRadius: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 8,
  },disabledButton: {
    opacity: 0.5,
  },
  input: {
    flex: 1,
    fontSize: 16,
    padding: 12,
    borderRadius: 10,
    backgroundColor: "#f8f9fa",
    marginRight: 10,
    color: "#333",
    borderWidth: 1,
    borderColor: "#ddd",
  },
  addButton: {
    borderRadius: 10,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
  addButtonGradient: {
    paddingVertical: 12,
    paddingHorizontal: 25,
    alignItems: "center",
    justifyContent: "center",
  },
  addButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});

export default TaskInput;
