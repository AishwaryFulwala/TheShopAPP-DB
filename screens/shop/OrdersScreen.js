import React, { useEffect, useState } from "react";
import { FlatList, ActivityIndicator, StyleSheet, View, Text } from 'react-native';

import { useSelector, useDispatch } from "react-redux";

import { HeaderButtons, Item } from "react-navigation-header-buttons";
import IconA from 'react-native-vector-icons/AntDesign';

import CustomHeaderButton from '../../components/UI/HeaderButton';
import OrderItem from "../../components/shop/OrderItem";
import * as OrderActions from '../../store/actions/order';
import Colors from "../../constants/Colors";

const OrdersScreen = (props) => {
    const [isLoad, setIsLoad] = useState(false);

    const orders = useSelector((state) => state.orders.orders)
    const dispatch = useDispatch();

    useEffect(() => {
        props.navigation.setOptions({
            title: 'Your Orders',
            headerLeft: () => {
                return (
                    <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
                        <Item
                            title='Menu'
                            iconName='menu-fold'
                            IconComponent={IconA}
                            onPress={() => {
                                props.navigation.toggleDrawer();
                            }}
                        />
                    </HeaderButtons>
                );
            },
        });
    }, []);

    useEffect(() => {
        setIsLoad(true);
        dispatch(OrderActions.setOrder()).then(() => {
            setIsLoad(false);
        });        
    }, [dispatch]);

    const renderItem = (data) => {
        return (
            <OrderItem 
                amount={data.item.totAmt}
                date={data.item.date}
                item={data.item.items}
            />
        );
    }

    if (isLoad) {
        return (
            <View style={styles.body}>
                <ActivityIndicator
                    color={Colors.primary}
                    size="large"
                />
            </View>
        );
    }

    if (orders.length === 0) {
        return (
            <View style={styles.body}>
                <Text>No Order Found!!..</Text>
            </View>
        );
    }

    return (
        <FlatList 
            data={orders}
            renderItem={renderItem}
        />
    );
};

const styles = StyleSheet.create({
    body: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default OrdersScreen;