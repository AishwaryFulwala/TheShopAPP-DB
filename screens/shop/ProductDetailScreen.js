import React, { useEffect } from 'react';
import { ScrollView, View, Text, Image, Dimensions, StyleSheet, TouchableOpacity } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';

import *  as cartAction from '../../store/actions/cart';

const windowsHeight = Dimensions.get('screen').height;

const ProductDetailScreen = (props) => {
    const prodID = props.route.params.prodID;
    const selectProduct = useSelector((state) => state.products.availableProducts.find(prod => prod.id === prodID))

    const dispatch = useDispatch();

    useEffect(() =>{
        props.navigation.setOptions({
            title: selectProduct.title,
        })
    }, []);

    return (
        <View style={styles.body}>
            <Image style={styles.image} source={{ uri: selectProduct.imageUrl }} />
            <View style={styles.view}>
                <View style={styles.txtView}>
                    <Text style={styles.price}>Rs. {selectProduct.price.toFixed(2)}</Text>
                    <Text style={styles.description}>Description</Text>
                    <ScrollView>
                        <Text style={styles.desc}>{selectProduct.description}</Text>
                    </ScrollView> 
                </View>
                <View style={styles.btnView}>
                    <TouchableOpacity
                        onPress={() => {
                            dispatch(cartAction.addToCart(selectProduct))
                        }}
                        style={styles.btn}
                    >
                        <Text style={styles.btnTxt}>Add to Cart</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    body: {
        flex: 1,
    },
    image: {
        height: windowsHeight * 0.35,
        width: '100%',
    },
    view: {
        flex: 1,
        justifyContent: 'space-between',
        flexDirection: 'column',
        backgroundColor: '#ccb8bf'
    },
    txtView: {
        height: '80%',
        justifyContent: 'flex-start',
    },
    price: {
        fontSize: 30,
        color: '#888888',
        marginVertical: 10,
        marginTop: 10,
        color: '#6f6c73',
        fontFamily: 'EBGaramond-ExtraBold',
        paddingLeft: 10,
    },
    description: {
        fontSize: 22,
        paddingLeft: 10,
        fontFamily: 'EBGaramond-Regular',
        marginBottom: 10,
        color: '#FF0000',
    },
    desc: {
        fontSize: 18,
        color: '#000000',
        marginHorizontal: 15,
        fontFamily: 'EBGaramond-Regular',
        paddingLeft: 10,
        paddingVertical: 5
    },
    btnView: {
        height: '15%',
        width: '100%',
        paddingHorizontal: 30,
        justifyContent: 'center',
        marginTop: 5,
    },
    btn: {
        backgroundColor: '#f0b302',
        width: '100%',
        height: '70%',
        borderRadius: 50,
        justifyContent: 'center',
        marginBottom: 20
    },
    btnTxt: {
        color: '#000000',
        fontSize: 25,
        fontFamily: 'EBGaramond-Regular',
        paddingHorizontal: 10,
        textAlign: 'center'
    },
});

export default ProductDetailScreen;