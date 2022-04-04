import React, { useEffect, useReducer, useState,useRef } from "react";
import { StyleSheet, View, ScrollView, Text, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import { StackActions } from "@react-navigation/native";
import { useDispatch } from "react-redux";

import * as AuthActions from '../../store/actions/Auth'
import Input from '../../components/UI/input';
import Colors from "../../constants/Colors";
import AsyncStorage from "@react-native-async-storage/async-storage";

const formReducer = (state, action) => {
    if (action.type === 'UPDATE') {
        const updateValues = {
            ...state.inputValues,
            [action.input]: action.value
        };

        const updateValidities = {
            ...state.inputValidities,
            [action.input]: action.isValid,
        };

        let updateFormIsValid = true;
        for (const i in updateValidities) {
            updateFormIsValid = updateFormIsValid && updateValidities[i];
        }

        return {
            inputValues: updateValues,
            inputValidities: updateValidities,
            formIsValid: updateFormIsValid
        };
    }

    return state;
};

const AuthScreen = (props) => {
    const [formState, dispatchFormState] = useReducer(formReducer, {
        inputValues: {
           email: '',
           password: '',
        },
        inputValidities: {
            email: false,
            password: false,
        },
        formIsValid: false,
    });

    const [ isLog, setIsLog ] = useState(true);
    const [ isLoad, setIsLoad ] = useState(false);
    const dispatch = useDispatch();

    useEffect(() => {
        props.navigation.setOptions({
            title: isLog ? 'Sign In' : 'Sign Up',
            headerStyle: { 
                backgroundColor: '#ee9ca7',
                height: 150,
                shadowColor: 'transparent',
                elevation: 0,
            },
            headerTintColor: '#3b2f2f',
            headerTitleStyle: {
                fontFamily: 'EBGaramond-BoldItalic',
                fontSize: 40,
            },
            headerTitleAlign: 'center',
        })
    }, []);

    useEffect(() => {
        props.navigation.setOptions({
            title: isLog ? 'Sign In' : 'Sign Up',
        })
    }, [isLog]);

    const authHandler = async () => {
        setIsLoad(true);
        try {
            if (isLog) {
                await dispatch(
                    AuthActions.signin(
                        formState.inputValues.email,
                        formState.inputValues.password
                    )
                );

                props.navigation.dispatch(
                    StackActions.replace('Shop')
                );

                const userData = await AsyncStorage?.getItem('@userData') ?? '';
                
                if(userData) {
                    const jsonData = JSON.parse(userData);
                    const exTime = new Date(jsonData.exDate).getTime() - new Date().getTime();
                  
                    setTimeout(() => {
                        dispatch(AuthActions.logout());
                        props.navigation.replace('Auth');
                    }, exTime);
                }
            } else {
                await dispatch(
                    AuthActions.signup(
                        formState.inputValues.email,
                        formState.inputValues.password
                    )
                );

                setIsLog(!isLog);
            }            
        } catch (error) {
            Alert.alert('An error occurred!', error.message, [{ text: 'Okay' }]);
        }
        setIsLoad(false);
    };

    const inputHandler = (input, value, isValid) => {
        dispatchFormState({
            type: 'UPDATE',
            value: value,
            isValid,
            input,
        });
    };

    return (
        <LinearGradient colors={['#ee9ca7', '#ffdde1']} style={styles.liner}>
            <View style={styles.body}>
                <View style={styles.card}>
                    <ScrollView>
                        <Input
                            id='email'
                            label='Email'
                            keyboardType='email-address'
                            required
                            email
                            autoCapitalize='none'
                            error='Please enter valid Email Address.'
                            onInputChange={inputHandler}
                            initValue=''
                            initValid=''
                        />
                        <Input
                            id='password'
                            label='Password'
                            secureTextEntry
                            required
                            minLength={5}
                            autoCapitalize='none'
                            error='Please enter valid Password.'
                            onInputChange={inputHandler}
                            initValue=''
                            initValid=''
                        />
                        <View style={styles.btnView}>
                            {
                                isLoad ? 
                                    <ActivityIndicator
                                        color={Colors.primary}
                                        size="small"
                                    />
                                :
                                    <TouchableOpacity
                                        onPress={authHandler}
                                        style={styles.btn}
                                    >
                                        <Text style={styles.btnTxt}>{isLog ? 'Sign In' : 'Sign Up'}</Text>
                                    </TouchableOpacity>
                            }                            
                        </View>
                    </ScrollView>
                </View>

                <Text style={styles.txtAc}>
                    {isLog ? 'Do not have an Account?' : 'Already have an Account?'}
                    <Text style={styles.txtUp}
                        onPress={() => setIsLog(!isLog)}>
                        {!isLog ? ' Sign In' : ' Sign Up'}
                    </Text>
                </Text>
            </View>
        </LinearGradient>
    );
};

const styles = StyleSheet.create({
    liner: {
        flex: 1,
    },
    body: {
        justifyContent: 'center',
        alignContent: 'center',
        padding: 5,
        margin: 10,
        flex: 1
    },
    txtAc: {
        fontSize: 18,
        fontFamily: 'EBGaramond-Regular',
        textAlign: 'center',
        marginTop: 75,
        color: '#000000'   
    },
    txtUp: {
        fontSize: 20,
        fontFamily: 'EBGaramond-Italic',
        color: '#0000FF'        
    },
    card: {
        shadowColor: 'black',
        shadowOpacity: 0.26,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 8,
        elevation: 5,
        borderRadius: 10,
        backgroundColor: 'white',
        paddingHorizontal: 20,
        paddingTop: 10,
    },
    btnView: {
        height: '15%',
        width: '100%',
        paddingHorizontal: 30,
        justifyContent: 'center',
        marginTop: 100,
        marginBottom: 50,
    },
    btn: {
        backgroundColor: Colors.primary,
        width: '100%',
        height: '80%',
        borderRadius: 20,
        justifyContent: 'center',
    },
    btnTxt: {
        color: '#ffffff',
        fontSize: 25,
        fontFamily: 'EBGaramond-Regular',
        paddingHorizontal: 10,
        textAlign: 'center',
    },
});


export default AuthScreen;