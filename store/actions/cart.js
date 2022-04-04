export const ADD_TO_CART = 'ADD_TO_CART';
export const REMOVE_ITEM = 'REMOVE_ITEM'

export const addToCart = (prod) => {
    return {
        type: ADD_TO_CART,
        product: prod,
    }
};

export const removeItem = (id) => {
    return {
        type: REMOVE_ITEM,
        pid: id,
    }
};