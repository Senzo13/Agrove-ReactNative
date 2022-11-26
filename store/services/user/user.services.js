import { getDatabase, ref, set } from "firebase/database";

function writeUserData(userId, fname, lname) {
    const db = getDatabase();
    return set(ref(db, 'users/' + userId + "/metadata"), {
        firstName: fname,
        lastName: lname
    });
}

export default writeUserData;