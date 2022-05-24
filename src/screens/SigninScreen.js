import React, {useState, useContext} from 'react';
import {View, StyleSheet, StatusBar, ImageBackground} from 'react-native';
import {Text} from 'react-native-elements';
import { Button, TextInput } from 'react-native-paper';
import {Context as authContext} from '../context/authContext';
import {SafeAreaView} from 'react-native-safe-area-context';

const SigninScreen = ({navigation}) => {
    const {state, signin, clearErrorMessage} = useContext(authContext);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    React.useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            clearErrorMessage()
          });
    }, []);
    const image = { uri: "https://w.wallhaven.cc/full/ym/wallhaven-ym5xx7.jpg" };
    return(
        <SafeAreaView style={styles.container}>
            <StatusBar backgroundColor="#6F4C5B"/>
            <ImageBackground source={image} resizeMode="cover" style={styles.image}>
                <Text style={{alignSelf:'center',marginBottom:20, fontSize:32,fontFamily:'Akshar-SemiBold', color:'#EFEFEF'}}>giriş yap</Text>
                <TextInput label='mail adresi' mode={'outlined'} value={email} onChangeText={setEmail} autoCapitalize='words' autoCorrect={false} style={styles.TextInput} activeOutlineColor='#112B3C'/>
                <TextInput label='şifre' mode={'outlined'} value={password} onChangeText={setPassword} autoCapitalize='words' autoCorrect={false} style={styles.TextInput} activeOutlineColor='#112B3C' secureTextEntry/>
                {state.errorMessage ? <Text style={styles.errorMessage}>{state.errorMessage}</Text> : null}
                <Button style={{alignSelf:'center', marginVertical:20}} mode="contained" color={'#EFEFEF'} onPress={() => {signin({email, password})}}>giriş yap</Button>
                <View style={{flexDirection:'row', alignItems:'center', justifyContent:'center'}}>
                <Text style={{fontSize:17, color:'#EFEFEF'}}>Hesabın yoksa,</Text>
                <Button mode="text" labelStyle={{textDecorationLine: 'underline'}} uppercase={false} color={'#F9F9F9'} onPress={() => {navigation.navigate('SignupScreen')}}>üye ol</Button></View>
            </ImageBackground>
        </SafeAreaView>    
    )
}

const styles = StyleSheet.create({
    container: {
        flex:1,
        
    },
    image: {
        flex: 1,
        justifyContent: "center"
    },
    errorMessage:{
        fontSize: 16,
        color:'red',
        marginBottom: 20
    },
    TextInput:{
        marginHorizontal:20,
        marginVertical:10
    },
});

export default SigninScreen;