import React from 'react';
import { NavigationContainer } from "@react-navigation/native";
import { StackHeaderProps, createStackNavigator } from "@react-navigation/stack";
import { LoginScreen } from '../screens/login';
import { SignupScreen } from '../screens/signup';
import { BackIcon, Logo } from '../../assets';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import  MyDrawer from './drawer';
import { useAppSelector } from '../redux/hooks';
import { selectUserLoggedIn } from '../redux/user';


const Stack = createStackNavigator();

function MyStack () {
    const isLoggedIn = useAppSelector(selectUserLoggedIn);
    const LoginStack = ()=>{
        return <Stack.Navigator>
            <Stack.Screen name='Login' component={LoginScreen} options={{headerShown:false}}/>
            <Stack.Screen name='Signup' component={SignupScreen} options={signupScreenOptions}/>
            <Stack.Screen name='BankApp' component={MyDrawer}/>
        </Stack.Navigator>
    }
    const AppStack = ()=>{
        return <Stack.Navigator  screenOptions={{headerShown: false}}>
            <Stack.Screen name='Home' component={MyDrawer}/>
        </Stack.Navigator>
    }
   
return <NavigationContainer>
    {isLoggedIn ? <AppStack/> : <LoginStack/>}
</NavigationContainer>
}

export default MyStack;

const signupScreenOptions ={
    header:  ({ navigation, route, options, back }:StackHeaderProps) => {      
        return (
          <View style={styles.headerStyle}>
            <TouchableOpacity onPress={()=>navigation.goBack()}>
                <BackIcon/>
            </TouchableOpacity>
            <Logo/>
          </View>
        
        );
      }
}

const styles = StyleSheet.create({
    headerStyle:{
        flexDirection:'row',
        justifyContent:'space-between',
        paddingHorizontal: 12,
        paddingTop:12
    }
})