import React, {useContext, useEffect, useState} from 'react';
import {View, StyleSheet, StatusBar} from 'react-native';
import { Header, Text, Divider} from 'react-native-elements';
import Swiper from 'react-native-swiper';
import { Button, Switch, TextInput } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import RNPickerSelect from 'react-native-picker-select';
import Carousel from 'react-native-snap-carousel';
import axiosInstance from "../api/axiosInstance";
import AsyncStorage from '@react-native-async-storage/async-storage';

const placeholder = {
  label: 'cinsiyet',
  value: null,
};
export default class App extends React.Component {

 
    constructor(props){
        super(props);
        this.state = {
          activeIndex:0,
          birthDate: '',
          phone: '',
          city: '',
          portfolio: '',
          gender: '',
          uniName: '',
          departmentName: '',
          startingDate: '',
          finishingDate: '',
          skills: '',
          companyName: '',
          jobTitle:'',
          jobStartingDate:'',
          jobFinishingDate:'',
          carouselItems: [
          {
              title:"Item 1",
              text: "Text 1",
          },
          {
              title:"Item 2",
              text: "Text 2",
          },
          {
              title:"Item 2",
              text: "Text 2",
          },
        ]
      }
      this._renderItem = this._renderItem.bind(this);
    }

    async saveToDB(){
      const token = await AsyncStorage.getItem('token');
      const headers = {
        'Authorization': 'kolonya ' + token,
        'Content-Type': 'application/json',
      };
      const params = {
        birthdate: this.state.birthDate,
        phone: this.state.phone,
        city: this.state.city,
        portfolio: this.state.portfolio,
        gender: this.state.gender,
        skills: this.state.skills,
        "education": [{
        uniName: this.state.uniName,
        departmentName: this.state.departmentName,
        startingDate: this.state.startingDate,
        finishingDate: this.state.finishingDate,
        }],
        "experience": [{
        companyName: this.state.companyName,
        jobTitle: this.state.jobTitle,
        startingDate: this.state.jobStartingDate,
        finishingDate: this.state.jobFinishingDate
      }]
      };
      const response = await axiosInstance.post(
        "/resumes",
        { sections: params }, {headers}
      );
      const data = response.data
      console.log(data)
    }

