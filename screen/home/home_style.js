import { StyleSheet } from "react-native";
import Color from "../../theme/color";


export default  StyleSheet.create({
    // CONTAINER
    container: {
        width: "100%",
        height: "100%",
        alignItems: 'center',
    },

    imageBackgroundBottom: {
        width: "100%",
        height: 120,
        position: "absolute",
        bottom: 0,
        resizeMode: 'cover',
        flex: 1,
    },

    // HOME 
    addButton: {
        width: 45,
        height: 40,
        backgroundColor: "white",
        borderTopStartRadius: 40,
        borderColor: "grey",
    },

    ImageButtonAddCapteur: {
        width: "100%",
        resizeMode: "contain",

        bottom: 0,
        alignItems: 'flex-end',
    },

    buttonText: {
        marginTop: "auto",
        marginBottom: "auto",
        marginLeft: "auto",
        marginRight: "auto",
        paddingLeft: "25%",
        color: Color.GREEN_AGROVE,
        fontSize: 25,
        fontWeight: "300",
    },

    profilContainer: {
        width: "100%",
        paddingTop: "5%",
    },

    header: {
        width: "100%",
        height: "35%",
        // marginTop: "2%",
    },

    shadow: {
        borderColor: 'black',
        shadowColor: 'black',
        elevation: 2,
        shadowOffset: { width: 40, height: 5 },
        shadowColor: 'black',
        shadowOpacity: 0.2,
        shadowRadius: 2,
    },

    imageBackgroundTop: {
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
    },
    ...Platform.select({
        android: {
            picker: {
                marginTop: 50,
        
            }
        },
        ios: {
            picker: {
                height: "10%",
            }
        }
    })

})
