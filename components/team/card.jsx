import { getDatabase, onValue, ref, remove } from "firebase/database";
import { useState } from "react";
import { useEffect } from "react";
import { Text, View, StyleSheet, Image, TouchableHighlight, Alert } from "react-native";
import { db, storage } from "../../store/services/firebase.services";
import { getDownloadURL, ref as sRef } from "firebase/storage";
import Color from "../../theme/color";

export default function Card(props){
    const [name, setName] = useState("")
    const [image, setImage] = useState(null)


    useEffect(() => {
        
        if (props.id !== "add") {
            const getInfos = ref(db, 'users/' + props.id + '/metadata')
                onValue(getInfos, (snapshot) => {
                    const data = snapshot.val();
                    console.log(data)
                    setName(data.firstName + " \n" + data.lastName)
            })

            const downloadImage = (uri) => {
                const imageRef = sRef(storage, uri)
                getDownloadURL(imageRef).then(url => {
                    setImage({ uri: url.toString() })
                    console.log(url)
                }).catch(error => {
                    setImage(null)
                })
            }
            downloadImage("users/" + props.id + "/profile.jpg")
        }
    }, [])


    const callBack = () => {
        return props.cb()
    }
    
    const removeOwner = () => {
        Alert.alert(
            "Confirmation",
            "Etes vous sûr de bien vouloir supprimer ce membre ?",
            [
                { text: "Annuler", onPress: () => console.log("Cancel Pressed"), style: "cancel" },
                {
                    text: "OK", onPress: () => {
                        const removeOwner = ref(db, 'gardeners/' + props.curr + '/owners/' + props.id)
                        remove(removeOwner).then(() => {
                            console.log("Owner removed")
                        }
                        ).catch((error) => {
                            console.log(error)
                        }
                        )

                        
                    }, style: "destructive"
        }])
    }

    return (

        <View style={props.id == "add" ? style.containerAdd : style.container}>
            { props.id != "add" ?
                <View style={style.cor}>
                    <View style={{ width: "100%", height: "15%", alignItems: "flex-end" }}>
                        <TouchableHighlight underlayColor="transparent" style={{ width: "15%", height: "100%", marginEnd: "5%" }} onPress={() => removeOwner()}>
                            <Image style={style.imageSupp} source={require("../../assets/boutonSupp.png")} />
                        </TouchableHighlight>
                    </View>
                    {image == null ? <Image style={style.image} source={require("../../assets/profil.png")}/> : <Image style={style.image} source={image}/>}
                    <Text style={style.name}>{name}</Text>
                </View>
                :
                <TouchableHighlight  underlayColor="transparent"  style={[{ width: "100%", height: "100%"}, style.cor]} onPress={callBack}>
                    <Image style={style.imageAdd}  source={require("../../assets/bouton_equipe.png")} />
               </TouchableHighlight>
            }
        </View>
    )
}

const style = StyleSheet.create({
    container: {
        width: 120,
        height: 120,
        backgroundColor: "white",
        borderRadius: 10,
        margin: "4%",
        shadowColor: "black",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        shadowOffset: { width: -2, height: 4 },
        shadowColor: '#171717',
        shadowOpacity: 0.2,
    },
    containerAdd: {
        width: 120,
        height: 120,
        margin: "4%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    },
    containerTEST: {
        width: 150,
        height: 150,
        backgroundColor: "red",
        justifyContent: "center",
    },
    cor: {
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
    },
    name: {
        width: "100%",
        textAlign: "center",
        color: Color.GREEN_AGROVE
    },
    image: {
        width: "50%",
        height: "50%",
        borderRadius: 150 / 2,
        marginBottom: "5%",
    },
    imageAdd: {
        width: "30%",
        height: "30%",
        borderRadius: 150 / 2,
        marginBottom: "5%",
    },
    imageSupp: {
        width: "100%",
        height: "100%",
        borderRadius: 150 / 2,
    }
})

// export default Card;