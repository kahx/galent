import React, {useContext, useEffect, useState} from 'react';
import {View, StyleSheet, ScrollView} from 'react-native';
import {Button, Header, Text, Divider, Image} from 'react-native-elements';
import axiosInstance from "../api/axiosInstance";
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/FontAwesome';
import {Context as AuthContext} from '../context/authContext';

const AccountScreen = ({navigation}) => {
    const {signout} = useContext(AuthContext);
    const [birthDate, setBirthDate] = useState();
    const [gender, setGender] = useState();
    const [city, setCity] = useState();
    const [phone, setPhone] = useState();
    const [skills, setSkills] = useState();
    const [portfolio, setPortfolio] = useState();
    const [education, setEducation] = useState([]);
    const [experience, setExperience] = useState([]);
    useEffect(() => {
        getData()
      }, []);
    const getData = async () => {
        const token = await AsyncStorage.getItem('token');
        const headers = {
          Authorization: 'kolonya ' + token
        };
        const response = await axiosInstance.get(
          "/resumes",
          {headers}
        );
        const data = JSON.parse(JSON.stringify(response.data[0].sections))
        setSkills(data[0].skills)
        setBirthDate(data[0].birthdate)
        setGender(data[0].gender)
        setCity(data[0].city)
        setPhone(data[0].phone)
        setPortfolio(data[0].portfolio)
        setEducation(data[0].education)
        setExperience(data[0].experience)
      };
    return(
        <ScrollView>
            <Header leftComponent={<Icon
                name='chevron-left'
                style={{margin:6}}
                size={22}
                onPress={() => navigation.goBack()}/>}
                rightComponent={<Icon
                    name='edit'
                    style={{margin:6}}
                    size={22}
                    />}
                backgroundColor='#BBBBBB'
                centerComponent={{ text: 'Profil', style: styles.heading }}
                />
            <View style={{marginHorizontal:10}}>
              <View style={{alignItems:'center', marginVertical:8}}>
              <Text style={{fontSize:24}}>Kaan Sarıaydın</Text>
              <View style={{flexDirection: 'row', alignItems: 'center', marginTop:8}}>
                <Icon name='map-marker' size={15} style={{marginRight:7}}/>
                <Text style={{fontSize:17}}>{city}</Text>
              </View>
              <View style={{flexDirection: 'row', alignItems: 'center', marginTop:8}}>
                <Icon name='phone' size={15} style={{marginRight:7}}/>
                <Text style={{fontSize:17}}>{phone}</Text>
              </View>
              <View style={{flexDirection: 'row', alignItems: 'center', marginTop:8}}>
                <Icon name='globe' size={15} style={{marginRight:7}}/>
                <Text style={{fontSize:17}}>{portfolio}</Text></View>
              </View>
              
              <Text style={{fontSize:24, fontWeight:'bold',margin:12}}>Deneyim</Text>
              <View style={{marginHorizontal:10}}>
                {Object.keys(experience).length > 0 ? 
                (experience.map((e,i) => {
                  return(
                    <View key={i} style={{marginHorizontal: 12}}>
                    <Text style={{fontWeight: 'bold', fontSize:20}}>{e.companyName}</Text>
                    <Text style={{fontSize:19}}>{e.jobTitle}</Text>
                    <Text style={{fontSize:17}}>{e.startingDate} - {e.finishingDate == '-'? <Text style={{fontStyle:'italic'}}>devam ediyor</Text>: e.finishingDate}</Text>
                    </View>
                  )
                })) : (null)}
              </View>
              <Text style={{fontSize:24, fontWeight:'bold',margin:12}}>Okul</Text>
              <View style={{marginHorizontal:10}}>
              {Object.keys(education).length > 0 ? 
              (education.map((e,i) => {
                return(
                  <View key={i} style={{marginHorizontal: 12}}>
                  <Text style={{fontWeight: 'bold', fontSize:20}}>{e.uniName}</Text>
                  <Text style={{fontSize:19}}>{e.departmentName}</Text>
                  <Text style={{fontSize:17}}>{e.startingDate} - {e.finishingDate == '-'? <Text style={{fontStyle:'italic'}}>devam ediyor</Text>: e.finishingDate}</Text>
                  </View>
                )
              })) : (null)}
              </View>
              <Text style={{fontSize:24, fontWeight:'bold', margin: 12}}>Yetenekler</Text>
              <Text style={{fontSize:17, marginHorizontal:22}}>{skills}</Text>
              <Text style={{fontSize:24, fontWeight: 'bold', margin: 12}}>Dil</Text>
              <Text style={{fontSize:17, marginHorizontal:22}}>İngilizce</Text>
              <Button buttonStyle={{margin:20, backgroundColor:'#D82148'}} title={"Çıkış yap"} onPress={signout} />
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
  heading: {
    color: 'white',
    fontSize: 22,
    fontWeight: 'bold',
  },
});

export default AccountScreen;