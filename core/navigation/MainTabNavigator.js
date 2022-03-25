import {createStackNavigator} from 'react-navigation-stack';
import {createBottomTabNavigator} from 'react-navigation-tabs';
import {BottomMenu} from './bottomMenu';

//Import Screens
import HomeScreen from '../../screens/HomeScreens/HomeScreen';
import ArtcileScreen from '../../screens/HomeScreens/ArticleScreen';
import ScanProductScreen from '../../screens/ScanProductScreens/ScanProductScreen';
import ProductHistoryScreen from '../../screens/ProductsHistoryScreens/ProductHistoryScreen';
import ProfileScreen from '../../screens/ProfileScreens/ProfileScreen';
import IdentifyProductScreen from '../../screens/ProductScreens/IdentifyProductScreen';
import CameraScreen from '../../screens/CameraScreens/CameraScreen';
import ThanksProductScreen from '../../screens/ProductScreens/ThanksProductScreen';

const HomeStack = createStackNavigator(
  {
    HomeScreen: {
      screen: HomeScreen,
      params: {statusbar: 'dark-content'},
    },
    ArtcileScreen: {
      screen: ArtcileScreen,
      params: {statusbar: 'light-content'},
    },
  },
  {
    headerMode: 'screen',
    defaultNavigationOptions: {
      header: null,
    },
    navigationOptions: ({navigation}) => ({
      tabBarVisible: navigation.state.index < 1,
    }),
  },
);

const ScanStack = createStackNavigator(
  {
    ScanProductScreen: {
      screen: ScanProductScreen,
      params: {statusbar: 'light-content'},
    },
    IdentifyProductScreen: {
      screen: IdentifyProductScreen,
      params: {statusbar: 'dark-content'},
    },
    CameraScreen: {
      screen: CameraScreen,
      params: {statusbar: 'light-content'},
    },
    ThanksProductScreen: {
      screen: ThanksProductScreen,
      params: {statusbar: 'dark-content'},
    },
  },
  {
    headerMode: 'screen',
    defaultNavigationOptions: {
      header: null,
    },
    navigationOptions: ({navigation}) => ({
      tabBarVisible: navigation.state.index < 2,
    }),
  },
);

const HistoryStack = createStackNavigator(
  {
    ProductHistoryScreen: {
      screen: ProductHistoryScreen,
      params: {statusbar: 'dark-content'},
    },
  },
  {
    headerMode: 'screen',
    defaultNavigationOptions: {
      header: null,
    },
    navigationOptions: ({navigation}) => ({
      tabBarVisible: navigation.state.index < 2,
    }),
  },
);

const ProfileStack = createStackNavigator(
  {
    ProfileScreen: {
      screen: ProfileScreen,
      params: {statusbar: 'dark-content'},
    },
    CameraScreen: {
      screen: CameraScreen,
      params: {statusbar: 'light-content'},
    },
  },
  {
    headerMode: 'screen',
    defaultNavigationOptions: {
      header: null,
    },
    navigationOptions: ({navigation}) => ({
      tabBarVisible: navigation.state.index < 1,
    }),
  },
);

export const TabNavigatorScreen = createBottomTabNavigator(
  {
    HomeStack,
    ScanStack,
    HistoryStack,
    ProfileStack,
  },
  {
    initialRouteName: 'HomeStack',
    tabBarComponent: BottomMenu,
  },
);
