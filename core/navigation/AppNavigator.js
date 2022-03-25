import {createSwitchNavigator, createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';

//LoadingStack
import LoadingScreen from '../../screens/LoadingScreens/LoadingScreen';

//AuthStack
import SignInScreen from '../../screens/AuthScreens/SignInScreen';
import SignUpScreen from '../../screens/AuthScreens/SignUpScreen';
import ForgotPasswordScreen from '../../screens/AuthScreens/ForgotPasswordScreen';

//WelcomeStack
import CreateUsernameScreen from '../../screens/WelcomeScreens/CreateUsernameScreen';

//HomeStack
import {TabNavigatorScreen} from './MainTabNavigator';
import ProductScreen from '../../screens/ProductScreens/ProductScreen';

const AuthStack = createStackNavigator(
  {
    SignIn: {screen: SignInScreen, params: {statusbar: 'dark-content'}},
    SignUp: {screen: SignUpScreen, params: {statusbar: 'dark-content'}},
    ForgotPassword: {
      screen: ForgotPasswordScreen,
      params: {statusbar: 'dark-content'},
    },
  },
  {
    headerMode: 'screen',
    defaultNavigationOptions: {
      header: null,
    },
  },
);

const WelcomeStack = createStackNavigator(
  {
    Username: {
      screen: CreateUsernameScreen,
      params: {statusbar: 'dark-content'},
    },
  },
  {
    headerMode: 'screen',
    defaultNavigationOptions: {
      header: null,
    },
  },
);

const HomeStack = createStackNavigator(
  {
    MainScreen: {
      screen: TabNavigatorScreen,
      params: {statusbar: 'dark-content'},
    },
    ProductScreen: {
      screen: ProductScreen,
      params: {statusbar: 'dark-content'},
    },
  },
  {
    headerMode: 'screen',
    defaultNavigationOptions: {
      header: null,
    },
  },
);

export const StackNavigation = createSwitchNavigator({
  Loading: LoadingScreen,
  Auth: AuthStack,
  Welcome: WelcomeStack,
  Dashboard: HomeStack,
});

const AppNavigator = createAppContainer(StackNavigation);

export default AppNavigator;
