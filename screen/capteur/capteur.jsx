import { db } from "../../store/services/firebase.services";
import { onValue, ref, set, remove, off } from "firebase/database";
import { useState, useEffect } from "react";
import { getAuth } from "firebase/auth";
import {
  View,
  StyleSheet,
  Text,
  ScrollView,
  ImageBackground,
  TextInput,
  ActivityIndicator,
} from "react-native";
import { Dimensions } from "react-native";
import CapteurString from "../../values/string/add.capteur/fr/string";
import Buttonn from "../../components/button/buttonn";
import {
  createGarden,
  addIrrigGardenState,
  addCurrentGardener,
} from "../../store/services/kit.agrove/kit.agrove.services";
import { useFocusEffect } from "@react-navigation/native";
import React from "react";
import { Alert } from "react-native";

import styles from './capteur_style';
export const Capteur = ({ route, navigation }) => {
  const TITLE_VIEW = "PAGE FILE : SCREEN/Capteur.jsx";
  const auth = getAuth();
  const capteurInfo = JSON.parse(route.params.info);
  const [checkExist, setCheckExist] = useState(false);
  const [name, setName] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [country, setCountry] = useState("");
  const [loader, setLoader] = useState(false);

  useFocusEffect(
    React.useCallback(() => {
      const resp = ref(db, "gardeners/" + capteurInfo._id);
      onValue(resp, (snapshot) => {
        const data = snapshot.val();
        if (!data) return;
        setCheckExist({
          owners: data.owners ? false : true,
          inOwners: data.owners
            ? auth.currentUser.uid in data.owners
              ? true
              : false
            : false,
          inSubscribers: data.subscribers
            ? data.subscribers.includes(auth.currentUser.uid)
            : false,
        });
      });
      return () => {
        console.log("unmount");
        off(resp);
      };
    }, [])
  );

  const handleCreate = () => {
    if (name != "") {
      setLoader(true);
      const addToOwners = ref(
        db,
        "/users/" + auth.currentUser.uid + "/metadata/" + "addToOwners/"
      );
      onValue(addToOwners, (snapshot) => {
        const data = snapshot.val();
        if (data != "") {
          switch (data) {
            case "ok":
              remove(addToOwners);
              console.log(
                `name : ${name}, zipCode : ${zipCode}, country : ${country}`
              );
              createGarden(capteurInfo._id, name, zipCode, country)
                .then((use) => {
                  // console.log("id : " + capteurInfo._id + " irrig : " + capteurInfo.irrig)
                  addIrrigGardenState(capteurInfo._id, capteurInfo.irrig).then(
                    () => {
                      addCurrentGardener(
                        capteurInfo._id,
                        auth.currentUser.uid
                      ).then(() => {
                        setLoader(false);
                        navigation.replace("Home");
                      });
                    }
                  );
                })
                .catch((error) => {
                  console.log(error.message);
                });
              break;
            case "ko":
              console.log(`${TITLE_VIEW} : KO`);
              break;
          }
        }
      });
      set(
        ref(
          db,
          "/users/" + auth.currentUser.uid + "/metadata/" + "addToOwners/"
        ),
        `4|${capteurInfo._id}`
      );
    } else {
      Alert.alert("Attention", "Veuillez remplir tous les champs");
    }
  };

  return (
    <ScrollView style={styles.container}>
      {checkExist.owners && !checkExist.inOwners ? (
        <View style={styles.container}>
          <View style={styles.formContainer}>
            <Text style={styles.title}>Configurez votre capteur Agrove</Text>
          </View>
          <View style={styles.tfContainer}>
            <Text style={styles.txt}>Renommez votre capteur</Text>
            <TextInput
              style={styles.input}
              value={name}
              onChangeText={(text) => setName(text)}
              placeholder="Nom du capteur"
            />
          </View>
          <View style={styles.tfContainer}>
            <Text style={styles.txt}>Code postal</Text>
            <TextInput
              style={styles.input}
              value={zipCode}
              keyboardType="numeric"
              onChangeText={(text) => setZipCode(text)}
              placeholder="Code postal"
            />
          </View>
          <View style={styles.tfContainer}>
            <Text style={styles.txt}>Pays</Text>
            <TextInput
              style={styles.input}
              value={country}
              onChangeText={(text) => setCountry(text)}
              placeholder="Nom du pays"
            />
          </View>
          <View style={styles.cs}>
            <View>
              {loader ? (
                <ActivityIndicator size={35} color="green" />
              ) : (
                <Buttonn
                  title={CapteurString.BT_ADD_KIT}
                  onPress={handleCreate}
                />
              )}
            </View>
          </View>
        </View>
      ) : (
        <View style={{ width: "100%" }}>
          <ImageBackground
            style={styles.imageBackgroundBottom}
            source={require("../../assets/mes_abonnements.webp")}
          ></ImageBackground>
          <View style={{ display: "flex", flex: 1 }}>
            <View style={styles.container}>
              <Text style={{ textAlign: "center" }}>
                Une équipe de jardiniers est déjà aux petits soins pour ce
                capteur !
              </Text>
              <View style={{ marginTop: 30 }}></View>
            </View>
          </View>
        </View>
      )}
    </ScrollView>
  );
};
