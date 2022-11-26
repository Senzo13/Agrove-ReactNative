import { StyleSheet } from "react-native";
import Dimens from "../../theme/dimens";

export default StyleSheet.create({
    alertbutton: {
        backgroundColor: 'red',
        color: 'white',
    },
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    name: {
        marginTop: 40,
        marginStart: 20,
        fontSize: Dimens.TITLE_SIZE_BIG,
        fontWeight: 'normal',
    },
    dateContainer: {
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: "10%",
        paddingHorizontal: 20,
    },
    date: {
        padding: 15,
        backgroundColor: '#FFF8F8',
        borderTopStartRadius: 25,
        borderBottomStartRadius: 25,
        width: '50%',
        alignItems: 'center',
    },
    statsContainer: {
        height: '60%',
        width: '100%',
        paddingEnd: 20,
        flexDirection: 'column',
        paddingStart: 20,
        paddingVertical: 10,
        marginTop: "5%",
    }
})
