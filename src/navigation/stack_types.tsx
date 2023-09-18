import { NativeStackNavigationProp } from "@react-navigation/native-stack";


export type RootStackParamList = {
  Login: undefined;
  BankApp: undefined;
  Signup: undefined;
};

export type LoginScreenNavigationProp = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Login'>;
};

export type BankAppScreenNavigationProp = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'BankApp'>;
}
export type SignupScreenNavigationProp = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Signup'>;
};