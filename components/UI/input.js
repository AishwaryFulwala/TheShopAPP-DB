import React, { useEffect, useReducer } from 'react';
import { View, Text, StyleSheet, TextInput } from 'react-native';

const inputReducer = (state, action) => {
    switch (action.type) {
        case 'INPUT_CHANGE':
            return {
                ...state,
                value: action.value,
                isValid: action.isValid,
            };
        
        case 'INPUT_BLUR':
            return {
                ...state,
                touched: true,
            };

        default:
            return state;
    }
};

const Input = props => {
    const [ inputState, dispatch ] = useReducer(inputReducer, {
        value: props.initValue ? props.initValue : '',
        isValid: props.initValid,
        touched: false,
    });
    
    const inputHandler = (txt) => {
        const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        let isValid = true;
        
        if (props.required && txt.trim().length === 0) 
            isValid = false;
        
        if (props.email && !emailRegex.test(txt.toLowerCase())) 
            isValid = false;
        
        if (props.min != null && +txt < props.min) 
            isValid = false;
        
        if (props.max != null && +txt > props.max) 
            isValid = false;
        
        if (props.minLength != null && txt.length < props.minLength) 
            isValid = false;
        
        dispatch({
            type: 'INPUT_CHANGE',
            value: txt,
            isValid,
        });
    }

    const lostHandler = () => {
        dispatch({
            type: 'INPUT_BLUR',
        });
    };

    useEffect(() => {
        props.onInputChange(props.id, inputState.value, inputState.isValid)
    }, [inputState]);

    return (
        <View style={styles.formControl}>
            <Text style={styles.label}>{props.label}</Text>
            <TextInput
                style={styles.input}
                value={inputState.value}
                onChangeText={inputHandler}
                onBlur={lostHandler}
                {...props}
            />
            { 
                !inputState.isValid && inputState.touched &&
                <Text style={styles.valid}>{props.error}</Text>
            }
        </View>
    );
};

const styles = StyleSheet.create({
    formControl: {
        width: '100%',
        padding: 10,
    },
    label: {
        fontFamily: 'EBGaramond-Bold',
        marginVertical: 8,
        fontSize: 18,
        color: '#000000'
    },
    input: {
        paddingHorizontal: 3,
        paddingVertical: 5,
        borderBottomColor: '#cccccc',
        borderBottomWidth: 1,
    },
    valid: {
        color: 'red',
        fontSize: 17,
        fontFamily: 'EBGaramond-Italic',
        padding: 10,
    },
});

export default Input;