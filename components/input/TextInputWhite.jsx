import {StyleSheet, View, TextInput} from 'react-native'



const TextInputWhite = ({value, onChange, secureTextEntry, placeholder}) => {
    return (
        <View style={styles.view}>
            <TextInput
                style={styles.input}
                value={value}
                onChangeText={(text) => onChange(text)}
                placeholder={placeholder}
                secureTextEntry={secureTextEntry}
                // placeholderTextColor="#ffffff50"
                placeholderTextColor="rgba(243, 243, 243, 0.579)" // modifié par lorenzo
                autoCapitalize='none' 
            />
        </View>
    )
}


const styles = StyleSheet.create({
    input: {
        width: '100%',
        paddingBottom: 8,
        marginBottom: 18, // modifié par lorenzo
        borderBottomWidth: 1,
        borderColor: '#fff',
        color: '#fff',
        fontSize: 16,
    },
    view: {
        
    }
})

export default TextInputWhite;