import createDataContext from "./createDataContext";
import axiosInstance from "../api/axiosInstance";
import AsyncStorage from '@react-native-async-storage/async-storage';
import {navigate} from '../navigationRef';

const authReducer = (state, action) => {
    switch(action.type){
        case 'add_error':
            return {...state, errorMessage: action.payload};
        case 'signin':
            return {errorMessage: '', token: action.payload};
        case 'clear_error_message':
            return {...state, errorMessage: ''};
        case 'signout':
            return {token : null, errorMessage: ''};
        default:
            return state;
    }
};

//action functions

const tryLocalSignin = dispatch => async () => {
    const token = await AsyncStorage.getItem('token');
    if(token){
        dispatch({type: 'signin', payload: token});
        navigate('JobOfferScreen');
    }else{
        navigate('SignupScreen');
    }
}

const clearErrorMessage = dispatch => () => {
    dispatch({type: 'clear_error_message'});
}

const signup = (dispatch) => async ({email, password, name, surname}) => {
    try {
        const response = await axiosInstance.post('/signup', {email, password, name, surname});
        await AsyncStorage.setItem('token', response.data.token);
        dispatch({type: 'signin', payload: response.data.token})
        navigate('ResumeScreen');
    } catch (err) {
        dispatch({type: 'add_error', payload: 'Something went wrong with sign up'})
    }
};

const signin = dispatch => async ({email, password}) => {
    try {
        const response = await axiosInstance.post('/signin', {email, password});
        await AsyncStorage.setItem('token', response.data.token);
        dispatch({type: 'signin', payload: response.data.token});
        navigate('JobOfferScreen');
    } catch (err) {
        dispatch({
            type: 'add_error', payload: 'Something went wrong with sign in'});
    }
};

const signout = dispatch => async () => {
    await AsyncStorage.removeItem('token');
    dispatch({type: 'signout'});
    navigate('SigninScreen');
};

export const {Provider, Context} = createDataContext(
    authReducer,
    {signup, signin, signout, clearErrorMessage, tryLocalSignin},
    {token: null, errorMessage: ''}
);