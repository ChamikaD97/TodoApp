import React, { useRef, useEffect } from "react";
import { Text, TouchableOpacity, Animated, Alert } from "react-native";
import { useDispatch } from "react-redux";
import { toggleTodoCompletion, deleteTodo } from "../redux/todoSlice";
import FontAwesome from "react-native-vector-icons/FontAwesome"; // Import FontAwesome icons
import { styles } from "../styles/stylesTodoItem"; // Import styles

const TodoItem = ({ id, text, completed }) => {
  const dispatch = useDispatch();
  const scaleAnim = useRef(new Animated.Value(0)).current; // Animation for scale-in
  const opacityAnim = useRef(new Animated.Value(0)).current; // Animation for fade-in

  useEffect(() => {
    Animated.parallel([
      Animated.spring(scaleAnim, {
        toValue: 1,
        friction: 8,
        useNativeDriver: true,
      }),
      Animated.timing(opacityAnim, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }),
    ]).start();
  }, [scaleAnim, opacityAnim]);

  // Function to handle delete confirmation
  const handleDelete = () => {
    Alert.alert(
      "Delete Todo",
      "Are you sure you want to delete this task?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
           // delete task
          text: "Delete",
          style: "destructive",
          onPress: () => dispatch(deleteTodo(id)),
        },
      ],
      { cancelable: true }
    );
  };

  return (
    <Animated.View
      style={[
        styles.container,
        { transform: [{ scale: scaleAnim }], opacity: opacityAnim },
      ]}
    >
      {/* Checkbox Icon */}
      <TouchableOpacity
        style={styles.checkbox}
        onPress={() => dispatch(toggleTodoCompletion(id))}
      >
        <FontAwesome
          name={completed ? "check-square-o" : "square-o"} // Use different icons for completed/uncompleted
          size={26}
          color={completed ? "#4CAF50" : "#2c3e50"} // Green color for completed
        />
      </TouchableOpacity>

      {/* Todo Text */}
      <Text style={[styles.text, completed && styles.completed]}>{text}</Text>

      {/* Delete Button Icon */}
      <TouchableOpacity
        style={styles.deleteButton}
        onPress={handleDelete} // Use the confirmation handler
      >
        <FontAwesome
          name="trash" // Trash icon for delete button
          size={24}
          color="#e74c3c"
        />
      </TouchableOpacity>
    </Animated.View>
  );
};

export default TodoItem;
