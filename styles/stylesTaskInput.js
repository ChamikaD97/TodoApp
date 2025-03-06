import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
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