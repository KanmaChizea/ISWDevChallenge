import {createSlice} from '@reduxjs/toolkit';
import {RootState} from '../store';

export interface User {
  id: string;
  name: string;
}

interface UserState {
  user?: User;
  error?: string;
  loading: boolean;
  loggedIn: boolean;
}

export const initialState: UserState = {
  error: undefined,
  loading: false,
  loggedIn: false,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    login: (state, action) => {
      state.user = {
        id: action.payload.id,
        name: action.payload.fullname,
      };
      state.loggedIn = true;
    },
    logout: state => {
      state.loggedIn = false;
    },
  },
});

export const {login, logout} = userSlice.actions;

export const selectUserId = (state: RootState) => state.user.user?.id;
export const selectUsername = (state: RootState) => state.user.user?.name;
export const selectUserLoading = (state: RootState) => state.user.loading;
export const selectUserError = (state: RootState) => state.user.error;
export const selectUserLoggedIn = (state: RootState) => state.user.loggedIn;

export default userSlice.reducer;
