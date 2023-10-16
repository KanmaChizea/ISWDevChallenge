import {
  FlatList,
  Keyboard,
  Modal,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import React, {useState} from 'react';
import AppTextstyles from '../styles/textstyles';
import {dashboardActions} from '../constants/actions';
import {DashboardActionCard} from '../components/dashboard/dashboard_action_card';
import AccountCard from '../components/dashboard/account_card';
import {useAppSelector} from '../redux/hooks';
import {selectAccounts} from '../redux/accounts';
import {
  AddNewAccount,
  AddNewAccountButton,
} from '../components/dashboard/add_new_account';
import {useNavigation} from '@react-navigation/native';

const Dashboard = () => {
  const myAccounts = useAppSelector(selectAccounts);
  const [modalVisible, setModalVisible] = useState(false);
  const navigator = useNavigation();
  return (
    <View style={styles.container}>
      <Modal
        visible={modalVisible}
        animationType="fade"
        transparent={true}
        onRequestClose={() => setModalVisible(!modalVisible)}>
        <TouchableWithoutFeedback onPress={() => setModalVisible(false)}>
          <View style={styles.modalOverlay} />
        </TouchableWithoutFeedback>
        <AddNewAccount closeModal={() => setModalVisible(false)} />
      </Modal>
      <Text style={styles.accountsText}>My Accounts</Text>
      <FlatList
        keyExtractor={(_, index) => index.toString()}
        data={myAccounts}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        renderItem={({item}) => <AccountCard account={item} />}
        ListEmptyComponent={
          <Text>No account associated with this account</Text>
        }
        ListFooterComponent={
          <AddNewAccountButton onPress={() => setModalVisible(true)} />
        }
      />
      <View style={{paddingTop: 64}}></View>
      <Text style={styles.accountsText}>Quick Actions</Text>
      <FlatList
        keyExtractor={(item, index) => item.id}
        data={dashboardActions}
        renderItem={({item}) => (
          <DashboardActionCard
            action={item}
            onPress={() => navigator.navigate(item.route as never)}
          />
        )}
        numColumns={3}
        columnWrapperStyle={styles.columnWrapper}
      />
    </View>
  );
};

export default Dashboard;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
  },
  accountsText: {
    ...AppTextstyles.h5,
    paddingBottom: 28,
  },

  columnWrapper: {
    justifyContent: 'space-between',
    paddingHorizontal: 12, // Add horizontal spacing between items
  },
  modalOverlay: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
});
