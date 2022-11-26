import { StyleSheet } from "react-native";
import Color from "../../../theme/color";

export default StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#F5F5F5",
      alignItems: "center",
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between",
    },
    card: {
      backgroundColor: "#F8F8F8",
      borderRadius: 12,
      display: "flex",
      flexDirection: "column",
      alignItems: "flex-start",
      paddingVertical: 16,
      paddingHorizontal: 12,
      width: "90%",
      marginTop: 24,
    },
    title: {
      fontSize: 14,
      fontWeight: "600",
      marginBottom: 16,
    },
    text: {
      fontSize: 12,
    },
    viewValid: {
      width: "100%",
      backgroundColor: "white",
      paddingVertical: 8,
      paddingHorizontal: 71,
      shadowColor: "#000",
      shadowOpacity: 0.1,
      shadowRadius: 1,
      height: "10%",
      alignItems: "center",
    },
    clickZone: {
      width: "100%",
      paddingHorizontal: 10,
      paddingVertical: 10,
      backgroundColor: Color.GREEN_AGROVE,
      alignItems: "center",
      borderRadius: 60,
    },
    clickText: {
      fontSize: 12,
      fontWeight: "700",
      color: "white",
    },
  });
