import AsyncStorage from "@react-native-async-storage/async-storage";

export const AUTHENTICATE = 'AUTHENTICATE';
export const LOGOUT = 'LOGOUT';

const saveDataToStorage = (token, userId, exDate) => {
    AsyncStorage.setItem('@userData', JSON.stringify({
        token,
        userId,
        exDate,
    }));
};

export const authenticate = (token, userId) => {
    return (dispatch) => {
        dispatch({
            type: AUTHENTICATE,
            token,
            userId,
        });
    };
};

export const signup = (email, password) => {
    return async (dispatch) => {
        const response = await fetch('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBgCLBfbrKPZUzS7YttfmTY2hhSlYsvjTo',
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email: email,
                    password: password,
                    returnSecureToken: true,
                })
            }
        );

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.error.message);
        }

        const exDate = new Date(new Date().getTime() + parseInt(data.expiresIn) * 1000).toISOString();
        saveDataToStorage(data.idToken, data.localId, exDate);

        dispatch(authenticate(data.idToken, data.localId));
    };
};

export const signin = (email, password) => {
    return async (dispatch) => {
        const response = await fetch('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBgCLBfbrKPZUzS7YttfmTY2hhSlYsvjTo',
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email: email,
                    password: password,
                    returnSecureToken: true,
                })
            }
        );

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.error.message);
        }

        const exDate = new Date(new Date().getTime() + parseInt(data.expiresIn) * 1000).toISOString();
        saveDataToStorage(data.idToken, data.localId, exDate);

        dispatch(authenticate(data.idToken, data.localId));
    };
};

export const logout = () => {
    AsyncStorage.removeItem('@userData');
    return {
        type: LOGOUT,
    }    
};