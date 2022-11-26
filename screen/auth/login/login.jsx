import * as React from 'react';
import { StyleSheet, TextInput, View, Text, Image, Button, ImageBackground, Alert, ActivityIndicator } from 'react-native';
import Buttonn from '../../../components/button/buttonn';
import TextInputWhite from '../../../components/input/TextInputWhite';
import LoginString from '../../../values/string/login/fr/string';
import { getAuth, sendPasswordResetEmail, signInWithEmailAndPassword, signInWithRedirect } from "firebase/auth";
import { AuthError } from '../../../utils/ErrorUtils';
import { useState } from 'react';
import { googleProvider } from '../../../store/provider/google/google';
import styles from './login_style';
import authServices from '../../../store/services/auth/auth.services';

// LOGIN SCREEN 
const Login = ({ navigation }) => {

    // USE STATE 
    const [mail, setMail] = useState("");
    const [password, setPassword] = useState("");
    const [loader, setLoader] = useState(false)

    // FIREBASE AUTH
    const auth = getAuth();

    // LOGIN FUNCTION
    const handleLogin = (e) => {
        e.preventDefault()
        authServices.Signin(mail, password, setLoader, navigation)
    }

    // RESET PASSWORD FUNCTION
    const sendnewPassword = (e) => {
        e.preventDefault()
        authServices.ResetPassword(mail)
    }

    // CURRENT WORK
    // const go = () => {
    //     signInWithRedirect(auth, googleProvider)
    // }


    return (
        <ImageBackground source={require('../../../assets/bakcgroundLogin.png')} style={styles.back}>
            <View style={styles.view}>
                <Image source={require('../../../assets/logo_white.png')} style={styles.logo} />
                <View style={styles.form}>
                    <TextInputWhite value={mail} onChange={text => setMail(text)} placeholder={LoginString.TV_EMAIL_PLACEHOLDER} />
                    <TextInputWhite value={password} onChange={text => setPassword(text)} placeholder={LoginString.TV_PASSWORD_PLACEHOLDER} secureTextEntry={true} />
                    <Text style={styles.txt} onPress={sendnewPassword}>{LoginString.TV_FORGOT_PASSWORD}</Text>
                </View>
                <View style={styles.cs}>
                    {loader ? (<ActivityIndicator size={35} color="white" style={{ marginBottom: 18 }} />) : (<Buttonn title={LoginString.BT_LOGIN_IN} onPress={handleLogin} />)}
                    <Buttonn title={LoginString.BT_SIGN_IN} onPress={() => navigation.push('Register', { tete: "ok" })} />
                    {/* <Buttonn title="gOOGLE" onPress={go} /> */}
                </View>
            </View>
        </ImageBackground>
    )
}


export default Login;