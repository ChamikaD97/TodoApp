import React, { useState, useEffect } from "react";
import {
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  Animated,
} from "react-native";
import { Provider, useDispatch, useSelector } from "react-redux";
import { LinearGradient } from "expo-linear-gradient";
import store, { saveTodos, loadTodos } from "./redux/store";
import TodoList from "./components/TodoList";
import { setTodos } from "./redux/todoSlice";
import TaskInput from "./components/TaskInput";

const App = () => {
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

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <LinearGradient colors={["#4a00e0", "#8e2de2"]} style={styles.header}>
        <Animated.View style={{ opacity: fadeAnim }}>
          <Text style={styles.headerText}>Todo Master</Text>
          <Text style={styles.sloganText}>Your Productivity, Simplified</Text>
        </Animated.View>
      </LinearGradient>
      <TaskInput />
      <TodoList />
    </KeyboardAvoidingView>
  );
};

const MainApp = () => (
  <Provider store={store}>
    <App />
  </Provider>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f0f2f5",
  },
  header: {
    paddingBottom: 50,

    padding: 20,
    paddingTop: 50,
    alignItems: "center",
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    elevation: 5,
  },
  headerText: {
    color: "#fff",
    fontSize: 28,
    fontWeight: "700",
    alignSelf: "center",
    letterSpacing: 1,
  },
  sloganText: {
    color: "#fff",
    alignSelf: "center",
    fontSize: 16,
    fontWeight: "500",
    marginTop: 5,
    fontStyle: "italic",
  },

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
  },
  input: {
    flex: 1,
    fontSize: 16,
    padding: 12,
    borderRadius: 10,
    backgroundColor: "#f8f9fa",
    marginRight: 10,
    color: "#333",
  },
  addButton: {
    borderRadius: 10,
    overflow: "hidden",
  },
  disabledButton: {
    opacity: 0.5,
  },
  addButtonGradient: {
    paddingVertical: 12,
    paddingHorizontal: 25,
  },
  addButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});

export default MainApp;
