import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    padding: 15,
    backgroundColor: "#fff",
    marginHorizontal: 20,
    marginVertical: 8,
    borderRadius: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 5,
    transform: [{ scale: 1 }],
    opacity: 1,
    transition: "transform 0.3s ease, opacity 0.3s ease",
  },
  checkbox: {
    marginRight: 15,
  },
  text: {
    flex: 1,
    fontSize: 16,
    color: "#2c3e50",
    fontWeight: "500",
    transition: "color 0.3s ease, text-decoration 0.3s ease",
  },
  completed: {
    textDecorationLine: "line-through",
    color: "#bdc3c7", // Green color for completed text
  },
  deleteButton: {
    padding: 8,
  },
});