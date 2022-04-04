import React, { useEffect, useState } from 'react';
import { FlatList, View, Text, Dimensions, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';

import { useSelector, useDispatch } from 'react-redux';

import Colors from '../../constants/Colors';
import CartItem from '../../components/shop/CartItem';

import * as CartActions from '../../store/actions/cart'
import * as OrderActions from  '../../store/actions/order'

const windowHeight = Dimensions.get('window').height;

const CartScreen = (props) => {
    const [isLoad, setIsLoad] = useState(false);
    const total = useSelector(state => state.cart.totalAmount);

    const items = useSelector(state => {
        const transformedCartItem = [];

        for (const key in state.cart.items) {
            transformedCartItem.push({
                pid: state.cart.items[key].id,
                title: state.cart.items[key].title,
                price: state.cart.items[key].price,
                sum: state.cart.items[key].sum,
                qty: state.cart.items[key].qty,
            })
        }
        return transformedCartItem.sort((a, b) => a.pid > b.pid ? 1 : -1);
    });

    const dispatch = useDispatch();

    useEffect(() => {
        props.navigation.setOptions({
            title: "Cart",
        })
    }, []);
    
    const bgColor = items.length === 0 ? styles.btndisable : styles.btnenable;
    const txtColor = items.length === 0 ? '#787577' : '#ffffff';

    const orderHandler = () => {
        setIsLoad(true);
        dispatch(OrderActions.addOrder(items, total));
        setIsLoad(false);
    };

    const rnderItem = (data) => {
        return (
            <CartItem
                qty={data.item.qty}
                amt={data.item.sum}
                title={data.item.title}
                deletable
                onRemove={() => {
                    dispatch(CartActions.removeItem(data.item.pid));
                }}
            />
        );
    };

    return (
        <View style={styles.body}>
            <View style={styles.totView}>
                <Text style={styles.tot}>
                    Total: <Text style={styles.totrs}>Rs. {Math.round(total.toFixed(2) * 100 / 100 )}</Text>
                </Text>
                
                {
                    isLoad ? 
                        <ActivityIndicator
                            color={Colors.primary}
                            size="small"
                        />
                    :
                        <TouchableOpacity
                            onPress={orderHandler}
                            style={{ ...styles.btn, ...bgColor }}
                            disabled={items.length === 0}
                        >
                            <Text style={{ ...styles.btnTxt, color: txtColor }}>Buy Now</Text>
                        </TouchableOpacity>
                }
            </View>
            <View>
                <FlatList
                    data={items}
                    renderItem={rnderItem}
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    body: {
        flex: 1,
        margin: 10,
    },
    totView: {
        flexDirection: 'row',
        shadowColor: '#000000',
        shadowOpacity: 0.26,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 8,
        elevation: 5,
        borderRadius: 10,
        justifyContent: 'space-between',
        marginHorizontal: 10,
        backgroundColor: '#ffffff',
        height: windowHeight * 0.08,
        alignItems: 'center',
        padding: 10,
        margin: 10,
        marginBottom: 20
    },
    totrs: {
        fontSize: 20,
        fontFamily: 'EBGaramond-Regular',
        color: '#000000',
    },
    tot: {
        fontSize: 20,
        fontFamily: 'EBGaramond-Bold',
        color: '#000000',
    },
    btn: {
        borderWidth: 1,
        borderRadius: 50,
        width: '40%',
        height: '100%',
        justifyContent: 'center',
    },
    btnenable: {
        borderColor: Colors.primary,
        backgroundColor: Colors.primary,
    },
    btndisable: {
        borderColor: '#aba7a9',
        backgroundColor: '#ffffff',
    },
    btnTxt: {
        fontSize: 20,
        fontFamily: 'EBGaramond-Regular',
        paddingHorizontal: 10,
        textAlign: 'center'
    },
});

export default CartScreen;