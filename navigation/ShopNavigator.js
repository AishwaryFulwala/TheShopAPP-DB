import React from "react";
import { View, Text, TouchableOpacity } from 'react-native'
import { useDispatch } from "react-redux";

import { createStackNavigator,  } from "@react-navigation/stack";
import { NavigationContainer, StackActions } from "@react-navigation/native";
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList, DrawerItem } from "@react-navigation/drawer";

import IconMC from 'react-native-vector-icons/MaterialCommunityIcons';
import IconS from 'react-native-vector-icons/SimpleLineIcons';
import IconF from 'react-native-vector-icons/Fontisto';

import ProductsOverviewScreen from "../screens/shop/ProductsOverviewScreen";
import ProductDetailScreen from "../screens/shop/ProductDetailScreen";
import UserProductsScreen from "../screens/user/UserProductsScreen";
import EditProductScreen from "../screens/user/EditProductScreen";
import OrdersScreen from "../screens/shop/OrdersScreen";
import StartupScreen from "../screens/StartupScreen";
import CartScreen from "../screens/shop/CartScreen";
import AuthScreen from "../screens/user/AuthScreen";

import Colors from "../constants/Colors";
import * as AuthActions from '../store/actions/Auth';

const option = {
    headerStyle: {
        backgroundColor: Colors.primary
    },
    headerTitleStyle: {
        fontFamily: 'EBGaramond-MediumItalic',
        fontSize: 25
    },
    headerTintColor: '#ffffff',
    headerBackTitle: ' ',
};

const productsStack = createStackNavigator();
const ProductsNavigator = () => {
    return (
        <productsStack.Navigator>
            <productsStack.Screen
                name="ProductsOverview"
                component={ProductsOverviewScreen}
                options={option}
            />
            <productsStack.Screen 
                name="ProductsDetail" 
                component={ProductDetailScreen}
                options={option} 
            />
            <productsStack.Screen 
                name="Cart"
                component={CartScreen}
                options={option}
            />
        </productsStack.Navigator>
    );
};

const OrdersStack = createStackNavigator();
const OrdersNavigator = () => {
    return (
        <OrdersStack.Navigator>
            <OrdersStack.Screen
                name="Order"
                component={OrdersScreen}
                options={option}
            />
        </OrdersStack.Navigator>
    );
};

const AdminStack = createStackNavigator();
const AdminNavigator = () => {
    return (
        <AdminStack.Navigator>
            <AdminStack.Screen
                name="UserProduct"
                component={UserProductsScreen}
                options={option}
            />
            <AdminStack.Screen
                name="EditProduct"
                component={EditProductScreen}
                options={option}
            />
            <AdminStack.Screen
                name="ProductsDetail"
                component={ProductDetailScreen}
                options={option}
            />
        </AdminStack.Navigator>
    );
};

const customComponent = (props) => {
    const dispatch = useDispatch();

    return (
        <View style={{ flex: 1 }}>
            <DrawerContentScrollView {...props}>
                <DrawerItemList {...props} />
                <TouchableOpacity 
                    style={{ flexDirection: 'row', marginVertical: 10, }}
                    onPress={() => {
                        dispatch(AuthActions.logout());
                        props.navigation.dispatch(
                            StackActions.replace('Auth')
                        );               
                    }}
                >
                    <IconS
                        name="logout"
                        size={22}
                        color='#696969'
                        style={{ paddingHorizontal: 15 }}
                        
                    />
                    <Text style={{ color: '#696969', paddingLeft: 20, fontSize: 18, fontFamily: 'EBGaramond-SemiBold' }}>Logout</Text>
                </TouchableOpacity>
            </DrawerContentScrollView>
        </View>
    );
};

const Shopdrawer = createDrawerNavigator();
const ShopNavigator = () => {
    return (
        <Shopdrawer.Navigator
            screenOptions={{
                drawerActiveTintColor: '#440e59',
                drawerInactiveTintColor: '#696969',
                drawerLabelStyle: {
                    fontFamily: 'EBGaramond-SemiBold',
                    fontSize: 18,
                    marginVertical: 10,
                },
                drawerStyle: {
                    backgroundColor: '#f5dfe7',
                },
                headerShown: false,
            }}
            drawerContent={customComponent}
        >
            <Shopdrawer.Screen
                name="Product"
                component={ProductsNavigator}
                options={{
                    drawerIcon: ({ color }) => {
                        return (
                            <IconMC name="basket-check" size={25} color={color} />
                        );
                    }
                }}
            />
            <Shopdrawer.Screen
                name="Orders"
                component={OrdersNavigator}
                options={{
                    drawerIcon: ({ color }) => {
                        return (
                            <IconF name="shopping-bag-1" size={25} color={color} />
                        );
                    },
                }}
            />
            <Shopdrawer.Screen
                name="Admin"
                component={AdminNavigator}
                options={{
                    drawerIcon: ({ color }) => {
                        return (
                            <IconF name="user-secret" size={25} color={color} />
                        );
                    },
                }}
            />
        </Shopdrawer.Navigator>
    );
};

const AuthStack = createStackNavigator();
const AuthNavigator = () => {
    return (
        <AuthStack.Navigator>
            <AuthStack.Screen
                name="Auths"
                component={AuthScreen}
                options={option}
            />
        </AuthStack.Navigator>
    );
};

const MainStack = createStackNavigator();
const MainNavigator = () => {
    return(
        <NavigationContainer>
            <MainStack.Navigator
                screenOptions={{
                    headerShown: false
                }}
            >
                <MainStack.Screen
                    name="Startup"
                    component={StartupScreen}
                    options={option}
                />
                <MainStack.Screen
                    name="Auth"
                    component={AuthNavigator}
                    options={option}
                />
                <MainStack.Screen
                    name="Shop"
                    component={ShopNavigator}
                    options={option}
                />
            </MainStack.Navigator>
        </NavigationContainer>
    );
};

export default MainNavigator;