import { ADD_ORDER, SET_ORDER } from "../actions/order";
import Order from "../../models/order";

const initState = {
    orders: [],
};

const OrderReducer = (state = initState, action) => {
    switch (action.type) {
        case ADD_ORDER:
            const newOrder = new Order(
                action.data.id,
                action.data.items,
                action.data.amount,
                action.data.date,
            );   

            return {
                ...state,
                orders: state.orders.concat(newOrder)
            };

        case SET_ORDER:
            return {
                orders: action.orders
            }
    
        default:
            return state;
    }
};

export default OrderReducer;