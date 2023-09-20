import { ActivityIndicator, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { AddAccountIcon } from '../../../assets'
import { useAppDispatch, useAppSelector } from '../../redux/hooks'
import { InputField } from '../shared/input_field'
import { EmptyStringValidation, NumberValidation, ExactLengthValidation } from '../../services/validation'
import { API } from '../../repository/api'
import { selectUserId } from '../../redux/user'
import { getRandomInteger } from '../../services/utils'
import { addAccount } from '../../redux/accounts'
import Snackbar from 'react-native-snackbar'
import AppTextstyles from '../../styles/textstyles'
import ElevatedButton from '../shared/elevated_button'
import { AppColors } from '../../styles'

export const AddNewAccountButton = ({onPress}:{onPress:()=>void}) => {
  return (
    <View style={{flex:1, justifyContent:'center',}}>
    <TouchableOpacity onPress={onPress} style={styles.addButton}>
            <Text style={styles.icon}>+ <Text style={styles.buttonText}>Add new account </Text></Text>
    </TouchableOpacity>
    </View>
  )
}

export const AddNewAccount = ({closeModal}:{closeModal:()=>void}) => {
    const [accountNo, setAccountNo] = useState('');
    const [isLoading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState<string|undefined>()
    const [isSuccess, setIsSuccess]= useState(true)
    const dispatch = useAppDispatch();
    const userid = useAppSelector(selectUserId)
    
    const addAccountFunction = async ()=>{
        const errorMessage = EmptyStringValidation(accountNo) ?? NumberValidation({value: accountNo}) ?? ExactLengthValidation({value:accountNo, length:10});
        setErrorMessage(errorMessage)
        if(errorMessage === undefined){
            setLoading(true);
            const balance = getRandomInteger()
            const result = await API.addAccount({
                id: userid!,
                accountno: accountNo,
                balance: balance,
                newUser:false,
            });
            if(result.isSuccess){
            dispatch(addAccount({
                account:{
                    accountNo : result.data.accountNo,
                    balance: result.data.balance
                }
            }));
            setLoading(false);
            closeModal();
        }else{
                setLoading(false);
              setIsSuccess(false)
            }
          
        }
    }
  return (
    <View style={styles.centeredView}>
    { isSuccess ? <View style={styles.container}>
      <Text style={styles.headerText}>Add New Account</Text>
      <View style={styles.image}>
      <AddAccountIcon/>
      </View>
      <InputField
            value={accountNo}
            onChangeText={val=>setAccountNo(val)}
            label="Account number"
            keyboardType="numeric"
            errorMessage={errorMessage}/>
        <View style={styles.buttonContainer}>
        <ElevatedButton 
        child={isLoading ? <ActivityIndicator color='white'/> : undefined} 
        label='Save'
        size={100}
        onPressed={()=>addAccountFunction()}/>
        </View>
    </View> :
    <View style={{...styles.container,   alignItems:'center'}}>
        <TouchableOpacity style={styles.closeError} onPress={()=>closeModal()}>
            <Text style={{color:AppColors.error}}>Close</Text>
        </TouchableOpacity>
        <Text style={styles.errorText}>Error</Text>
        <Text style={styles.errorMessageText}>Something went wrong</Text>
        <ElevatedButton label='Try again' onPressed={()=>{
            setAccountNo('')
            setIsSuccess(true)}
            } size={100}/>
    </View>}
    </View>
  )
  }

const styles = StyleSheet.create({
    addButton:{
        borderWidth:1,
        borderRadius:5,
        padding:8,
        borderColor: AppColors.primary,
    },
    icon:{
        ...AppTextstyles.bodyLarge,
        color: AppColors.primary
    },
    buttonText:{
        ...AppTextstyles.bodySmall,
        color: AppColors.primary
    },
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        marginTop: 22,
      },
    container:{
        backgroundColor:'white',
        paddingHorizontal: 24,
        paddingVertical: 36,
        margin: 20,
        borderRadius: 5,
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
      
    },
    headerText:{
       paddingBottom: 8,
       textAlign:'center',
        ...AppTextstyles.h3
    },
    buttonContainer:{
        paddingTop: 48,
        alignItems:'center'
    },
    image:{
        alignSelf:'center',
        paddingBottom: 24,
    },
    closeError:{
        alignSelf:'flex-end',
        paddingBottom: 36,
    },
    errorText:{
        ...AppTextstyles.h4,
        paddingBottom: 8,
    },
    errorMessageText:{
        ...AppTextstyles.bodyLarge,
        paddingBottom: 50
    }
})