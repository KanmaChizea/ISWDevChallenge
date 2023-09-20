import { ActivityIndicator, Keyboard, KeyboardAvoidingView, Platform, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, TouchableWithoutFeedback, View } from "react-native"
import { EyeIcon } from "../../assets"
import AppTextstyles from "../styles/textstyles"
import { InputField } from "../components/shared/input_field"
import { useState } from "react"
import ElevatedButton from "../components/shared/elevated_button"
import { EmptyStringValidation, ExactLengthValidation, NoSpecialCharactersValidation, NumberValidation } from "../services/validation"
import { areAllPropertiesUndefined, getRandomInteger } from "../services/utils"
import { API } from "../repository/api"
import { useAppDispatch } from "../redux/hooks"
import { login } from "../redux/user"
import AsyncStorage from "@react-native-async-storage/async-storage"
import Snackbar from "react-native-snackbar"
import { AppColors } from "../styles"
import { Account, setAccounts } from "../redux/accounts"

interface SignupErrorMessages{
    accountNo?:string;
    username?:string;
    fullname?:string;
    password?: string;
}
export const SignupScreen = ()=>{
    const [username, setUsername] = useState<string>('');
    const [fullname, setFullname] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [accountNo, setAccountNo] = useState<string>('');
    const [hidePassword, setHidePassword] = useState<boolean>(true);
    const [errorMessages, setErrorMessages]= useState<SignupErrorMessages>({});
    const [isLoading, setLoading] = useState(false);
    const dispatch = useAppDispatch();

    const validateFields = ()=>{
        const newEM= {
            accountNo: EmptyStringValidation(accountNo) ?? NumberValidation({value: accountNo}) ?? ExactLengthValidation({value:accountNo, length:10}),
            fullname: EmptyStringValidation(fullname),
            username:EmptyStringValidation(username) ?? NoSpecialCharactersValidation(username),
            password:EmptyStringValidation(password)
          }
      setErrorMessages(newEM); 
      return areAllPropertiesUndefined(newEM);
          
      ;

    }
    const signup = async ()=>{
        if(!isLoading){
        Keyboard.dismiss();    
        const isValidate = validateFields();    
        if(isValidate){
            setLoading(true);
          const user = await API.signup({fullname:fullname, username:username,password:password});
          if(user.data !== undefined){
            //add account
            const acctbalance = getRandomInteger();
              await API.addAccount({id:user.data.id, accountno:accountNo, balance: acctbalance, newUser:true})
            // store user name
             await AsyncStorage.setItem('user', JSON.stringify({
            username: user.data.username,
            fullname: user.data.fullname
          }),
          );
          //get account
          dispatch(setAccounts({accounts:[{accountNo: accountNo, balance:acctbalance}]}))
          dispatch(login(user.data));
        }
        if(user.errorMessage !== undefined){
            //show snackbar
            Snackbar.show({
                text:user.errorMessage,
                backgroundColor: AppColors.error
            });
        }
          setLoading(false);
        }
        }
    }

    return  <KeyboardAvoidingView
    behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    style={styles.container}> 
     <TouchableWithoutFeedback 
    style= {{flex: 1}}
        onPress={ () => Keyboard.dismiss() } 
        accessible={false}>
     <View style={styles.inner}>
        <Text style={styles.welcomeText}>Welcome to ABC Bank</Text>
        <InputField
            value={accountNo}
            onChangeText={val=>setAccountNo(val)}
            label="Account number"
            keyboardType="numeric"
            errorMessage={errorMessages.accountNo}/>
        <View style={{paddingTop:30}}>
        <InputField
            value={username}
            onChangeText={val=>setUsername(val)}
            label="Username"
            errorMessage={errorMessages.username}/>
        </View>
        <View style={{paddingTop:30}}>
        <InputField
            value={fullname}
            onChangeText={val=>setFullname(val)}
            label="Full name"
            errorMessage={errorMessages.fullname}/>
        </View>
        <View style={styles.passwordContainer}>
        <View style={styles.password}>
        <InputField
            value={password}
            onChangeText={val=>setPassword(val)}
            label="Password"
            secureTextEntry={hidePassword}
            errorMessage={errorMessages.password}/>
        </View>
        <TouchableOpacity
        style={styles.togglePasswordViewButton}
        onPress={()=>setHidePassword(!hidePassword)}
        >
            <EyeIcon/>
        </TouchableOpacity>
        </View>
        <View style={styles.buttonContainer}>
        <ElevatedButton child={isLoading ? <ActivityIndicator color='white'/> : undefined} label="Sign up" onPressed={()=>signup()}/>  
        </View>
        </View>
    </TouchableWithoutFeedback>
     </KeyboardAvoidingView>                     
}

const styles = StyleSheet.create({
    container:{
        flex:1,       
    },
    inner: {
        paddingHorizontal: 20,
        paddingTop: 24,
        paddingBottom: 36,
        flex: 1,
        justifyContent: 'space-around',
      },
    logo:{
        alignSelf: 'center',
        marginBottom: 50
    },
    welcomeText:{
        ...AppTextstyles.h1,
        paddingBottom: 24,
        textAlign: 'center'
    },
    passwordContainer:{
        paddingTop: 30,
        flexDirection: 'row',
        alignItems:'flex-end',
    },
    togglePasswordViewButton:{
        paddingLeft: 12,
        paddingBottom: 12,
    },
    password:{
        alignSelf:'stretch',
        flex:1,
    },
    buttonContainer:{
        paddingTop:30, 
        height:100, 
        justifyContent:'flex-end',
    },
    signUpText:{
        ...AppTextstyles.bodySmall,
        paddingBottom: 40,
        paddingTop:24,
        textAlign:'center',

    }
})