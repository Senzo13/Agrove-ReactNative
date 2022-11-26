import { getAuth } from "firebase/auth";
import { onValue, ref, set } from "firebase/database";
import { useState } from "react";
import { useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableHighlight,
  Image,
  ScrollView,
} from "react-native";
import Card from "../../components/team/card";
import { db } from "../../store/services/firebase.services";
import { kitObject } from "../../store/services/link.services";
import styles from './team_style';

const Team = ({ route, navigation }) => {
  const [owners, setOwners] = useState([]);
  const auth = getAuth();

  useEffect(() => {
    kitObject.kitId = route.params.curr;
    const getOwners = () => {
      setOwners([]);
      const resp = ref(db, "gardeners/" + route.params.curr + "/owners");
      onValue(resp, async (snapshot) => {
        const data = snapshot.val();
        setOwners(Object.keys(data));
        setCallbackFunction(() => () => navigation.push("Contact"));
      });
    };
    getOwners();
  }, []);

  const callback = () => {
    return navigation.push("Contact");
  };

  return (
    <ScrollView>
      <View style={styles.header}>
        <TouchableHighlight
          underlayColor="transparent"
          style={styles.button}
          onPress={() => navigation.goBack()}
        >
          <Image
            source={require("../../assets/backGreen.png")}
            style={styles.image}
          />
        </TouchableHighlight>
        <View></View>
        {/* <TouchableHighlight underlayColor="transparent" style={style.reglage} onPress={() => navigation.push('Configuration', {curr : route.params.curr})}>
                <Image source={require('../assets/reglage.png')} style={style.image}/>
                </TouchableHighlight> */}
      </View>
      <View style={styles.txtContainer}>
        <Text style={styles.title}>Mon équipe</Text>
        <Text style={styles.txt}>
          Ici j'invite les personnes qui jardinent {"\n"}avec moi !
        </Text>
      </View>
      <View style={styles.list}>
        <Card id="add" curr={route.params.curr} cb={() => callback()} />
        {owners.map((e, key) =>
          e != auth.currentUser.uid ? (
            <Card key={key} id={e} curr={route.params.curr} />
          ) : null
        )}
      </View>
    </ScrollView>
  );
};

export default Team;
