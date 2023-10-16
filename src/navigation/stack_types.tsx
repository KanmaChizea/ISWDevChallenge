import {NativeStackNavigationProp} from '@react-navigation/native-stack';

export type RootStackParamList = {
  Login: undefined;
  Home: undefined;
  Signup: undefined;
  Transfers: undefined;
  PayBills: undefined;
  BuyAirtime: undefined;
  QRPayment: undefined;
  Loans: undefined;
  VirtualCards: undefined;
  Chat: undefined;
  ChangePin: undefined;
  ManageBeneficiaries: undefined;
};

export type LoginScreenNavigationProp = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Login'>;
};

export type BankAppScreenNavigationProp = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Home'>;
};
export type SignupScreenNavigationProp = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Signup'>;
};
