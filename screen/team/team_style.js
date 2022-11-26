import { StyleSheet } from "react-native";


export default StyleSheet.create({
    header: {
        width: "100%",
        height: 90,
        paddingVertical: 10,
        paddingStart: 10,
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },
    button: {
        marginTop: 40,
        width: "50%",
        height: "50%",
    },
    reglage: {
        marginTop: 30,
        marginEnd: 15,
        backfaceVisibility: "hidden",
    },
    list: {
        display: "flex",
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-between",
        paddingHorizontal: "4%",
    },
    title: {
        fontSize: 30,
        fontWeight: "bold",
    },
    txt: {
        fontSize: 15,
    },
    txtContainer: {
        paddingHorizontal: "4%",
    },
});