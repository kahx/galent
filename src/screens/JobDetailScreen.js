import React, {useEffect, useState} from 'react';
import {View, StyleSheet, ScrollView} from 'react-native';
import {Header, Text, Divider, Image} from 'react-native-elements';
import {Button, Snackbar} from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome';
import axiosInstance from "../api/axiosInstance";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SafeAreaView } from 'react-native-safe-area-context';

const JobDetailScreen = ({navigation,route}) => {
    const {id} = route.params
    const [activeJob, setActiveJob] = useState(null);

    const [visible, setVisible] = useState(false);
    const onToggleSnackBar = () => setVisible(!visible);
    const onDismissSnackBar = () => setVisible(false);
    const [snackbarText, setSnackbarText] = useState('');

    const [buttonLoading, setButtonLoading] = useState(false);

    useEffect(() => {
        getJob()
      }, []);
    const getJob = async () => {
        const token = await AsyncStorage.getItem('token');
        const headers = {
          Authorization: 'kolonya ' + token
        };
        const params = {
            id
          };
        const response = await axiosInstance.get(
          "/jobs",
          {params, headers}
        );
        const data = JSON.parse(JSON.stringify(response.data))
        setActiveJob(data)
      };
      const sendApplication = async () => {
        setButtonLoading(true)
        const token = await AsyncStorage.getItem('token');
        const headers = {
          Authorization: 'kolonya ' + token
        };
        const response = await axiosInstance.get(
          "http://192.168.0.31:4000/",
          {headers}
        )
        if(response.data.success){
          setSnackbarText('Başvurunuz başarıyla iletildi.')
          onToggleSnackBar()
          setButtonLoading(false)
        }else{
          setSnackbarText('Başvurunuz iletilirken bir hatayla karşılaşıldı.')
          onToggleSnackBar()
          setButtonLoading(false)
        }
      };
    return( 
        <View style={{flex:1, justifyContent:'center'}}>
          <Snackbar
            duration={2000}
            visible={visible}
            onDismiss={onDismissSnackBar}>
            {snackbarText}
          </Snackbar>
          <Header rightComponent={<Icon
                name='user'
                style={{margin:6}}
                size={22}
                onPress={() => navigation.navigate('AccountScreen')}/>}
                backgroundColor='#AAAAAA'
                centerComponent={{ text: 'İlan Detayı', style: styles.heading }}
                />
  
          {activeJob != null ? 
            <ScrollView>
                <View style={{margin:20}}>
                <View style={{flexDirection:'row', justifyContent:'space-between', alignItems:'center'}}>
                    <View style={{flexDirection:'row'}}>
                        <Image style={{ width: 50, height: 50 }} source={{ uri: activeJob.companyLogo }}/>
                        <View style={{marginLeft:12}}>
                            <Text style={{fontSize:20}}>{activeJob.companyName}</Text>
                            <Text>{activeJob.companyCity}</Text>
                        </View>
                    </View>
                    <Button loading={buttonLoading} labelStyle={{color:'#fff'}} mode="contained" color={'#AAAAAA'} onPress={() => sendApplication()}>başvur</Button>
                </View>
                <Text style={{fontSize:20, textAlign:'center', marginTop:10, fontFamily:'Cairo-SemiBold', marginTop:25}}>{activeJob.jobTitle}</Text>
                <Divider style={{margin:20}}/>
                <Text style={{fontSize:16,fontFamily:'Cairo-Regular'}}>{activeJob.jobBody}</Text>
                </View>
            </ScrollView> : (<View></View>)}

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

export default JobDetailScreen;