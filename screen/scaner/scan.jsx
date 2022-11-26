import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet, Button } from "react-native";
import { BarCodeScanner } from "expo-barcode-scanner";
import { SafeAreaView } from "react-native-safe-area-context";
import { Camera } from "expo-camera";
import { useFocusEffect } from "@react-navigation/native";
import { checkQrCode } from "../../utils/utils";
import { Alert } from "react-native";
import styles from './scan_style';

export const Scan = ({ route, navigation }) => {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [x, setX] = useState(0);
  const [y, setY] = useState(0);
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);

  useFocusEffect(
    React.useCallback(() => {
      const getBarCodeScannerPermissions = async () => {
        const { status } = await Camera.requestCameraPermissionsAsync();
        setHasPermission(status === "granted");
      };
      getBarCodeScannerPermissions();
      return () => {
        // permet de perdre le focus
        // console.log('perte du focus')
        setScanned(false);
        setHasPermission(null);
      };
    }, [])
  );

  const handleBarCodeScanned = ({ bounds, data }) => {
    const { origin, size } = bounds;
    // console.log(bounds) // console log les coordonnées du QR code
    setScanned(true);
    setX(origin.x);
    setY(origin.y);
    setWidth(size.width);
    setHeight(size.height);
    console.log(data);

    setScanned(true); // Réinitialise la lecture du qrCode(Pour pouvoir changer de scan à tout moment)
    if (checkQrCode(data)) {
      navigation.push("Capteur", { info: data });
      setScanned(false);
    } else {
      Alert.alert("Erreur", "Le QR code n'est pas valide", [
        { text: "OK", onPress: () => setScanned(false) },
      ]);
    }
  };

  if (hasPermission === null) {
    return (
      <View style={{ alignSelf: "center" }}>
        <Text>Demande d'autorisation à la caméra requise</Text>
      </View>
    );
  }
  if (hasPermission === false) {
    return (
      <View style={{ alignSelf: "center" }}>
        <Text>Pas d'accès à la caméra</Text>;
      </View>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 1 }}>
        <Text style={{ textAlign: "center" }}>Scanner le qr Code !</Text>
      </View>

      <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={styles.scan}
      />

      <View
        style={[
          styles.position,
          {
            top: y,
            left: x,
            width: width,
            height: height,
            borderWidth: 2,
            borderColor: "#4ABF86",
          },
        ]}
      ></View>
      <View style={{ flex: 1 }}></View>
    </SafeAreaView>
  );
};

