export const AuthError = (error) => {
    switch (error.code) {
        case "auth/email-already-in-use":
            return "L'email est déja utilisé"
        case "auth/invalid-email":
            return "L'email est incorrect"
        case "auth/invalid-phone-number":
            return "Le numero de telephone est invalide"
        case "auth/missing-email":
            return "Vous avez oublié l'adresse mail"
        case "auth/missing-phone-number":
            return "Il manque votre numero de telephone"
        case "auth/network-error":
            return "Probleme de reseau sur votre mobile"
        case "auth/user-not-found":
            return "L'email est incorrect"
        case "auth/weak-password":
            return "Votre mot de passe doit contenir minimum 6 caractères"
        case "auth/wrong-password":
            return "Mauvais mot de passe"
            case "auth/requires-recent-login":
            return "Vous devez vous reconnecter pour effectuer cette action"
        default:
            return error.message
    }
}