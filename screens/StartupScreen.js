import React, { useEffect } from "react";
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import AsyncStorage from "@react-native-async-storage/async-storage";

import { StackActions } from "@react-navigation/native";
import { useDispatch } from "react-redux";

import Colors from "../constants/Colors";
import * as AuthActions from '../store/actions/Auth';

const StratupScreen = (props) => {
    const dispatch = useDispatch();

    useEffect(() => {
        const tryLog = async () => {
            const userData = await AsyncStorage.getItem('@userData');

            if(!userData) {
                props.navigation.dispatch(
                    StackActions.replace('Auth')
                );
                return;
            }

            const jsonData = JSON.parse(userData);
            const { token, userId, exDate } = jsonData;

            if (new Date(exDate) <= new Date() || !token || !userId) {
                props.navigation.dispatch(
                    StackActions.replace('Auth')
                );
                return;
            }

            props?.navigation?.dispatch(
                StackActions.replace('Shop')
            );

            dispatch(AuthActions.authenticate(token, userId));
        };

        tryLog();
    }, [ dispatch ]);

    return (
        <View style={styles.body}>
            <ActivityIndicator
                size='large'
                color={Colors.primary}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    body: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default StratupScreen;