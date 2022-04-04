import Product from '../../models/product'

export const DELETE_PRODUCT= 'DELETE_PRODUCT';
export const ADD_PRODUCT = 'ADD_PRODUCT';
export const UPDATE_PRODUCT = 'UPDATE_PRODUCT';
export const SET_PRODUCT = 'SET_PRODUCT';

export const fetchProducts = () => {
    return async (dispatch, getState) => {
        try {
            const response = await fetch('https://theshopapp-3aa95-default-rtdb.firebaseio.com/products.json');

            if(!response.ok) {
                throw new Error('Something went Wrong.');
            }

            const data = await response.json();
            const loadProduct = [];

            for (const i in data) {
                loadProduct.push(
                    new Product(
                        i,
                        data[i].ownerID,
                        data[i].title,
                        data[i].imageUrl,
                        data[i].description,
                        data[i].price
                    )
                )
            }

            dispatch({
                type: SET_PRODUCT,
                products: loadProduct,
                userProducts: loadProduct.filter((prod) => prod.ownerID === getState().auth.userId)
            })
        } catch (error) {
            throw error;
        }        
    };
};

export const deleteProduct = (pid) => {
    return async (dispatch, getState) => {
        const response = await fetch(`https://theshopapp-3aa95-default-rtdb.firebaseio.com/products/${pid}.json?auth=${getState().auth.token}`,
            {
                method: 'DELETE'
            }
        );

        if (!response.ok) {
            throw new Error('Something went Wrong.');
        }

        dispatch({ 
            type: DELETE_PRODUCT, 
            pid
        });
    };
};

export const addProduct = (title, description, price, imageUrl) => {
    return async (dispatch, getState) => {
        const response = await fetch(`https://theshopapp-3aa95-default-rtdb.firebaseio.com/products.json?auth=${getState().auth.token}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                title,
                description,
                price,
                imageUrl,
                ownerID: getState().auth.userId,
            }),
        });

        if (!response.ok) {
            throw new Error('Something went Wrong.');
        }

        const data = await response.json();
 
        dispatch({
            type: ADD_PRODUCT,
            data: {
                id: data.name,
                title,
                description,
                price,
                imageUrl,
                ownerID: getState().auth.userId,
            }
        });
    };
};

export const updateProduct = (pid, title, description, imageUrl) => {
    return async (dispatch, getState) => {
        const response = await fetch(`https://theshopapp-3aa95-default-rtdb.firebaseio.com/products/${pid}.json?auth=${getState().auth.token}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                title,
                description,
                imageUrl,
            }),
        });

        if (!response.ok) {
            throw new Error('Something went Wrong.');
        }

        dispatch({
            type: UPDATE_PRODUCT,
            pid,
            data: {
                title,
                description,
                imageUrl,
            }
        });
    };
};