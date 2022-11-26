import { ref, set } from "firebase/database";
import { db } from "./store/services/firebase.services";

const SECS_IN_DAY = 86400;
const SECS_IN_WEEK = 604800;
const PAYLOAD_MAX_LENGTH = 127;

// Fin de la saison d'irrigation, il s'agt d'une astuce pour la carte
const SEASON_END = 1830000000;

function irrigCalendarPayload(irrigCalendar, irrigDurationCalendar, curr) {
    // Permet d'obtenir le timestamp du jour suivant
    const date = new Date();
    const nextDay = date/1000 + SECS_IN_DAY - (date/1000)%SECS_IN_DAY;
    const timeZoneShift = date.getTimezoneOffset()*60; // Décalage horaire entre UTC et Paris, en secondes

    // Permet de décaler toutes les valeurs du tableau en entrée pour adapter avec le décalage
    const shift = date.getUTCDay()*SECS_IN_DAY;
    irrigCalendar = irrigCalendar.map(irrig => (irrig-shift)%SECS_IN_WEEK);

    // Démarrage de la payload
    let payload = "";

    // Ouverture des paramètres, arrêt de l'irrig, effacage des paramètres précédents, arret du mode auto
    payload += "138,,,1;128;135;140;";

    // Paramétrage de la saison d'irrigation
    payload += "130," + nextDay + ",0,3;" + "130," + SEASON_END + ",0,4;";

    // Paramétrage du cycle d'irrigation
    payload += "130,0,0,0;"; // Obligatoire pour le début du cycle
    for(let [index, irrigTime] of irrigCalendar.entries()){
        payload += "130," + Math.abs((irrigTime+timeZoneShift)) + "," + (index+1) + ",0;";
    }

    payload += "130," + SECS_IN_WEEK + "," + (irrigCalendar.length+1) + ",0;"; // Obligatoire pour la fin du cycle
    payload += "130," + (irrigCalendar.length+1) + ",0,2;"; // Nombre d'arrosages

    // Paramétrage des sessions d'irrigation
    payload += "130,0,0,1;";
    for(let [index, irrigDuration] of irrigDurationCalendar.entries()){
        payload += "130," + irrigDuration + "," + (index+1) + ",1;";
    }
    payload += "130,0," + (irrigDurationCalendar.length+1) + ",1;";

    // Paramètres finaux (Uniquement présents pour éviter toute sourcede bug)
    payload += "130,10,0,9;"; // Fixe la durée minimum d'une session d'arrosage à 10 secondes
    payload += "130,10,0,7;"; // Fixe la durée d'une session d'arrosage unique à 10 secondes
    payload += "138;134;"; // Ferme les paramètres et enclenche l'irrigation
    payload += "137;"; // Met à jour les paramètres pour être sûr que ce soit pris en compte

    set(ref(db, "gardeners/" + curr + "/payload"), cutPayload(payload)).then(() => {
        console.log("Payload updated");
    })
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
    while(substringEnd < payload.length-1){
        substringBegin = substringEnd;
        // Il ne faut pas couper la payload n'importe où, il faut couper à la fin de l'instruction la plus proche des 128 caractères, soit le dernier point virgule
        substringEnd = payload.lastIndexOf(";", substringEnd + PAYLOAD_MAX_LENGTH - 8);
        slice = payload.slice(substringBegin + 1, substringEnd + 1);
        returnPayload.push(wrapPayload(slice));
    }
    return returnPayload;
}

function main(){

    // Nombres de secondes entre le lundi dernier minuit et chaque arrosage
    let irrigCalendar = [131400, 132400, 133400, 134000, 135000, 136000, 137000, 138000, 139000, 140000, 141000, 142000, 143000, 144000, 145000, 146000];
    
    // Durée de chaque irrigation correspondante dans le tableau ci-dessus
    let irrigDurationCalendar = [300, 300, 300, 300, 300, 300, 300, 300, 300, 300, 300, 300, 300, 300, 300, 300];

    let payloadTable = irrigCalendarPayload(irrigCalendar, irrigDurationCalendar);
    console.log(payloadTable);
}



export default irrigCalendarPayload
//main();