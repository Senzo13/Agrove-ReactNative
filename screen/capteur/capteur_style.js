import { StyleSheet } from "react-native";
import { Dimensions } from "react-native";


export default StyleSheet.create({
    container: {
      display: "flex",
      flexDirection: "column",
      width: "100%",
      height: "100%",
      alignContent: "center",
      backgroundColor: "#F8F8F8",
      padding: 10,
    },
    imageBackgroundBottom: {
      width: "100%",
      height: Dimensions.get("window").height / 3,
      resizeMode: "cover",
      flex: 1,
    },
    txt: {
      color: "black",
      fontWeight: "bold",
    },
    tfContainer: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "flex-start",
      marginVertical: 10,
    },
    formContainer: {
      width: "100%",
      backgroundColor: "white",
      marginHorizontal: "auto",
      paddingHorizontal: 20,
      paddingVertical: 10,
      borderRadius: 10,
      marginVertical: 10,
    },
    title: {
      fontSize: 20,
      fontWeight: "bold",
      marginBottom: 5,
    },
    input: {
      width: "100%",
      color: "black",
      marginTop: 5,
      borderRadius: 4,
      borderWidth: 1,
      padding: 10,
      borderColor: "#D9D9D9",
    },
    cs: {
      width: "100%",
      alignItems: "center",
      marginTop: "30%",
    },
  });
  
