import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {StackHeaderProps, createStackNavigator} from '@react-navigation/stack';
import {LoginScreen} from '../containers/Login';
import {SignupScreen} from '../containers/Signup';
import {BackIcon, Logo} from '../../assets';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import MyDrawer from './drawer';
import {useAppSelector} from '../redux/hooks';
import {selectUserLoggedIn} from '../redux/user';
import Transfer from '../containers/Transfer';
import PayBills from '../containers/PayBills';
import BuyAirtime from '../containers/BuyAirtime';
import QRPayment from '../containers/QRPayment';
import Loans from '../containers/Loans';
import VirtualCards from '../containers/VirtualCards';
import Chat from '../containers/Chat';
import ChangePin from '../containers/ChangePin';
import ManageBeneficiaries from '../containers/ManageBeneficiaries';

const Stack = createStackNavigator();

function MyStack() {
  const isLoggedIn = useAppSelector(selectUserLoggedIn);
  const LoginStack = () => {
    return (
      <Stack.Navigator>
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Signup"
          component={SignupScreen}
          options={signupScreenOptions}
        />
      </Stack.Navigator>
    );
  };
  const AppStack = () => {
    return (
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={MyDrawer}
          options={{headerShown: false}}
        />
        <Stack.Screen name="Transfers" component={Transfer} />
        <Stack.Screen
          name="PayBills"
          component={PayBills}
          options={{headerTitle: 'Pay Bills'}}
        />
        <Stack.Screen
          name="BuyAirtime"
          component={BuyAirtime}
          options={{headerTitle: 'Buy Airtime'}}
        />
        <Stack.Screen
          name="QRPayment"
          component={QRPayment}
          options={{headerTitle: 'QR Payment'}}
        />
        <Stack.Screen name="Loans" component={Loans} />
        <Stack.Screen
          name="VirtualCards"
          component={VirtualCards}
          options={{headerTitle: 'Virtual Cards'}}
        />
        <Stack.Screen name="Chat" component={Chat} />
        <Stack.Screen
          name="ChangePin"
          component={ChangePin}
          options={{headerTitle: 'Change Pin'}}
        />
        <Stack.Screen
          name="ManageBeneficiaries"
          component={ManageBeneficiaries}
          options={{headerTitle: 'Manage Beneficiaries'}}
        />
      </Stack.Navigator>
    );
  };

  return (
    <NavigationContainer>
      {isLoggedIn ? <AppStack /> : <LoginStack />}
    </NavigationContainer>
  );
}

export default MyStack;

const signupScreenOptions = {
  header: ({navigation, route, options, back}: StackHeaderProps) => {
    return (
      <View style={styles.headerStyle}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <BackIcon />
        </TouchableOpacity>
        <Logo />
      </View>
    );
  },
};

const styles = StyleSheet.create({
  headerStyle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 12,
    paddingTop: 12,
  },
});
