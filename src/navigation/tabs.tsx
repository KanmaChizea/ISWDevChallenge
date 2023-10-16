import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Dashboard from '../containers/Dashboard';
import SettingsScreen from '../containers/Settings';
import {AppColors} from '../styles';
import {Text} from 'react-native';
import {DashboardIcon, SettingsIcon} from '../../assets';
import {ParamListBase, RouteProp} from '@react-navigation/native';

const Tab = createBottomTabNavigator();

function MyTabs() {
  return (
    <Tab.Navigator screenOptions={screenOptions}>
      <Tab.Screen
        name="DashboardTab"
        component={Dashboard}
        options={dashboardOptions}
      />
      <Tab.Screen
        name="SettingsTab"
        component={SettingsScreen}
        options={settingsOptions}
      />
    </Tab.Navigator>
  );
}

export default MyTabs;

const dashboardOptions = {
  tabBarIcon: (props: {focused: boolean}) => {
    return (
      <DashboardIcon stroke={props.focused ? 'white' : AppColors.grey300} />
    );
  },
};

const settingsOptions = {
  tabBarIcon: (props: {focused: boolean}) => {
    return (
      <SettingsIcon stroke={props.focused ? 'white' : AppColors.grey300} />
    );
  },
};

const screenOptions = ({route}: {route: RouteProp<ParamListBase, string>}) => ({
  headerShown: false,
  tabBarStyle: {
    backgroundColor: AppColors.primary,
    height: 64,
    paddingBottom: 6,
    paddingTop: 12,
  },
  tabBarLabel: (props: {focused: boolean}) => {
    const style = {color: props.focused ? 'white' : AppColors.grey300};
    return <Text style={style}>{route.name.slice(0, -3)}</Text>;
  },
});
