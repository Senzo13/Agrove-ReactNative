import { StyleSheet } from "react-native";

export default StyleSheet.create({
    container: {
        display: "flex",
        flexDirection: "column",
        width: "100%",
        height: "100%",
        alignContent: "center",
        backgroundColor: "#F8F8F8",
        padding: 20
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
        marginVertical: 15,
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
        marginBottom: 5
    },
    
    input: {
        width: "100%",
        color: "black",
        marginTop: 5,
        borderRadius: 4,
        borderWidth: 1,
        padding: 10,
        borderColor: "#D9D9D9",

    }

})
