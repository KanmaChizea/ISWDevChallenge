import { StyleSheet, Switch, Text, View } from 'react-native'
import React, { useState } from 'react'
import ListTile from '../components/shared/list_tiile'
import AppTextstyles from '../styles/textstyles'
import { AppColors } from '../styles'
import { BiometricIcon, LockIcon, LogoutIcon, ManageIcon } from '../../assets'
import { useAppDispatch } from '../redux/hooks'
import { logout } from '../redux/user'
import { isEnabled } from 'react-native/Libraries/Performance/Systrace'

const SettingsScreen = () => {
  const [fingerprintEnabled, setFingerprintEnabled] = useState(true)
  const dispatch = useAppDispatch()
  return (
    <View style={styles.container}>
      <Text style={styles.headingText}>Settings</Text>
      <ListTile 
      leading={<LockIcon/>}
      title='Change Pin'
      onPress={()=>{}}/>
      <ListTile 
      leading={<BiometricIcon/>}
      title='Enable Fingerprint'
      trailing={ <Switch
        trackColor={{false: '#767577', true: AppColors.primary}}
        thumbColor={'#f4f3f4'}
        ios_backgroundColor="#3e3e3e"
        onValueChange={()=> setFingerprintEnabled(!fingerprintEnabled)}
        value={fingerprintEnabled}
      />}
      onPress={()=>{}}/>
      <ListTile 
      leading={<ManageIcon/>}
      title='Manage Beneficiaries'
      onPress={()=>{}}/>
      <ListTile 
      leading={<LogoutIcon stroke={AppColors.primary}/>}
      title='Logout' 
      titleStyle={styles.logoutText}
      onPress={()=>dispatch(logout())}/>
    </View>
  )
}

export default SettingsScreen

const styles = StyleSheet.create({
  container:{
    paddingHorizontal:16
  },
  headingText:{
    ...AppTextstyles.h3,
    paddingBottom: 30
  },
  logoutText:{
    color: AppColors.error
  }
})