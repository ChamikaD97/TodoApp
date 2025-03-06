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
import { styles } from "../styles/stylesTaskInput"; // Import styles

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



export default TaskInput;
