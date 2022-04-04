import React, { useState, useEffect } from 'react';
import { FlatList, ActivityIndicator, View, StyleSheet, Text, Button, RefreshControl } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { HeaderButtons, Item } from "react-navigation-header-buttons";

import IconM from 'react-native-vector-icons/MaterialIcons';
import IconA from 'react-native-vector-icons/AntDesign';

import CustomHeaderButton from '../../components/UI/HeaderButton';
import ProductItem from '../../components/shop/ProductItem';
import Colors from '../../constants/Colors';
import *  as cartAction from '../../store/actions/cart';
import *  as productsAction from '../../store/actions/products';


const ProductsOverviewScreen = (props) => {
    const products = useSelector((state) => state.products.availableProducts);
    const dispatch = useDispatch();

    const [ isLoad, setIsLoad ] = useState(false);
    const [ isRef, setIsRef ] = useState(false);
    const [ isErr, setIsErr ] = useState();

    useEffect(() => {
        props.navigation.setOptions({
            title: 'All Products',
            headerRight: () => {
                return (
                    <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
                        <Item
                            title='Cart'
                            iconName='shopping-cart'
                            IconComponent={IconM}
                            onPress={() => {
                                props.navigation.navigate('Cart')
                            }}
                        />
                    </HeaderButtons>
                );                
            },
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

        props.navigation.addListener('focus', load);
    }, []);

    const load = async () => {
        setIsErr(null);
        setIsRef(true);

        try {
            await dispatch(productsAction.fetchProducts());
        } catch (error) {
            setIsErr(error.message);
        }

        setIsRef(false);
    }

    useEffect(() => {
        setIsLoad(true);
        load().then(() => {
            setIsLoad(false);
        });
    }, [dispatch ]);

    const item = (data) => {
        return (
            <ProductItem
                image={data.item.imageUrl}
                title={data.item.title}
                price={data.item.price}
                onView={() => {
                    props.navigation.navigate('ProductsDetail',{
                        prodID: data.item.id,
                    });
                }}
                cart
                onCart={() => {
                    dispatch(cartAction.addToCart(data.item))
                }}
            />
        );
    };

    if (isErr) {
        return (
            <View style={styles.body}>
                <Text>An Error Occured!!..</Text>
                <Button title='Try Again!' onPress={load} />
            </View>
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
    
    if (!isLoad && products.length === 0) {
        return (
            <View style={styles.body}>
                <Text>No Product Found!!..</Text>
            </View>
        );
    }

    return (
        <FlatList
            refreshControl={
                <RefreshControl
                    tintColor={Colors.primary}
                    colors={[Colors.primary]}
                    refreshing={isLoad}
                    onRefresh={load}
                />
            }
            refreshing={isLoad}
            data={products}
            renderItem={item}
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

export default ProductsOverviewScreen;