// Max length payload = 128 bytes

import { ref, set } from "firebase/database";
import { db } from "./store/services/firebase.services";


const SECS_IN_DAY = 86400;
const SECS_IN_WEEK = 604800;
const PAYLOAD_MAX_LENGTH = 128;

// Fin de la saison d'irrigation, il s'agt d'une astuce pour la carte
const SEASON_END = 1890000000;

    const irrigCalendarPayload = (irrigCalendar, irrigDurationCalendar, curr) => {

        // Nombres de secondes entre le lundi dernier minuit et chaque arrosage (tous les jours 18h)
        // let irrigCalendar = [72000,
        //     158400,
        //     244800,
        //     331200,
        //     417600,
        //     504000,
        //     590400,];
    
        // Durée de chaque irrigation correspondante dans le tableau ci-dessus
        // let irrigDurationCalendar = [3600,
        //     3600,
        //     3600,
        //     3600,
        //     3600,
        //     3600,
        //     3600,];
    
        let payload = "";
        let date = new Date();
    
        // Ouverture des paramètres, arrêt de l'irrig et arret du mode auto
        payload += "138,,,1;135;140;";
    
        // Paramétrage de la saison d'irrigation
        // Permet d'obtenir le timestamp du lundi du début de la semaine
        const seasonStart = date/1000 - (date/1000)%SECS_IN_DAY - (date.getDay() - 1)*SECS_IN_DAY;
        payload += "130," + seasonStart + ",0,3;" + "130," + SEASON_END + ",0,4;";
    
        // Paramétrage du cycle d'irrigation
        payload += "130,0,0,0;" // Obligatoire pour le début du cycle
        for(let [index, irrigTime] of irrigCalendar.entries()){
            payload += "130," + irrigTime + "," + (index+1) + ",0;";
        }
    
        payload += "130," + SECS_IN_WEEK + "," + (irrigCalendar.length+1) + ",0;"; // Obligatoire pour la fin du cycle
        payload += "130," + (irrigCalendar.length+1) + ",0,2;"; // Nombre d'arrosages
    
        // Paramétrage des sessions d'irrigation
        payload += "130,0,0,1";
        for(let [index, irrigDuration] of irrigDurationCalendar.entries()){
            payload += "130," + irrigDuration + "," + (index+1) + ",1;";
        }
        payload += "130,0," + irrigDurationCalendar.length + ",1;";
    
        // Paramètres finaux (Uniquement présents pour éviter toute sourcede bug)
        payload += "130,10,0,9;"; // Fixe la durée minimum d'une session d'arrosage à 10 secondes
        payload += "130,7200,0,9;"; // Fixe la durée maximum d'une session d'arrosage à 2 heures
        payload += "130,600,0,8;"; // Fixe la durée minimale d'une saison à 10 minutes
        payload += "130,10,0,7;"; // Fice la durée d'une session d'arrosage unique à 10 secondes
        payload += "138;134;"; // Ferme les paramètres et enclenche l'irrigation
    
        
        // console.log(irrigDurationCalendar);
        // console.log(payloadTable);
        //console.log("la payload")
        //console.log(payload);
       //console.log(cutPayload(payload))

    //    set(ref(db, "gardeners/" + curr + "/payload"), cutPayload(payload)).then(() => {
    //     console.log("Payload updated");
    // })
    
        // console.log(cutPayload(payload))
        console.log(cutPayload(payload))
    }
    
    // Chaque payload doit commencer pr 61; et finir par 62;;
    function wrapPayload(payload) {
        return "61;" + payload + "62;;";
    }
    
    // Coupe la payload totale en morceaux de maximum 127 caractères
    function cutPayload(payload){
        let returnPayload = [];
        let substringBegin = 0;
        let substringEnd = -1; // Astuce pour le premier tour de boucle
        let slice = "";
        for(let i=0; i < payload.length/PAYLOAD_MAX_LENGTH; i++){
            substringBegin = substringEnd;
            // Il ne faut pas couper la payload n'importe où, il faut couper à la fin de l'instruction la plus proche des 128 caractères, soit le dernier point virgule
            substringEnd = payload.lastIndexOf(";", substringEnd + PAYLOAD_MAX_LENGTH - 8);
            slice = payload.slice(substringBegin + 1, substringEnd + 1);
            returnPayload.push(wrapPayload(slice));
        }
        return returnPayload;
    }

// function main() {
//     let payload = irrigCalendarPayload();
//     writeTxtFile(payload);
// }


//main();
export default irrigCalendarPayload





