import { StyleSheet, TextInput, View, Text, Image, Button, ImageBackground, TouchableHighlight, Alert, Pressable, ScrollView  } from 'react-native';
import Buttonn from '../../../components/button/buttonn';
import Checkbox from 'expo-checkbox';
import TextInputWhite from '../../../components/input/TextInputWhite';
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import RegisterString from '../../../values/string/register/fr/string';
import { db } from '../../../store/services/firebase.services';
import writeUserData from '../../../store/services/user/user.services';
import { useState } from 'react';
import { AuthError } from '../../../utils/ErrorUtils';
import Color from '../../../theme/color';
import { Linking } from 'react-native';
import Dimens from '../../../theme/dimens';
import styles from './register_style';
import authServices from '../../../store/services/auth/auth.services';

const Register = ({ navigation }) => {

    const [mail, setMail] = useState("");
    const [password, setPassword] = useState("")
    const [name, setName] = useState("")
    const [lastname, setLastname] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [checked, setChecked] = useState(false)

    const auth = getAuth();

    const handleCheckbox = () => {
        setChecked(prev => {
            return !prev
          })
    }

const handleSignUp = () => {
    if(checked != false) { // If checkbox is checked

    if(mail == "" || password == "" || name == "" || lastname == "" || confirmPassword == ""){
        Alert.alert("Erreur", "Veuillez remplir tous les champs")
    } else if(password === confirmPassword){
        authServices.Register(mail, password, name, lastname, navigation)
    }else{
        Alert.alert("Erreur", "Les mots de passe ne correspondent pas")
    }
    } else { // else if checkbox is not checked
        Alert.alert("Erreur", "Veuillez accepter les conditions d'utilisation de notre application pour vous inscrire")
    }
}

    return (

        <ImageBackground source={require('../../../assets/bakcgroundLogin.png')} style={styles.back}>
           <ScrollView style={styles.containerScroll}>
            <View style={styles.view}>
                <TouchableHighlight underlayColor="transparent" style={styles.backButton}  onPress={() => navigation.goBack()}>
                    <Image source={require('../../../assets/flecheBlancheRetour.png')} style={styles.logo} />
                </TouchableHighlight>
                {/* <Text style={styles.backButton} onPress={() => navigation.goBack()} >{RegisterString.BT_BACK}</Text> */}
                <View style={styles.form}>
                    <Text style={styles.title}>{RegisterString.TV_TITLE_NEW_ACCOUNT}</Text>
                    <TextInputWhite value={name} onChange={text => setName(text)} placeholder={RegisterString.TV_NAME_PLACEHOLDER} />
                    <TextInputWhite value={lastname} onChange={text => setLastname(text)} placeholder={RegisterString.TV_FIRSTNAME_PLACEHOLDER} />
                    <TextInputWhite value={mail} onChange={text => setMail(text)} placeholder={RegisterString.TV_EMAIL_PLACEHOLDER} />
                    <TextInputWhite value={password} onChange={text => setPassword(text)} placeholder={RegisterString.TV_PASSWORD_PLACEHOLDER} secureTextEntry={true} />
                    <TextInputWhite value={confirmPassword} onChange={text => setConfirmPassword(text)} placeholder={RegisterString.TV_CONFIRM_PASSWORD_PLACEHOLDER} secureTextEntry={true} />
                    
                    {/*add checkbox for CGU */}
                    <View style = {styles.CGU}>

                    <Checkbox color={Color.GREEN_AGROVE_PRESSED} style={styles.checkbox} value={checked} onValueChange={handleCheckbox} />


                    <Text style = {{
                        color : "white", 
                        paddingStart : 12, fontSize : Dimens.TITLE_SIZE_MEDIUM,
                        textDecorationLine: 'underline',
                        textDecorationStyle: 'solid',
                        }} 
                        onPress={() => Linking.openURL('https://agrove.fr/mentions-legales/')}>{RegisterString.TV_CGU}</Text>

                    </View>

                    <View style={styles.buttCont}>
                        <Buttonn title={RegisterString.BT_CREATE_REGISTER} onPress={handleSignUp} />
                    </View>

                </View>
            </View>
            </ScrollView>
        </ImageBackground>
    )
}

export default Register;