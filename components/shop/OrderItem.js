import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

import Colors from '../../constants/Colors';
import CartItem from './CartItem';

const OrderItem = (props) => {
    const [ show, setShow ] = useState(false)

    return (
        <View style={styles.body}>
            <View style={styles.data}>
                <Text style={styles.total}>Rs. {props.amount.toFixed(2)}</Text>
                <Text style={styles.date}>{props.date}</Text>
            </View>
            <View style={styles.btnView}>
                <TouchableOpacity
                    style={styles.btn}
                    onPress={() => {
                        setShow(!show)
                    }}
                >
                    <Text style={styles.btnTxt}>{show ? 'Hide Details' : 'Show Details'}</Text>
                </TouchableOpacity>
            </View>
            {
                show && 
                <View style={styles.detail}>
                    {props.item.map(item => (
                        <CartItem
                            key={item.pid}
                            qty={item.qty}
                            amt={item.sum}
                            title={item.title}
                        />
                    ))}
                </View>
            }
        </View>
    );
};

const styles = StyleSheet.create({
    body: {       
        shadowColor: '#000000',
        shadowOpacity: 0.26,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 8,
        elevation: 5,
        borderRadius: 10,
        marginVertical: 10,
        marginHorizontal: 20,
        backgroundColor: '#ffffff',
        padding: 10,
        flex: 1,
    },
    data: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginHorizontal: 10,
        padding: 10,
    },
    total: {
        fontFamily: 'EBGaramond-Bold',
        fontSize: 18,
        color: '#000000',
    },
    date: {
        fontFamily: 'EBGaramond-MediumItalic',
        fontSize: 18,
        color: '#888888',
    },
    btnView: {
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
        margin: 5,
    },
    btn: {
        borderWidth: 1,
        borderRadius: 50,
        borderColor: Colors.primary,
        backgroundColor: Colors.primary,
        width: '60%',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10
    },
    btnTxt: {
        fontSize: 20,
        fontFamily: 'EBGaramond-Regular',
        paddingHorizontal: 10,
        textAlign: 'center',
        color: '#ffffff'
    },
    detail: {
        width: '100%',
    }
});

export default OrderItem;