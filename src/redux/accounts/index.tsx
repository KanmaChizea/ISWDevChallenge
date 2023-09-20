import {createSlice} from '@reduxjs/toolkit';
import {RootState} from '../store';

export interface Account {
  accountNo: string;
  balance: number;
}

interface AccountState {
  accounts: Account[];
}

const initialState: AccountState = {
  accounts: [],
};
const accountsSlice = createSlice({
  name: 'account',
  initialState,
  reducers: {
    setAccounts: (state, action) => {
      state.accounts = action.payload.accounts.reverse();
    },
    addAccount: (state, action) => {
      state.accounts = [action.payload.account, ...state.accounts];
    },
  },
});

export const {setAccounts, addAccount} = accountsSlice.actions;

export const selectAccounts = (state: RootState) => state.accounts.accounts;

export default accountsSlice.reducer;
