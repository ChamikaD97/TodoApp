import React, { useState, useEffect } from "react";
import {
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  Animated,
  View,
  BackHandler,
  Alert,
  TouchableOpacity,
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

  // Function to handle app exit
  const handleExit = () => {
    Alert.alert(
      "Exit App",
      "Are you sure you want to exit?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Exit",
          style: "destructive",
          onPress: () => BackHandler.exitApp(),
        },
      ],
      { cancelable: true }
    );
  };

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
      <TouchableOpacity style={styles.exitButton} onPress={handleExit}>
        <Text style={styles.exitButtonText}>Exit App</Text>
      </TouchableOpacity>
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
    letterSpacing: 1,
  },
  sloganText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "500",
    marginTop: 5,
    fontStyle: "italic",
  },
  exitButton: {
    backgroundColor: "#e74c3c",
    padding: 15,
    marginHorizontal: 20,

    marginVertical: 10,
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "center",
  },
  exitButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});

export default MainApp;