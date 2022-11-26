import React, { useEffect, useState } from 'react';
import { Alert, Modal, StyleSheet, Text, Pressable,ActivityIndicator, View } from 'react-native';
import { stopGenerateLink } from '../../store/services/link.services';
import { ref, set, remove, onValue } from "firebase/database";
import { getDatabase } from "firebase/database";
import { getAuth } from 'firebase/auth';

const CustomModal = ({props}) => {
  const { navigation, id } = props;
  const [modalVisible, setModalVisible] = useState(true);
  const [loading, setloading] = useState(true);
  const [message, setMessage] = useState("Vous avez bien rejoins le capteur");
  const auth = getAuth();
  

  useEffect(() => {
    const db = getDatabase();

    if(id != "") {
      const metadataName = ref(db, 'gardeners/' + id)
      onValue(metadataName, (snapshot) => {
        const data = snapshot.val();
        console.log(data.metadata.name)
        if(data != ""){
          setMessage("Vous avez bien rejoins le capteur "+ data.metadata.name);
     
        }
      }, {
        onlyOnce: true
      })
    }

    const addToOwners = ref(db, 'users/' + auth.currentUser.uid + '/metadata/' + 'addToOwners/')

    onValue(addToOwners, (snapshot) => {
        const data = snapshot.val();
        
        if(data != ""){
            switch (data) {
                case 'ok':      
                    remove(addToOwners)
                    setloading(false)
                    setCurrentGardenerCallBack(id)
                    break;
                case 'ko':
                    console.log(`KO`)
                    break;
            }
        }
    })

    set(ref(db, 'users/' + auth.currentUser.uid + '/metadata/' + 'addToOwners/'), `4|${id}`)
  }, [])

  const setCurrentGardenerCallBack = (id) => {
    // console.log("set du current gardener dans le callback")
    return props.setCurrentGardener(id)
  }

  const reloadView = () => {
    setModalVisible(!modalVisible);
    navigation.replace('Home')
  }
  
  return (
    <View style={styles.centeredView}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert('la Modal a été fermé.');
          setModalVisible(!modalVisible);
        }}>
        <View style={styles.centeredView}>
      
          <View style={styles.modalView}>
          {loading ? (
        <View>
          <ActivityIndicator size={35} color="green" />
        </View>) : (
            <View>
            <Text style={styles.modalText}>{message}</Text>
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={reloadView}>
              <Text style={styles.textStyle} >FERMER</Text>
            </Pressable>
            </View>)}
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
    
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});

export default CustomModal;