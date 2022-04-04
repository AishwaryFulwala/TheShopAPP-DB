import React from 'react';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import ReduxThunk from 'redux-thunk';

import ProductReducer from './store/reducers/products';
import OrderReducer from './store/reducers/order';
import CartReducer from './store/reducers/cart';
import AuthReducer from './store/reducers/Auth';

import ShopNavigator from './navigation/ShopNavigator';

const App = () => {
    const rootReducer = combineReducers({
        products: ProductReducer,
        cart: CartReducer,
        orders: OrderReducer,
        auth: AuthReducer
    });

    const store = createStore(rootReducer, applyMiddleware(ReduxThunk));

    return (
        <Provider store={store}>
            <ShopNavigator />
        </Provider>
    );
};

export default App;
