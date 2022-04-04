import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import IconM from 'react-native-vector-icons/MaterialIcons';

const CartItem = (props) => {
    return (
        <View style={styles.body}>
            <View style={{ ...styles.data, ...styles.txtQty }}>
                <Text style={styles.txt}>{props.qty}</Text>    
            </View>
            <View style={{ ...styles.data, ...styles.txtTitle }}>
                <Text style={styles.txt} ellipsizeMode='tail' numberOfLines={1}>{props.title}</Text>
            </View>
            <View style={{ ...styles.data, ...styles.txtAmt }}>
                <Text style={styles.txt}>{props.amt.toFixed(2)}</Text>
            </View>
            {
                props.deletable &&
                <View style={{ ...styles.data, ...styles.txtCart }}>
                    <TouchableOpacity onPress={props.onRemove}>
                        <IconM name='remove-shopping-cart' size={25} color='red' />
                    </TouchableOpacity>
                </View>
            }
        </View>
    );
};

const styles = StyleSheet.create({
    body: {
        backgroundColor: '#ffffff',
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 10,
        marginHorizontal: 20,
        alignItems: 'center',
    },
    data: {
        flexDirection: 'row',
        paddingVertical: 5,
        paddingHorizontal: 3,
    },
    txtQty: {
        width: '10%',
        justifyContent: 'flex-end'
    },
    txtTitle: {
        width: '50%',
        justifyContent: 'flex-start'
    },
    txtAmt: {
        width: '24%',
        justifyContent: 'flex-end'
    },
    txtCart: {
        width: '15%',
        justifyContent: 'center'
    },
    txt: {
        fontFamily: 'EBGaramond-Bold',
        fontSize: 16,
        color: '#000000',
    },
});

export default CartItem;