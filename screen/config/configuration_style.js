import { StyleSheet } from "react-native";
import Color from "../../theme/color";



export default StyleSheet.create({
    header: {
        width: '100%',
        height: 220,
        paddingVertical: 10,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        backgroundColor: Color.GREEN_AGROVE
    },
    button: {
        marginTop: 40,
        width: "10%",
        height: "10%",
        marginStart: "5%",
    },
    nav: {
        width: "100%",
        justifyContent: "flex-start",
    },
    card: {
        backgroundColor: "white",
        width: "80%",
        borderRadius: 10,
        padding: 10,
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
    },
    title: {
        color: "white",
        fontSize: 30,
        width: "80%",
        marginTop: 20,
    }
})
