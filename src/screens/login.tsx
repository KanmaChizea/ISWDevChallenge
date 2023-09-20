import {
  ActivityIndicator,
  Keyboard,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import {EyeIcon, Logo} from '../../assets';
import AppTextstyles from '../styles/textstyles';
import {InputField} from '../components/shared/input_field';
import {useEffect, useState} from 'react';
import {AppColors} from '../styles';
import BiometricsButton from '../components/login/biometrics_button';
import ElevatedButton from '../components/shared/elevated_button';
import {LoginScreenNavigationProp} from '../navigation/stack_types';
import {useAppDispatch} from '../redux/hooks';
import {login} from '../redux/user';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {EmptyStringValidation} from '../services/validation';
import {areAllPropertiesUndefined} from '../services/utils';
import {API} from '../repository/api';
import Snackbar from 'react-native-snackbar';
import {setAccounts} from '../redux/accounts';

interface LoginErrorMessages {
  username?: string;
  password?: string;
}

export const LoginScreen = ({navigation}: LoginScreenNavigationProp) => {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [fullname, setFullname] = useState<string>('');
  const [hidePassword, setHidePassword] = useState<boolean>(true);
  const [errorMessages, setErrorMessages] = useState<LoginErrorMessages>({});
  const [isLoading, setLoading] = useState(false);
  const dispatch = useAppDispatch();

  const validateFields = (isBiometrics: boolean) => {
    const newErrorMessages = {
      username: EmptyStringValidation(username),
      password: isBiometrics ? undefined : EmptyStringValidation(password),
    };
    setErrorMessages(newErrorMessages);
    return areAllPropertiesUndefined(newErrorMessages);
  };
  const loginFunction = async (isBiometrics: boolean) => {
    const isValidate = validateFields(isBiometrics);
    if (isValidate) {
      setLoading(true);
      const result = await API.login({
        username: username,
        password: password,
        isBiometrics: isBiometrics,
      });
      if (result.data !== undefined) {
        await AsyncStorage.setItem(
          'user',
          JSON.stringify({
            username: result.data.username,
            fullname: result.data.fullname,
          }),
        );
        console.log(result.data.id);

        const accounts = await API.getAccounts(result.data.id);
        if (accounts.isSuccess) {
          dispatch(setAccounts({accounts: accounts.data}));
        }
        dispatch(login(result.data));
      }
      if (result.errorMessage !== undefined) {
        Snackbar.show({
          text: result.errorMessage,
          backgroundColor: AppColors.error,
        });
      }
      setLoading(false);
    }
  };

  const checkForUserInDB = async () => {
    const result = await AsyncStorage.getItem('user');
    if (result !== null) {
      const user = JSON.parse(result);
      setUsername(user.username);
      setFullname(user.fullname);
    }
  };

  useEffect(() => {
    checkForUserInDB();
  }, []);
  return (
    <TouchableWithoutFeedback
      style={{flex: 1}}
      onPress={() => Keyboard.dismiss()}
      accessible={false}>
      <SafeAreaView style={styles.container}>
        <View>
          <Logo style={styles.logo} width={120} height={120} />
          <Text style={styles.welcomeText}>{'Welcome ' + fullname}</Text>
          <InputField
            value={username}
            onChangeText={val => setUsername(val)}
            label="Username"
            errorMessage={errorMessages.username}
          />
          <View style={styles.passwordContainer}>
            <View style={styles.password}>
              <InputField
                value={password}
                onChangeText={val => setPassword(val)}
                label="Password"
                secureTextEntry={hidePassword}
                errorMessage={errorMessages.password}
              />
            </View>
            <TouchableOpacity
              style={styles.togglePasswordViewButton}
              onPress={() => setHidePassword(!hidePassword)}>
              <EyeIcon />
            </TouchableOpacity>
          </View>
        </View>
        <View>
          <View style={styles.buttonContainer}>
            <View style={styles.password}>
              <ElevatedButton
                child={
                  isLoading ? <ActivityIndicator color="white" /> : undefined
                }
                label="Login"
                onPressed={() => loginFunction(false)}
              />
            </View>
            <BiometricsButton loginFunction={() => loginFunction(true)} />
          </View>
          <Text style={styles.signUpText}>
            {' '}
            New to mobile banking?
            <TouchableWithoutFeedback onPress={() => navigation.push('Signup')}>
              <Text style={{color: AppColors.secondary}}> Sign up here</Text>
            </TouchableWithoutFeedback>
          </Text>
        </View>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 24,
    paddingBottom: 36,
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  logo: {
    alignSelf: 'center',
    marginBottom: 50,
  },
  welcomeText: {
    ...AppTextstyles.h1,
    paddingBottom: 48,
  },
  passwordContainer: {
    paddingTop: 30,
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  togglePasswordViewButton: {
    paddingLeft: 12,
    paddingBottom: 12,
  },
  password: {
    alignSelf: 'stretch',
    flex: 1,
  },
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  signUpText: {
    ...AppTextstyles.bodySmall,
    paddingBottom: 40,
    paddingTop: 24,
    textAlign: 'center',
  },
});
