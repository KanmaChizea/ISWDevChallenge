import {Platform, StyleSheet, TouchableOpacity} from 'react-native';
import React from 'react';
import {FingerprintIcon} from '../../../assets';
import {AppColors} from '../../styles';
import ReactNativeBiometrics, {BiometryTypes} from 'react-native-biometrics';
import Snackbar from 'react-native-snackbar';
import {useAppDispatch} from '../../redux/hooks';
import {login} from '../../redux/user';

const BiometricsButton = ({loginFunction}: {loginFunction: () => void}) => {
  const rnBiometrics = new ReactNativeBiometrics();
  const dispatch = useAppDispatch();

  const loginWithFingerprint = async () => {
    const {available, biometryType, error} =
      await rnBiometrics.isSensorAvailable();
    if (error) {
      Snackbar.show({
        text: error,
        duration: Snackbar.LENGTH_SHORT,
        backgroundColor: AppColors.error,
      });
    }
    if (
      available &&
      (biometryType === BiometryTypes.Biometrics ||
        biometryType === BiometryTypes.TouchID)
    ) {
      await rnBiometrics
        .simplePrompt({promptMessage: 'Biometric Login'})
        .then(result => {
          if (result.success) {
            loginFunction();
          }
        });
    }
  };
  return (
    <TouchableOpacity
      style={styles.container}
      activeOpacity={0.7}
      onPress={() => loginWithFingerprint()}>
      <FingerprintIcon />
    </TouchableOpacity>
  );
};

export default BiometricsButton;

const styles = StyleSheet.create({
  container: {
    backgroundColor: AppColors.grey300,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginLeft: 12,
    ...Platform.select({
      ios: {
        shadowColor: 'black',
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 0.25,
        shadowRadius: 4,
      },
      android: {
        elevation: 2,
      },
    }),
  },
});
