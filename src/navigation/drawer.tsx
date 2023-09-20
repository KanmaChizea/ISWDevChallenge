import {
  DrawerContentComponentProps,
  DrawerContentScrollView,
  DrawerItem,
  createDrawerNavigator,
} from '@react-navigation/drawer';
import HelpScreen from '../screens/help';
import {
  DashboardIcon,
  HelpIcon,
  Logo,
  MenuIcon,
  SettingsIcon,
} from '../../assets';
import {AppColors} from '../styles';
import {ParamListBase, RouteProp} from '@react-navigation/native';
import {TouchableOpacity, View} from 'react-native';
import AppTextstyles from '../styles/textstyles';
import MyTabs from './tabs';

const Drawer = createDrawerNavigator();

export default function MyDrawer() {
  return (
    <Drawer.Navigator
      screenOptions={screenOptions}
      drawerContent={props => <CustomDrawerContent {...props} />}>
      <Drawer.Screen
        name="Dashboard"
        component={MyTabs}
        options={{
          drawerIcon: ({color, size}) => <DashboardIcon />,
        }}
      />
      <Drawer.Screen
        name="Settings"
        component={MyTabs}
        options={{
          drawerIcon: ({color, size}) => <SettingsIcon />,
        }}
      />
      <Drawer.Screen
        name="Help"
        component={HelpScreen}
        options={{
          drawerIcon: ({color, size}) => (
            <View style={{paddingHorizontal: 5}}>
              <HelpIcon />
            </View>
          ),
        }}
      />
    </Drawer.Navigator>
  );
}

const screenOptions = ({
  route,
  navigation,
}: {
  route: RouteProp<ParamListBase, string>;
  navigation: any;
}) => {
  return {
    headerTitle: '',
    headerRight: () => (
      <View style={{paddingRight: 8}}>
        <Logo />
      </View>
    ),
    headerLeft: () => (
      <TouchableOpacity
        style={{paddingLeft: 8}}
        onPress={() => navigation.openDrawer()}>
        <MenuIcon />
      </TouchableOpacity>
    ),
    headerStyle: {
      backgroundColor: 'transparent',
      elevation: 0,
      height: 80,
    },
    swipeEnabled: false,
    drawerStyle: {
      backgroundColor: AppColors.primary,
      paddingTop: 64,
    },
    drawerActiveTintColor: AppColors.primary,
    drawerLabelStyle: {},
  };
};

const CustomDrawerContent = (props: DrawerContentComponentProps) => {
  return (
    <DrawerContentScrollView {...props}>
      <CustomDrawerItem
        label="Dashboard"
        icon={<DashboardIcon />}
        onPress={() => props.navigation.navigate('DashboardTab')}
      />
      <CustomDrawerItem
        label="Settings"
        icon={<SettingsIcon />}
        onPress={() => props.navigation.navigate('SettingsTab')}
      />
      <CustomDrawerItem
        label="Help"
        icon={
          <View style={{paddingHorizontal: 6}}>
            <HelpIcon />
          </View>
        }
        onPress={() => props.navigation.navigate('Help')}
      />
    </DrawerContentScrollView>
  );
};

const CustomDrawerItem = (props: {
  label: string;
  icon: React.ReactNode;
  onPress: () => void;
}) => {
  return (
    <DrawerItem
      label={props.label}
      icon={() => props.icon}
      onPress={props.onPress}
      labelStyle={{
        ...AppTextstyles.bodyLarge,
        color: 'white',
        marginLeft: -15,
      }}
    />
  );
};
