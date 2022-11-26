import React from 'react';
import { Text, View, StyleSheet, TouchableHighlight } from 'react-native';
import Color from '../../theme/color';
import { useState } from 'react';

export default function Buttonn(props) {
  const { onPress, title, alert } = props;

  const [ isPress, setIsPress ] = useState(false);

  const touchProps = {
    activeOpacity: 1,
    underlayColor: alert != true ? Color.GREEN_AGROVE_PRESSED : Color.RED_AGROVE_PRESSED,// <-- "backgroundColor" will be always overwritten by "underlayColor"
    style: isPress ? styles.btnPress : styles.btnNormal, // <-- but you can still apply other style changes
    onHideUnderlay: () => setIsPress(false),
    onShowUnderlay: () => {
      setIsPress(true)
    },
    // onPress: () => console.log(isPress),  // <-- "onPress" is apparently required
  };

  return (
    <TouchableHighlight {...touchProps } onPress={onPress} style={[styles.button, alert != true ? { backgroundColor: Color.GREEN_AGROVE} :  {backgroundColor:Color.RED_AGROVE}]}  >
      <Text   style={styles.text}>{title}</Text>
    </TouchableHighlight>
  );
}

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
    paddingHorizontal: 32,
    borderRadius: 25,
    elevation: 3,
    width: 'auto',
    marginBottom: '5%',
  },
  btnNormal: {
    backgroundColor : Color.GREEN_AGROVE,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
    paddingHorizontal: 32,
    borderRadius: 25,
    elevation: 3,
    width: 'auto',
    marginBottom: '5%',
  },
  btnPress: {
    backgroundColor : Color.GREEN_AGROVE,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
    paddingHorizontal: 32,
    borderRadius: 25,
    elevation: 3,
    width: 'auto',
    marginBottom: '5%',

  },
  text: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: 'normal',
    letterSpacing: 0.25,
    color: 'white',
  },
});