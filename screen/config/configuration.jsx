import { off, onValue, ref, set } from "firebase/database";
import { useEffect } from "react";
import { useState } from "react";
import { View, Text, TouchableHighlight, Image, StyleSheet, Switch } from "react-native"
import CardSub from "../../components/team/cardSub";
import { db } from "../../store/services/firebase.services";
import Color from "../../theme/color";
import styles from './configuration_style';


const Configuration = ({ route, navigation }) => {
    const [isEnabled, setIsEnabled] = useState(false)
    const [subMembers, setSubMembers] = useState([])

    useEffect(() => {
        const refp = ref(db, 'gardeners/' + route.params.curr + '/ispublic')
        onValue(refp, (snapshot) => {
            const data = snapshot.val();
            setIsEnabled(data)
        });

        const res = ref(db, 'gardeners/' + route.params.curr + '/subscribemember')
        onValue(res, (snapshot) => {
            const data = snapshot.val();
            data == null ? setSubMembers([]) : setSubMembers(Object.keys(data))
        })
        return () => {off(refp)}
    }, [])

    const toggleSwitch = () => {
        setIsEnabled(previousState => !previousState);
        set(ref(db, 'gardeners/' + route.params.curr + '/ispublic'), !isEnabled);
    }


    return (
        <View style={{ backgroundColor: "white", flex: 1 }}>
            <View style={styles.header}>
                <View style={styles.nav}>
                    <TouchableHighlight underlayColor="transparent" style={styles.button} onPress={() => navigation.goBack()}>
                        <Image source={require('../../assets/flecheBlancheRetour.png')} style={styles.image} />
                    </TouchableHighlight>
                </View>
                <Text style={styles.title}>L'accés à mon équipe </Text>
                <View style={styles.card}>
                    <Text style={{ fontSize: 16, width: '80%' }}>
                        J'accepte de recevoir des demandes d'integration
                    </Text>
                    <Switch
                        onValueChange={toggleSwitch}
                        value={isEnabled} />
                </View>
            </View>
            <View style={{ paddingStart: 20, marginTop: 15 }}>
                <Text style={{ fontSize: 25, fontWeight: 'bold', marginBottom: 5 }}>Demandes en attente</Text>
                <Text style={{ color: 'black', fontSize: 16 }}>Ici, je réponds aux personnes qui aimeraient rejoindre mon équipe</Text>
            </View>
            {subMembers.map((e, key) => <CardSub id={e} key={key}/>)}
        </View>
    )
}


export default Configuration