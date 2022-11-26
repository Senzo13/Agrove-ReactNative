import { getAuth, signOut, updateEmail, updatePassword } from "firebase/auth";
import { off, onValue, ref, remove, set } from "firebase/database";
import { useState } from "react";
import { Button, View, StyleSheet, TextInput, Text, ScrollView, Alert } from "react-native"
import Buttonn from "../../components/button/buttonn";
import { db } from "../../store/services/firebase.services";
import { AuthError } from "../../utils/ErrorUtils";
import Color from "../../theme/color";
import React from "react";
import { useFocusEffect } from '@react-navigation/native';
import { A } from '@expo/html-elements';
import styles from './profil_style';



const Profil = ({ route, navigation }) => {
    const auth = getAuth()

    // user
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [owners, setOwners] = useState([])

    //gardener
    const [haveGardener, setHaveGardener] = useState(false)
    const [gardenerName, setGardenerName] = useState("")
    const [gardenerZipCode, setGardenerZipCode] = useState("")
    const [gardenerCountry, setGardenerCountry] = useState("")


    useFocusEffect(
        React.useCallback(() => {
        const userInfo = ref(db, 'users/' + route.params.id + '/metadata');
            onValue(userInfo, (snapshot) => {
            const data = snapshot.val();
            setFirstName(data.firstName)
            setLastName(data.lastName)
            setEmail(auth.currentUser.email)
            setPassword("password")
        })

        const gardenerInfo = ref(db, 'gardeners/' + route.params.curr + '/metadata');
            onValue(gardenerInfo, (snapshot) => {
            const data = snapshot.val()
            if (data != null && route.params.curr != "") {
                setGardenerName(data.name)
                setGardenerZipCode(data.zipCode)
                setGardenerCountry(data.countryCode)
                setHaveGardener(true)
            
                console.log(auth.currentUser.uid)
            } else {
                setHaveGardener(false)
            }
        })

        const gardenerInfoOwners = ref(db, 'gardeners/' + route.params.curr);
        onValue(gardenerInfoOwners, (snapshot) => {
        const data = snapshot.val()
        if (data != null && route.params.curr != "") {
            // console.log("Nb de owners: " + Object.keys(data.owners).length)
            setOwners(Object.keys(data.owners).length)
        } else {
            setHaveGardener(false)
        }
    })
     
        return () => {
            console.log("unmount")
            off(userInfo)
            off(gardenerInfo)
        }
    }, []))

    const authLogout = () => {

        signOut(auth).then(() => {
            navigation.replace('Login')
            console.log("logout")
        }).catch((error) => {
            console.log(error)
            // An error happened.
        });
    }

    const update = () => {
        // update gardener metadata 
        if (haveGardener) {

            set(ref(db, 'gardeners/' + route.params.curr + '/metadata'), {
                name: gardenerName ?? "",
                zipCode: gardenerZipCode ?? "",
                countryCode: gardenerCountry ?? ""
            }).then(() => {
                Alert.alert("Les informations ont été mises à jour")
            }
            ).catch((error) => {
                Alert.alert("Error", AuthError(error))
            }
            )
        }
    }

    const deleteOwners = () => {
        try {
            Alert.alert(
                "Confirmation",
                "Etes vous sûr de bien vouloir supprimer ce capteur ?",
                [
                    { text: "Annuler", onPress: () => console.log("Cancel Pressed"), style: "cancel" },
                    {
                        text: "OK", onPress: () => {
                        
                        remove(ref(db, 'gardeners/' + route.params.curr  + '/owners/' + route.params.id)).then(() => {
                            setHaveGardener(false)
                            set(ref(db , 'users/' + route.params.id + '/currentGardener/'), "").then(() => {
                                console.log("current Gardener remis à vide")
                                Alert.alert("Le capteur à bien été supprimé")
                            }).catch((error) => {
                                    console.log(error)
                            })
                        }).catch((error) => {
                                console.log(error)
                        })
    
                        if(owners == 1) {
                        console.log("Vous êtes le seul propriétaire donc je réinitialise les metadatas")
                        remove(ref(db, 'gardeners/' + route.params.curr  + '/metadata/')).then(() => {
                        }).catch((error) => {
                                console.log(error)
                        })
                        }
    
                        }, style: "destructive"
            }])
        } catch (error) {
           console.log("Un problème à eu lieu dans le profil")
        }
    }

    const updateUser = () => {
        // update user password
        if(confirmPassword != ""){
            if (password != auth.currentUser.password) {
                updatePassword(auth.currentUser, confirmPassword).then(() => {
                    Alert.alert("Mot de passe mis à jour")
                }).catch((error) => {
                    Alert.alert("Error", AuthError(error))
                });
            }
        }else{
            updateEmail(auth.currentUser, email).then(() => {
                Alert.alert("Email mis à jour")
            }).catch((error) => {
                Alert.alert(AuthError(error))
            });
        }

    }
    return (
        <ScrollView style={styles.container}>
            {haveGardener ?
                <View style={styles.formContainer}>
                    <Text style={styles.title}>Information mon capteur</Text>
                    <View style={styles.tfContainer}>
                        <Text style={styles.txt}>Nom du capteur</Text>
                        <TextInput style={styles.input} placeholder="Saisissez le nom du capteur" value={gardenerName} onChangeText={t => setGardenerName(t)} />
                    </View>
                    <View style={styles.tfContainer}>
                        <Text style={styles.txt}>Pays du capteur</Text>
                        <TextInput style={styles.input} placeholder="Pays du capteur" value={gardenerCountry} onChangeText={txt => setGardenerCountry(txt)} />
                    </View>
                    <View style={styles.tfContainer}>
                        <Text style={styles.txt}>Code postal du capteur</Text>
                        <TextInput style={styles.input} placeholder="Code postal du capteur" value={gardenerZipCode} onChangeText={t => setGardenerZipCode(t)} />
                    </View>
                    <View style={{ width: "100%", alignItems: "center" }}>
                        <Buttonn title="Modifier" onPress={update} />
                        <Buttonn title="Supprimer capteur" alert={true} onPress={deleteOwners} />
                    </View>
                </View>
                : null}

            <View style={styles.formContainer}>
                <Text style={styles.title}>Information personnelles</Text>
                <View style={styles.tfContainer}>
                    <Text style={styles.txt}>Nom</Text>
                    <TextInput style={[styles.input, {backgroundColor: "lightgray", opacity: 0.3}]} editable={false} selectTextOnFocus={false} placeholder="nom" value={lastName} />
                </View>
                <View style={styles.tfContainer}>
                    <Text style={styles.txt}>Prenom</Text>
                    <TextInput style={[styles.input, {backgroundColor: "lightgray", opacity: 0.3}]} editable={false} selectTextOnFocus={false} placeholder="Prenom" value={firstName} />
                </View>
                <View style={styles.tfContainer}>
                    <Text style={styles.txt}>Adresse mail</Text>
                    <TextInput style={styles.input} placeholder="mail" value={email} onChangeText={t => setEmail(t)} />
                </View>
                <View style={styles.tfContainer}>
                    <Text style={styles.txt}>Ancien mot de passe</Text>
                    <TextInput style={styles.input} placeholder="Mot de passe" secureTextEntry={true} value={password} onChangeText={t => setPassword(t)}/>
                </View>
                <View style={styles.tfContainer}>
                    <Text style={styles.txt}>Nouveau mot de passe</Text>
                    <TextInput style={styles.input} placeholder="Mot de passe" secureTextEntry={true} value={confirmPassword} onChangeText={t => setConfirmPassword(t)} />
                </View>
                <View style={{ width: "100%", alignItems: "center" }}>
                    <Buttonn title="Modifier" onPress={updateUser} />
                </View>
            </View>
            {/* {haveGardener ? <View style={{ width: "100%", alignItems: "center", marginTop: "5%"}}>
                <Buttonn title="Supprimer potager" alert={true} onPress={deleteOwners} />
            </View> : null } */}
            <A href="https://agrove.fr/mentions-legales/" style = {{color : 'blue', paddingRight: 4, paddingBottom : 4, paddingTop: 4}}>Mentions légales</A>
            <View style={{width: "100%", alignItems: "center", marginVertical: "15%"}}>
                <Buttonn title="Se déconnecter" onPress={authLogout} alert={true} />
            </View>
        </ScrollView>
    )
}

export default Profil