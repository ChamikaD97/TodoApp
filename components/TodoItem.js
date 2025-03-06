import React, { useRef, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Animated, Alert } from 'react-native';
import { useDispatch } from 'react-redux';
import { toggleTodoCompletion, deleteTodo } from '../redux/todoSlice';
import FontAwesome from 'react-native-vector-icons/FontAwesome'; // Import FontAwesome icons

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
      'Delete Todo',
      'Are you sure you want to delete this task?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => dispatch(deleteTodo(id)),
        },
      ],
      { cancelable: true }
    );
  };

  return (
    <Animated.View style={[styles.container, { transform: [{ scale: scaleAnim }], opacity: opacityAnim }]}>
      {/* Checkbox Icon */}
      <TouchableOpacity
        style={styles.checkbox}
        onPress={() => dispatch(toggleTodoCompletion(id))}
      >
        <FontAwesome
          name={completed ? 'check-square-o' : 'square-o'} // Use different icons for completed/uncompleted
          size={26}
          color={completed ? '#4CAF50' : '#2c3e50'} // Green color for completed
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

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    backgroundColor: '#fff',
    marginHorizontal: 20,
    marginVertical: 8,
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 5,
    transform: [{ scale: 1 }],
    opacity: 1,
    transition: 'transform 0.3s ease, opacity 0.3s ease',
  },
  checkbox: {
    marginRight: 15,
  },
  text: {
    flex: 1,
    fontSize: 16,
    color: '#2c3e50',
    fontWeight: '500',
    transition: 'color 0.3s ease, text-decoration 0.3s ease',
  },
  completed: {
    textDecorationLine: 'line-through',
    color: '#bdc3c7', // Green color for completed text
  },
  deleteButton: {
    padding: 8,
  },
});

export default TodoItem;