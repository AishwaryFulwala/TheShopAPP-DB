import Order from "../../models/order";

export const ADD_ORDER = 'ADD_ORDER';
export const SET_ORDER = 'SET_ORDER';

export const setOrder = () => {
    return async (dispatch, getState) => {
        try {
            const response = await fetch(`https://theshopapp-3aa95-default-rtdb.firebaseio.com/orders/${getState().auth.userId}.json`);

            if (!response.ok) {
                throw new Error('Something went Wrong.');
            }

            const data = await response.json();
            const loadOrder = [];

            for (const i in data) { 
                loadOrder.push(new Order(i, data[i].items, data[i].amount, new Date(data[i].date)));
            }

            dispatch({
                type: SET_ORDER,
                orders: loadOrder,
            })
        } catch (error) {
            throw error;
        }
    };
}

export const addOrder = (cartItem, totAmt) => {
    return async (dispatch, getState) => {
        const date = new Date();

        const response = await fetch(`https://theshopapp-3aa95-default-rtdb.firebaseio.com/orders/${getState().auth.userId}.json?auth=${getState().auth.token}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                items: cartItem,
                amount: totAmt,
                date: date.toISOString(),
            }),
        });

        if (!response.ok) {
            throw new Error('Something went Wrong.');
        }

        const data = await response.json();

        dispatch({
            type: ADD_ORDER,
            data: {
                id: data.name,
                items: cartItem,
                amount: totAmt,
                date,
            }
        });
    };
};