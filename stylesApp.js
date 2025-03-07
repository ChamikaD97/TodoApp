import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
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
  disabledButton: {
    opacity: 0.5,
  },
  exitButton: {
    backgroundColor: "#bf382b",
    padding: 15,
    marginHorizontal: 20,

    marginVertical: 10,
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "center",
  },
  exitButtonText: {
    fontSize: 16,
    color: "#fff",

    fontWeight: "600",
  },

  headerContent: {
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
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
});