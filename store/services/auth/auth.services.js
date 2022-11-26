import { createUserWithEmailAndPassword, getAuth, sendPasswordResetEmail, signInWithEmailAndPassword } from "firebase/auth"
import { Alert } from "react-native"
import { AuthError } from "../../../utils/ErrorUtils";
import writeUserData from "../user/user.services";

const auth = getAuth();

// TODO: CREATE AUTHSTATE WITH AUTH MESSAGE FOR REDIRECT AND ERROR 

// SIGNIN SERVICE
const Signin = (mail, password, setLoader, navigation) => {
    if(mail == "" || password == ""){
        Alert.alert("Erreur", "Veuillez remplir tous les champs")
    }else{
        setLoader(true)
        signInWithEmailAndPassword(auth, mail, password)
            .then((userCredential) => {
                // Signed in 
                setLoader(false)
                navigation.replace('Home')
                // ...
            }).catch((error) => {
                Alert.alert("Erreur", AuthError(error))
                setLoader(false)
            });
    }
}

// REGISTER SERVICE
const Register = (mail, password, name, lastname, navigation) => {
    createUserWithEmailAndPassword(auth, mail, password).then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
        writeUserData(user.uid, name, lastname).then((use) => {
           navigation.push("Home")
        }).catch((error) => {
            Alert.alert("Erreur", AuthError(error))
        })
    }).catch((error) => {
            Alert.alert("Erreur", AuthError(error))
        });
}

// RESET PASSWORD SERVICE
const ResetPassword = (mail) => {
    sendPasswordResetEmail(auth, mail)
            .then(() => {
                Alert.alert("Succès", "Un email vous a été envoyé pour réinitialiser votre mot de passe")
            })
            .catch((error) => {
                Alert.alert("Erreur", AuthError(error))
            })
}

export default {Signin, ResetPassword, Register};