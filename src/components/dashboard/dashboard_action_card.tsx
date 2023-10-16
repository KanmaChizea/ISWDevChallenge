import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {DashboardAction} from '../../constants/actions';
import AppTextstyles from '../../styles/textstyles';
import {useNavigation} from '@react-navigation/native';
import {BankAppScreenNavigationProp} from '../../navigation/stack_types';

export const DashboardActionCard = ({
  action,
  onPress,
}: {
  action: DashboardAction;
  onPress: () => void;
}) => {
  return (
    <TouchableOpacity activeOpacity={0.9} onPress={onPress}>
      <View style={styles.container}>
        <View style={styles.card}>{action.icon}</View>
        <Text style={styles.text}>{action.name}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    width: 78,
    paddingBottom: 24,
  },
  text: {
    ...AppTextstyles.bodySmall,
    paddingTop: 12,
  },
  card: {
    backgroundColor: 'white',
    padding: 13,
    borderRadius: 40,
    shadowColor: '#001064',
    shadowOffset: {width: 0, height: 5},
    shadowOpacity: 0.07,
    shadowRadius: 5,
    elevation: 5,
  },
});
