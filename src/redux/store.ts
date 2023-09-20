import {configureStore} from '@reduxjs/toolkit';
import userReducer from '../redux/user/index';
import accountReducer from '../redux/accounts/index';

export const store = configureStore({
  reducer: {
    user: userReducer,
    accounts: accountReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
