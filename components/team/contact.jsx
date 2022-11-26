import React, { useEffect, useState } from "react";
import { StyleSheet,View,Text,TextInput,FlatList, ActivityIndicator, TouchableHighlight} from "react-native";
import * as Contacts from "expo-contacts";
import * as SMS from 'expo-sms';
import * as Linking from 'expo-linking';
import { getKitObject } from "../../store/services/link.services";
import axios from "axios";
export default function Contact() {

  const [allcontacts, setcontact] = useState([]);
  const [allcontactsfilter, setcontactfilter] = useState([]);
  const [searchcontact, setsearchcontact] = useState("");
  const [loading, setloading] = useState(false);
  const {  kitName, kitId  } = getKitObject();

  useEffect(() => {
    (async () => {
      const { status } = await Contacts.requestPermissionsAsync();
      if (status === "granted") {
        const { data } = await Contacts.getContactsAsync({
          fields: [Contacts.Fields.PhoneNumbers],
        });
        if (data.length > 0) {
          setcontact(data);
          setcontactfilter(data); 
          setloading(false);
        }
      }
    })();
    setloading(true);
  }, []);

  const sendSms = async (number) => {
    const isAvailable = await SMS.isAvailableAsync();
    console.log("LE ID DU KIT : " + kitId)
    const redirectUrl = Linking.createURL('/home/into/app', {
        queryParams: { id: kitId },
    });
    if (isAvailable) {
      axios.post('https://api.short.io/links/public', {
            "domain":"59bl.short.gy",
            "originalURL": `${redirectUrl}`,
        }, {
        headers: {
            'accept': 'application/json',
            'Content-Type': 'application/json',
            'authorization': 'pk_zhdGt6PehzzBWpvn'
        }
        }).then(res => {
          SMS.sendSMSAsync([number],
            "Vous êtes invité à rejoindre le kit capteur " + kitName + "\n" + res.data.shortURL+"",
              {
                    
              })        
        }).catch(error => {
        console.error(error)
        })
          } else {
         console.log("le sms n'est pas disponible")
    }
  };

  const filtercontacts = (e) => {
    const filtervalue = allcontactsfilter.filter((contact) => {
      allcontactsfilter;
      let lowercase = `${contact.firstName} ${contact.lastName}`.toLowerCase();
      let searchlowercase = e.toLowerCase();
      return lowercase.indexOf(searchlowercase) > -1;
    });
    setsearchcontact(setcontact(filtervalue));
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={{
          backgroundColor: "#D5D1D1",
          height: 40,
          paddingLeft: 23,
          borderRadius: 10,
          width: "90%",
          borderBottomWidth: 0.3,
          marginBottom: 20,
          borderBottomColor: "#ddd",
        }}
        placeholder="Rechercher un contact"
        value={searchcontact}
        onChangeText={filtercontacts}
      />
      {loading ? (
        <View>
          <ActivityIndicator size={35} color="green" />
        </View>
      ) : null}

      <FlatList 
        style={styles.flatList}
        data={allcontacts}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
            <TouchableHighlight style= {{marginBottom:15}}
             onPress = {() => item.phoneNumbers == undefined || null? [] : sendSms(item.phoneNumbers[0]?.number)}>
          <View style={{ minHeight: 70, padding: 5, width: "auto"}}>
         
            <Text>
              {item?.firstName == null
                ? "Veuillez mettre à jour le nom dans votre répertoire téléphonique"
                : item.firstName}
              {item?.lastName == null ? null : item.lastName}
            </Text>
            <Text style={{ color: "green" }}>
              {item.phoneNumbers == undefined || null
                ? []
                : item.phoneNumbers[0]?.number}
            </Text>
        
          </View>
          </TouchableHighlight>
        )}
        ListEmptyComponent={() => (
          <Text style={{ fontSize: 20, marginVertical: 40 }}>No contact </Text>
        )}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    padding: 15,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  flatList: {
    width: "100%",
  },
});
