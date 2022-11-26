import LottieView from 'lottie-react-native';
import styles from './splash.screen_style';

export const Splash = ({ props, navigation }) => {

    useEffect(() => {
        setTimeout(() => {
            navigation.replace('Home')
        }, 3000)
    }, [])

    return (
        <View style={styles.container}>
            <LottieView source={require('../../assets/animation/splash_screen_fr.json')} autoPlay loop />
        </View>
    )
}


