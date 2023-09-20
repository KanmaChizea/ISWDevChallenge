import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {AppColors} from '../../styles';
import AppTextstyles from '../../styles/textstyles';
import {Account} from '../../redux/accounts';

const AccountCard = ({account}: {account: Account}) => {
  return (
    <View style={styles.container}>
      <View style={styles.infoRow}>
        <Text style={styles.infoHeader}>Account:</Text>
        <Text style={AppTextstyles.bodyLargeBold}>{account.accountNo}</Text>
      </View>
      <View style={styles.infoRow}>
        <Text style={styles.infoHeader}>Balance:</Text>
        <Text style={AppTextstyles.bodyLargeBold}>
          {account.balance?.toLocaleString('en-NG', {
            style: 'currency',
            currency: 'NGN',
            minimumFractionDigits: 2,
          })}
        </Text>
      </View>
    </View>
  );
};

export default AccountCard;

const styles = StyleSheet.create({
  container: {
    width: 250,
    height: 100,
    backgroundColor: AppColors.grey200,
    borderColor: AppColors.grey100,
    borderWidth: 1,
    marginRight: 24,
    borderRadius: 5,
    padding: 12,
    shadowColor: '#000000',
    shadowOffset: {width: 0, height: 5},
    shadowOpacity: 0.25,
    shadowRadius: 5,
    elevation: 5,
    justifyContent: 'center',
  },
  infoRow: {
    flexDirection: 'row',
    alignContent: 'center',
  },
  infoHeader: {
    ...AppTextstyles.bodyLarge,
    width: 80,
  },
});
