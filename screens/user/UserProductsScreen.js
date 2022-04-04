import React, { useEffect } from "react";
import { FlatList, Alert, View, Text, StyleSheet } from 'react-native';
import { useSelector, useDispatch } from "react-redux";
import { HeaderButtons, Item } from "react-navigation-header-buttons";

import IconA from 'react-native-vector-icons/AntDesign';
import IconF from 'react-native-vector-icons/Fontisto';

import ProductItem from '../../components/shop/ProductItem';
import CustomHeaderButton from '../../components/UI/HeaderButton';
import * as ProductActions from '../../store/actions/products';

const UserProductsScreen = (props) => {
    const userProducts = useSelector((state) => state.products.userProducts)
    const dispatch = useDispatch();

    const deleteHandler = (id) => { 
        Alert.alert('Are you sure?','Do you really want to delete this item?', [
            {text: 'No', style: 'default'},
            {
                text: 'Yes',
                style: 'destructive',
                onPress: () => {
                    dispatch(ProductActions.deleteProduct(id));
                }
            }
        ])
    };

    useEffect(() => {
        props.navigation.setOptions({
            title: 'Your Products',
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
            headerRight: () => {
                return (
                    <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
                        <Item
                            title='Cart'
                            iconName='plus-a'
                            IconComponent={IconF}
                            onPress={() => {
                                props.navigation.navigate('EditProduct')
                            }}
                        />
                    </HeaderButtons>
                );
            },
        });
    }, []); 

    const item = (data) => {
        return (
            <ProductItem
                image={data.item.imageUrl}
                title={data.item.title}
                price={data.item.price}
                onView={() => {
                    props.navigation.navigate('ProductsDetail', {
                        prodID: data.item.id,
                    });
                }}
                edit
                onEdit={() => {
                    props.navigation.navigate('EditProduct', {
                        prodID: data.item.id,
                    });
                }}
                onDel={deleteHandler.bind(this, data.item.id)}
            />
        );
    };
    if (userProducts.length === 0) {
        return (
            <View style={styles.body}>
                <Text>No Product Found!!..</Text>
            </View>
        );
    }

    return (
        <FlatList 
            data={userProducts}
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

export default UserProductsScreen