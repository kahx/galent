import React, {useEffect, useState} from 'react';
import {View, StyleSheet, Text, ScrollView} from 'react-native';
import {Button, Header, ListItem, Avatar} from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import axiosInstance from "../api/axiosInstance";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SafeAreaView } from 'react-native-safe-area-context';

const JobOfferScreen = ({navigation}) => {
  const [jobList, setJobList] = useState([]);
    useEffect(() => {
        getJobs()
      }, []);
    const getJobs = async () => {
        const token = await AsyncStorage.getItem('token');
        const headers = {
          Authorization: 'kolonya ' + token
        };
        const response = await axiosInstance.get(
          "/jobs",
          { headers }
        );
        const data = JSON.parse(JSON.stringify(response.data))
        setJobList(data)
      };
    return( 
        <View>
          <Header rightComponent={<Icon
                name='user'
                style={{margin:6}}
                size={22}
                onPress={() => navigation.navigate('AccountScreen')}/>}
                backgroundColor='#AAAAAA'
                centerComponent={{ text: 'İlanlar', style: styles.heading }}
                />
          <ScrollView>
            {jobList.length > 0 ? 
            (jobList.map((l,i) => {
              return(
                <ListItem key={i} onPress={() => {navigation.navigate('JobDetailScreen', {id: l._id})}}>
                  <Avatar source={{uri: l.companyLogo}} />
                  <ListItem.Content>
                    <ListItem.Title>{l.jobTitle}</ListItem.Title>
                    <ListItem.Subtitle>{l.companyName} - {l.companyCity}</ListItem.Subtitle>
                  </ListItem.Content>
                </ListItem>
              )
            })) : (<View></View>)}
          </ScrollView>
      </View>
    )
}

const styles = StyleSheet.create({
  heading: {
    color: 'white',
    fontSize: 22,
    fontWeight: 'bold',
  },
});

export default JobOfferScreen;