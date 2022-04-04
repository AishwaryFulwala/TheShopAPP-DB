import React from 'react';
import { StyleSheet, Text, View, Image, TouchableNativeFeedback, TouchableOpacity, Platform, Dimensions } from 'react-native';

import IconM from 'react-native-vector-icons/MaterialIcons';
import IconMC from 'react-native-vector-icons/MaterialCommunityIcons';

import Colors from '../../constants/Colors';

const windowHeight = Dimensions.get('window').height;

const ProductItem = (props) => {
    let Touch = TouchableOpacity;

    if(Platform.OS === 'android')
        Touch = TouchableNativeFeedback;

    return (
        <View style={styles.product}>
            <View style={styles.touch}>
                <Touch onPress={props.onView} useForeground>
                    <View>
                        <View style={styles.imageView}>
                            <Image style={styles.image} source={{uri: props.image}} />
                        </View>
                        <View style={styles.txtView}>
                            <Text style={styles.title} ellipsizeMode='tail'>{props.title}</Text>
                        </View>
                        <View style={styles.btnView}>
                            <Text style={styles.price}>Rs. {props.price.toFixed(2)}</Text>
                            {
                                props.cart &&
                                <TouchableOpacity style={styles.icon} onPress={props.onCart}>
                                    <IconM name='add-shopping-cart' size={25} color={Colors.primary} />
                                </TouchableOpacity>
                            }
                            {
                                props.edit && 
                                <View style={styles.btnEdit}>
                                        <TouchableOpacity style={styles.icon} onPress={props.onEdit}>
                                            <IconMC name='square-edit-outline' size={25} color={Colors.primary} />
                                        </TouchableOpacity>
                                        <TouchableOpacity style={styles.icon} onPress={props.onDel}>
                                            <IconMC name='delete-empty-outline' size={25} color={Colors.primary} />
                                        </TouchableOpacity>
                                </View>
                            }                         
                        </View>
                    </View>
                </Touch>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    product: {
        shadowColor: '#000000',
        shadowOpacity: 0.26,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 8,
        elevation: 5,
        borderRadius: 10,
        backgroundColor: '#eeebf2',
        height: windowHeight/4,
        marginVertical: 10,
        marginHorizontal: 20,
        overflow: 'hidden',
    },
    touch: {
        borderRadius: 10,
        overflow: 'hidden',
    },
    imageView: {
        height: '70%',
        width: '100%',
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        overflow: 'hidden'
    },
    image: {
        height: '100%',
        width: '100%',
    },
    txtView: {
        alignItems:'flex-start',
        height: '14%',
        paddingHorizontal: 10,
    },
    title: {
        fontSize: 20,
        color: '#422832',
        fontFamily: 'EBGaramond-Bold',
    },
    price: {
        fontSize: 16,
        color: '#6f6c73',
        fontFamily: 'EBGaramond-SemiBoldItalic',
    },
    btnView: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: '16%',
        paddingHorizontal: 5,
        marginHorizontal: 5,
        paddingBottom: 6,
    },
    btnText: {
        fontSize: 16,
        color: Colors.primary,
        fontFamily: 'EBGaramond-Regular',
        marginHorizontal: 5,

    },
    icon: {
        marginHorizontal: 5,
    },
    btnEdit: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
});

export default ProductItem;