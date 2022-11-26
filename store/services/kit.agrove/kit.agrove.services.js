import { ref, set, off } from "firebase/database";
import { db } from '../firebase.services';

export function createGarden(guid, name, zip, country) {    
    return set(ref(db, '/gardeners/' + guid + "/metadata/"), {
        name: name,
        zipCode: zip,
        countryCode : country
    });
}

export function addIrrigGardenState(guid, irrigBoolean) {
    return set(ref(db, '/gardeners/' + guid + "/irrig/"), + irrigBoolean == true ? true : false);
}

export function addCurrentGardener(guid, userUid) {
    return set(ref(db, '/users/' + userUid + '/currentGardener/'), guid)
}

