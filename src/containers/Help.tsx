import {Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import AppTextstyles from '../styles/textstyles';
import ElevatedButton from '../components/shared/elevated_button';
import {useAppSelector} from '../redux/hooks';
import {selectUsername} from '../redux/user';
import {useNavigation} from '@react-navigation/native';

const HelpScreen = () => {
  const user = useAppSelector(selectUsername);
  const navigator = useNavigation();
  return (
    <View style={styles.container}>
      <Text style={styles.headingText}>Help</Text>
      <View style={styles.bodyContainer}>
        <View style={styles.greetingContainer}>
          <Image
            source={require('../../assets/images/assistant.png')}
            style={styles.image}
          />
          <Text style={styles.greetingText}>{'Hello, ' + user}</Text>
          <Text style={styles.greetingSubtext}>How can we help you today?</Text>
          <ElevatedButton
            label="Let's chat"
            onPressed={() => navigator.navigate('Chat' as never)}
            size={120}
          />
        </View>
        <View style={{alignItems: 'center'}}>
          <Text style={AppTextstyles.h5}>Contact Us</Text>
          <Text style={styles.contactText}>
            Email: customersupport@bank.com
          </Text>
          <Text style={styles.contactText}>Website: https://www.bank.com</Text>
          <Text style={styles.contactText}>Whatsapp: +234 806 5400 045</Text>
        </View>
      </View>
    </View>
  );
};

export default HelpScreen;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    flex: 1,
    paddingBottom: 48,
  },
  bodyContainer: {
    flexDirection: 'column',
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headingText: {
    ...AppTextstyles.h3,
    paddingBottom: 30,
  },
  greetingContainer: {
    alignItems: 'center',
    paddingTop: 24,
    paddingBottom: 36,
  },
  greetingText: {
    ...AppTextstyles.h4,
    paddingBottom: 4,
  },
  greetingSubtext: {
    ...AppTextstyles.bodySmall,
    paddingBottom: 24,
  },
  contactText: {
    paddingTop: 8,
    ...AppTextstyles.bodyLarge,
  },
  image: {
    height: 160,
    objectFit: 'contain',
  },
});
