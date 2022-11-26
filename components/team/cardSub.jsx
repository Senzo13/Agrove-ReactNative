import { off, onValue, ref } from "firebase/database"
import { useState } from "react"
import { useEffect } from "react"
import { View, Text } from "react-native"
import { db } from "../../store/services/firebase.services"




const CardSub = (props) => {
    const [name, setName] = useState("")

    useEffect(() => {
        const resp = ref(db, "users/" + props.id + "/metadata/")
        onValue(resp, (snapshot) => {
            const data = snapshot.val()
            setName(data.firstName + data.lastName)
        })

        return () => {off(resp)}
    }, [])

    return (
        <View style={{display: 'flex', flexDirection: 'row'}}>
            <View>
                <Text>{name}</Text>
            </View>
        </View>
    )
}

export default CardSub