    _renderItem({item,index}){
      const firstRow = index == 0 ? (
        <View style={{
          backgroundColor:'white',
          borderRadius: 5,
          
           }}>
        <StatusBar backgroundColor="#AAAAAA"/>
            <Text style={styles.text}>Merhaba Kaan</Text>
            <TextInput label='doğum tarihi' placeholder='30.12.1900' keyboardType='numeric' mode={'outlined'} value={this.state.birthDate} onChangeText={(i) => this.setState({birthDate:i})} autoCapitalize='words' autoCorrect={false} style={styles.TextInput}/>
            <TextInput label='telefon numarası' mode={'outlined'} maxLength={11} keyboardType='numeric' value={this.state.phone} onChangeText={(i) => this.setState({phone:i})} autoCapitalize='words' autoCorrect={false} style={styles.TextInput}/>
            <TextInput label='şehir' mode={'outlined'} value={this.state.city} onChangeText={(i) => this.setState({city:i})} autoCapitalize='words' autoCorrect={false} style={styles.TextInput}/>
            <TextInput label='portfolyo' placeholder='github.com/username' mode={'outlined'} value={this.state.portfolio} onChangeText={(i) => this.setState({portfolio:i})} autoCapitalize='words' autoCorrect={false} style={styles.TextInput}/>
            <RNPickerSelect
              placeholder={placeholder}
              items={[{
                label: 'Erkek',
                value: 'erkek',
              },
              {
                label: 'Kadın',
                value: 'kadin',
              }]}
              onValueChange={i => {
                this.setState({gender:i})
              }}
              value={this.state.gender}
              style={styles.picker}
            />
            <Text style={{margin:15, textAlign:'center'}}>belirtmek istemediklerini boş bırakabilirsin.</Text>
      </View>
        ) : null;
        const secondRow = index == 1? (
          <View style={{
            backgroundColor:'white',
            borderRadius: 5,
            marginLeft:10
             }}>
           <Text style={styles.text}>Eğitim</Text>
          <TextInput label='okul adı' mode={'outlined'} value={this.state.uniName} onChangeText={(i) => this.setState({uniName:i})} autoCapitalize='words' autoCorrect={false} style={styles.TextInput}/>
          <TextInput label='bölüm adı' mode={'outlined'} value={this.state.departmentName} onChangeText={(i) => this.setState({departmentName:i})} autoCapitalize='words' autoCorrect={false} style={styles.TextInput}/>
          <TextInput label='başlangıç tarihi' placeholder='eylül 2019' mode={'outlined'} value={this.state.startingDate} onChangeText={(i) => this.setState({startingDate:i})} autoCapitalize='words' autoCorrect={false} style={styles.TextInput}/>
          <TextInput label='bitiş tarihi' placeholder='haziran 2023(muhtemel)' mode={'outlined'} value={this.state.finishingDate} onChangeText={(i) => this.setState({finishingDate:i})} autoCapitalize='words' autoCorrect={false} style={[styles.TextInput, {marginBottom:35}]}/>
        </View>
        ) : null;
        
        const thirdRow = index == 2? (
          <View style={{
            backgroundColor:'white',
            borderRadius: 5,
            marginLeft:10
             }}>
           <Text style={styles.text}>Yetenekler ve Deneyim</Text>
            <TextInput label='yetenekler(Unity, C#, Git...)' mode={'outlined'} value={this.state.skills} onChangeText={(i) => this.setState({skills:i})} autoCapitalize='words' autoCorrect={false} style={styles.TextInput}/>
            <TextInput label='şirket adı' mode={'outlined'} value={this.state.companyName} onChangeText={(i) => this.setState({companyName:i})} autoCapitalize='words' autoCorrect={false} style={styles.TextInput}/>
            <TextInput label='pozisyon' mode={'outlined'} value={this.state.jobTitle} onChangeText={(i) => this.setState({jobTitle:i})} autoCapitalize='words' autoCorrect={false} style={styles.TextInput}/>
            <TextInput label='başlangıç tarihi' mode={'outlined'} value={this.state.jobStartingDate} onChangeText={(i) => this.setState({jobStartingDate:i})} autoCapitalize='words' autoCorrect={false} style={styles.TextInput}/>
            <TextInput label='bitiş tarihi' mode={'outlined'} value={this.state.jobFinishingDate} onChangeText={(i) => this.setState({jobFinishingDate:i})} autoCapitalize='words' autoCorrect={false} style={styles.TextInput}/>
            <Button mode="contained" style={{marginHorizontal:40, marginVertical:20}} color={'#171717'} onPress={() => {
              this.saveToDB();
              this.props.navigation.navigate('JobOfferScreen')
              }}>
              KAYDET
            </Button>
          </View>
        ) : null;
        return (
            <View>
                { firstRow }
                { secondRow }
                { thirdRow }
            </View>
        );
    }

    render() {
        return (
          <SafeAreaView style={{flex: 1, backgroundColor:'#BBBBBB', }}>
            <View style={{ flex: 1, flexDirection:'row', justifyContent: 'center', }}>
                <Carousel
                  layout={"default"}
                  ref={ref => this.carousel = ref}
                  data={this.state.carouselItems}
                  contentContainerCustomStyle={{ alignItems: 'center' }}
                  sliderWidth={400}
                  itemWidth={350}
                  renderItem={this._renderItem}
                  onSnapToItem = { index => this.setState({activeIndex:index}) } />
            </View>
          </SafeAreaView>
        );
    }
}

const styles = StyleSheet.create({
    wrapper: {},
    slide1: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#F9F3EE'
    },
    slide2: {
      flex: 1,
      alignItems: 'center',
      backgroundColor: '#F9F3EE'
    },
    slide3: {
      flex: 1,
      alignItems: 'center',
      backgroundColor: '#F9F3EE'
    },
    text: {
      color: '#112B3C',
      fontSize: 20,
      fontWeight: 'bold',
      marginVertical:20,
      textAlign:'center'
    },
    TextInput:{
        marginHorizontal:20,
        marginVertical:10
    },
    picker:{
      inputAndroid: {
        color: "#171717",
        fontSize: 12,
        fontWeight: "bold",
        marginHorizontal:50,
        placeholderColor: '#ababa',
      },
      
    }
  })