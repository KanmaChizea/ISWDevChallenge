import { ActivityIndicator, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { AddAccountIcon } from '../../../assets'
import { useAppDispatch, useAppSelector } from '../../redux/hooks'
import { InputField } from '../shared/input_field'
import { EmptyStringValidation, NumberValidation, ExactLengthValidation } from '../../services/validation'
import { API } from '../../repository/api'
import { selectUser } from '../../redux/user'
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
    const dispatch = useAppDispatch();
    const user = useAppSelector(selectUser)
    
    const addAccountFunction = async ()=>{
        const errorMessage = EmptyStringValidation(accountNo) ?? NumberValidation({value: accountNo}) ?? ExactLengthValidation({value:accountNo, length:10});
        setErrorMessage(errorMessage)
        if(errorMessage === undefined){
            setLoading(true);
            const result = await API.addAccount({
                id: user!.id,
                accountno: accountNo,
                balance: getRandomInteger(),
                newUser:false
            });
            if(result.isSuccess){
            dispatch(addAccount({
                account:{
                    accountNo : result.data.accountNo,
                    balance: result.data.balance
                }
            }));
            }else{
                Snackbar.show({
                    text:result.errorMessage!
                });
            }
            setLoading(false);
            closeModal();
        }
    }
  return (
    <View style={styles.centeredView}>
    <View style={styles.container}>
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
    </View>
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
    }
})