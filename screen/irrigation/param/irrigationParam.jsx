import { Alert, Image, StyleSheet, TouchableHighlight } from "react-native";
import { View, Text } from "react-native";
import Slider from "@react-native-community/slider";
import React, { useState } from "react";
import { useFocusEffect } from "@react-navigation/native";
import { off, onValue, ref, set, update } from "firebase/database";
import { db } from "../../../store/services/firebase.services";
import Color from "../../../theme/color";
import styles from './irrigationParam_style';

const IrrigationParam = ({ route, navigation }) => {
  const [irrigValue, setirrigValue] = useState(25);
  const [baseValue, setbaseValue] = useState(25);

  useFocusEffect(
    React.useCallback(() => {
      const irrigRef = ref(db, "gardeners/" + route.params.curr + "/config/");
      const irrigListener = onValue(irrigRef, (snapshot) => {
        const data = snapshot.val();
        if (data != null) {
          if (data.irrigation != null) {
            setirrigValue(data.irrigation);
            setbaseValue(data.irrigation);
          } else {
            setirrigValue(25);
            setbaseValue(25);
          }
        }
      });
      return () => {
        console.log("unmount");
        off(irrigRef, "value", irrigListener);
      };
    }, [])
  );

  const setIrrig = () => {
    if (irrigValue != baseValue) {
      const irrigRef = ref(db, "gardeners/" + route.params.curr + "/config/");
      //irrigRef.update({ irrigation: value })
      update(irrigRef, { irrigation: irrigValue }).then(() => {
        Alert.alert("Paramètre mis à jour");
      });
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>
          Réception des notifications d’arrosage{" "}
        </Text>
        <Text style={styles.text}>
          Seuil d’humidité à partir duquel m’envoyer une notification
          d’arrosage.
        </Text>
        <View style={{ width: "100%", alignItems: "center" }}>
          <Text>{irrigValue}%</Text>
          <Slider
            style={{ width: "90%", height: 40 }}
            minimumValue={0}
            maximumValue={100}
            minimumTrackTintColor="#D9D9D9"
            maximumTrackTintColor="#D9D9D9"
            value={irrigValue}
            onValueChange={(value) => setirrigValue(value)}
            step={1}
          />
        </View>
      </View>
      <View style={styles.viewValid}>
        <TouchableHighlight
          underlayColor="transparent"
          onPress={() => setIrrig()}
          style={[
            styles.clickZone,
            { opacity: irrigValue == baseValue ? 0.25 : 1 },
          ]}
        >
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <Image source={require("../../../assets/CheckCircle.png")} />
            <Text style={styles.clickText}> Valider les modifications </Text>
          </View>
        </TouchableHighlight>
      </View>
    </View>
  );
};



export default IrrigationParam;
