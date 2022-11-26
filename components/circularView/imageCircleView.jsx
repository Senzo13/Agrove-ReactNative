import React from 'react';
import { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Button, Image, TouchableOpacity, TextInput, Alert } from "react-native";
import Dimens from '../../theme/dimens';
import { db, storage } from "../../store/services/firebase.services";
import { getDownloadURL, ref as sRef } from "firebase/storage";
import { getDatabase, off, onValue, ref, remove } from "firebase/database";

const ImageCircleView = (props) => {
    const { size, imgUrl, msg, flexDirection } = props;
    const [name, setName] = useState("")
    const [image, setImage] = useState(null)

    useEffect(() => {
            const getInfos = ref(db, 'users/' + props.id + '/metadata')
            onValue(getInfos, (snapshot) => {
                const data = snapshot.val();
                if (data) {
                    setName(data.firstName + ' ' + data.lastName)
                }
            })


            const imageRef = sRef(storage, "users/" + props.id + "/profile.jpg")
            getDownloadURL(imageRef).then(url => {
                setImage({ uri: url.toString() })
                console.log(url)
            }).catch(error => {
                setImage(null)
            })
        
        return () => { 
            off(getInfos)
            off(imageRef)
        }
    }, [])

    return (
        <View style={styles(size, flexDirection).container}>
            {image == null ? <Image style={styles(size).image} source={require("../../assets/profil.png")} /> : <Image style={styles(size).image} source={image} />}
            <Text style={styles(size).text}>{name}</Text>
        </View>
    );
}

const styles = (size, flexDirection) => StyleSheet.create({
    container: {
        height: "auto",
        alignItems: 'center',
        flexDirection: `${flexDirection}`,
    },

    image: {
        margin: "4%",
        width: size,
        height: size,
        borderRadius: 150 / 2,
        backgroundColor: 'black',
        overflow: "hidden",

    },

    text: {
        color: "white",
        maxWidth: 500,
        textAlign: "center",
        fontWeight: "500",
        fontSize: Dimens.TITLE_SIZE_BIG,
    }
})

export default ImageCircleView;