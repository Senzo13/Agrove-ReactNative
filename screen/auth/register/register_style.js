import { StyleSheet } from "react-native";


export default StyleSheet.create({
    containerScroll: {
        display: "flex",
        flexDirection: "column",
        width: "100%",
        alignContent: "center",
    },
    CGU : {
        display: "flex",
        flexDirection: "row",
        width: "91%",
        alignContent: "center",
        justifyContent: "center",
        alignItems: "center",
        marginLeft: 8,
        paddingTop: 12,
    },
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    checkbox: {
        width: 48,
        height: 48
    },
    view: {
        padding: 20,
    },
    form: {
        flexDirection: 'column',
        justifyContent: 'space-between',
        width: '75%',
        marginLeft: 'auto',
        marginRight: 'auto',
        marginTop: '15%',
        marginBottom: 'auto',
    },
    back: {
        flex: 1,
        alignItems: 'center',
    },
    title: {
        color: '#fff',
        fontWeight: 'normal',
        fontSize: 20,
        paddingBottom: 20,
    },
    buttCont: {
        alignItems: 'center',
        width: '100%',
        marginLeft: 'auto',
        marginRight: 'auto',
        marginTop: '15%',
    },
    backButton: {
        marginTop: '15%',
        width: '10%',
        marginStart: '5%',
    }

})
