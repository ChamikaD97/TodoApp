import React, { useState, useEffect } from "react";
import {
  Text,
  KeyboardAvoidingView,
  Platform,
  Animated,
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
import { styles } from "./stylesApp"; // Import styles

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
        <Animated.View style={[styles.headerContent, { opacity: fadeAnim }]}>
          <Text style={styles.headerText}>Todo Master</Text>
          <Text style={styles.sloganText}>Your Productivity, Simplified</Text>
        </Animated.View>
      </LinearGradient>

      <TaskInput />
      <TodoList />
      <Animated.View style={[styles.inputContainer, { opacity: fadeAnim }]}>
        <TouchableOpacity style={styles.exitButton} onPress={handleExit}>
          <Text style={styles.exitButtonText}>Exit</Text>
        </TouchableOpacity>
      </Animated.View>
    </KeyboardAvoidingView>
  );
};

const MainApp = () => (
  <Provider store={store}>
    <App />
  </Provider>
);

export default MainApp;
