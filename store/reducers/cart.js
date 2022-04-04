import { ADD_TO_CART, REMOVE_ITEM } from "../actions/cart";
import { ADD_ORDER } from '../actions/order';
import { DELETE_PRODUCT } from "../actions/products";
import CartItem from '../../models/cart-item';

const initState = {
    items: {},
    totalAmount: 0,
};

const CartReducer = (state = initState, action) => {
    switch (action.type) {
        case ADD_TO_CART:
            const addProduct = action.product;
            const id = addProduct.id;
            const prodPrice = addProduct.price;
            const prodTitle = addProduct.title;
           
            let newItem;
            if (state.items[addProduct.id]) {
                newItem = new CartItem(
                    id,
                    state.items[addProduct.id].qty + 1,
                    prodPrice,
                    prodTitle,
                    state.items[addProduct.id].sum + prodPrice
                );
            } else {
                newItem = new CartItem(id, 1, prodPrice, prodTitle,prodPrice)   
            }
            
            return {
                ...state,
                items: { ...state.items, [addProduct.id]: newItem },
                totalAmount: state.totalAmount + prodPrice,
            };

        case REMOVE_ITEM:
            const selectedItem = state.items[action.pid];
            const currQty = selectedItem.qty;
            let updateCart;

            if(currQty > 1) {
                updateItem = new CartItem(
                    selectedItem.id,
                    selectedItem.qty - 1,
                    selectedItem.price,
                    selectedItem.title,
                    selectedItem.sum - selectedItem.price,
                );
                
                updateCart = { ...state.items, [action.pid]: updateItem }
            } else {
                updateCart = { ...state.items };
                delete updateCart[action.pid];
            }

            return {
                ...state,
                items: updateCart,
                totalAmount: state.totalAmount - selectedItem.price,
            };
        
        case ADD_ORDER:
            return initState;

        case DELETE_PRODUCT:
            if (!state.items[action.pid]) {
                return state;
            }

            const updateItems = {...state.items};
            const itemsTotal = state.items[action.pid].sum
            delete updateItems[action.pid];

            return {
                ...state,
                items: updateItems,
                totalAmount: state.totalAmount - itemsTotal,
            }

        default:
            return state;
    }
};

export default CartReducer;