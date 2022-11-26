import { StyleSheet } from "react-native";
import Color from "../../../theme/color";
import Dimens from "../../../theme/dimens";


export default StyleSheet.create({
    container: {
        backgroundColor: "white",
        height: "auto",
        height: "90%",
        width: "100%",
        paddingTop: 30,
        display: "flex",
        flexDirection: "column",
    },
    padd: {
        paddingHorizontal: Dimens.PADDINGHORIZONTAL,
    },
    descStyle: {
        marginTop: 20,
    },
    calendarComponentContainer: {
        marginVertical: 10,
        backgroundColor: Color.STATS_GRAY,
        width: "100%",
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 10,
        display: "flex",
        flexDirection: "column",
    },
    componentContainer: {
        backgroundColor: Color.STATS_GRAY,
        width: "100%",
        display: "flex",
        flexDirection: "column",
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 10,
        alignItems: "center",
        marginVertical: 10,
    },
    componentContainerTitle: {
        fontWeight: "bold",
    },
    line: {
        borderBottomColor: Color.STATS_GRAY,
        borderBottomWidth: 1,
        marginVertical: 20,
    },
    durring: {
        display: "flex",
        flexDirection: "row",
    },
    viewValid: {
        width: "100%",
        height: "10%",
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
    }
})
