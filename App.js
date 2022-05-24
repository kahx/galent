import React from 'react';
import {NavigationContainer, useNavigationContainerRef} from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AccountScreen from './src/screens/AccountScreen';
import SigninScreen from './src/screens/SigninScreen';
import SignupScreen from './src/screens/SignupScreen';
import JobOfferScreen from './src/screens/JobOfferScreen';
import JobDetailScreen from './src/screens/JobDetailScreen';
import {Provider as AuthProvider} from './src/context/authContext';
import {setNavigator} from './src/navigationRef';
import LoadingScreen from './src/screens/LoadingScreen';
import ResumeScreen from './src/screens/ResumeScreen';

const Stack = createNativeStackNavigator();

function App() {
  const navigator = useNavigationContainerRef();
  
    return (
      <NavigationContainer ref={(navigator) => {setNavigator(navigator)}}>
        <Stack.Navigator>
            <Stack.Screen name="LoadingScreen" component={LoadingScreen} options={{ headerShown:false }}/>
            <Stack.Screen name="SignupScreen" component={SignupScreen} options={{ headerShown:false }}/>
            <Stack.Screen name="SigninScreen" component={SigninScreen} options={{ headerShown:false }}/>
            <Stack.Screen name="JobOfferScreen" component={JobOfferScreen} options={{ headerShown:false }}/>
            <Stack.Screen name="JobDetailScreen" component={JobDetailScreen} options={{ headerShown:false }}/>
            <Stack.Screen name="AccountScreen" component={AccountScreen} options={{ headerShown:false }}/>
            <Stack.Screen name="ResumeScreen" component={ResumeScreen} options={{ headerShown:false }}/>
        </Stack.Navigator>
      </NavigationContainer>
    );
  }

  export default () => {
    return(
      <AuthProvider>
        <App />
      </AuthProvider>
    );
  };
  