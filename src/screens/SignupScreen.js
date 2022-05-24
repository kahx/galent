import React, {useState, useContext} from 'react';
import {View, StyleSheet, ImageBackground, StatusBar} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Text} from 'react-native-elements';
import { Button, Switch, TextInput } from 'react-native-paper';
import { Context as authContext} from '../context/authContext';

const SignupScreen = ({navigation}) => {
    const {state, signup, clearErrorMessage} = useContext(authContext);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');
    React.useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            clearErrorMessage()
          });
    }, []);
    const image = { uri: "https://w.wallhaven.cc/full/ym/wallhaven-ym5xx7.jpg" };

    return(
        <SafeAreaView style={{flex:1}}>
            <ImageBackground source={image} resizeMode="cover" style={styles.image}>
            <Text style={{alignSelf:'center',marginBottom:20, fontSize:32,fontFamily:'Cairo-Semibold', color:'#EFEFEF'}}>üyeliğini oluştur</Text>
            <StatusBar backgroundColor="#6F4C5B"/>
            <View style={styles.container}>
            
                <View style={{flexDirection:'row'}}>
                    <TextInput label='ad' mode={'outlined'} value={name} onChangeText={setName} autoCapitalize='words' autoCorrect={false} style={[styles.TextInput, {flex:1}]} activeOutlineColor='#112B3C'/>
                    <TextInput label='soyad' mode={'outlined'} value={surname} onChangeText={setSurname} autoCapitalize='words' autoCorrect={false} style={[styles.TextInput, {flex:1}]} activeOutlineColor='#112B3C'/>
                </View>
                <TextInput label='mail adresi' mode={'outlined'} value={email} onChangeText={setEmail} autoCapitalize='words' autoCorrect={false} style={styles.TextInput} activeOutlineColor='#112B3C'/>
                <TextInput label='şifre' mode={'outlined'} value={password} onChangeText={setPassword} autoCapitalize='words' autoCorrect={false} secureTextEntry style={styles.TextInput} activeOutlineColor='#112B3C'/>
                {state.errorMessage ? <Text style={styles.errorMessage}>{state.errorMessage}</Text> : null}
                <Button style={{alignSelf:'center', marginVertical:20}} mode="contained" color={'#EFEFEF'} onPress={() => {signup({email, password,name,surname})}}>kaydol</Button>
                <View style={{flexDirection:'row', alignItems:'center', justifyContent:'center'}}>
                <Text style={{fontSize:17, color:'#EFEFEF'}}>Üyeysen,</Text>
                <Button mode="text" labelStyle={{textDecorationLine: 'underline'}} uppercase={false} color={'#F9F9F9'} onPress={() => {navigation.navigate('SigninScreen')}}>giriş yap</Button></View>
            </View></ImageBackground>   
        </SafeAreaView>
    ) 
}

const styles = StyleSheet.create({
    container: {
        marginHorizontal:10
        
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
    link:{
        color:'blue',
        fontSize:17
        
    },
    TextInput:{
        marginHorizontal:20,
        marginVertical:10
    },
});

export default SignupScreen;