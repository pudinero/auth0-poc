import React from 'react';
import {Auth0Provider} from 'react-native-auth0';
import config from './auth0-configuration';
import Home from './pages/Home';
import {createStaticNavigation, DefaultTheme} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import CustomLogin from './pages/CustomLogin';
import {useColorScheme} from 'react-native';

const LightTheme = {
  ...DefaultTheme,
  dark: false,
  colors: {
    ...DefaultTheme.colors,
    background: 'rgb(240, 240, 240)',
    backgroundInverted: 'rgb(26, 26, 26)',
    cardBackground: 'rgb(240, 240, 240)',
    cardIconBackground: 'rgb(216, 211, 212)',
    cardIcon: 'rgb(63, 63, 71)',
    primary: 'rgb(255, 45, 85)',
    header: 'rgb(11, 8, 9)',
    subtitle: 'rgb(0, 0, 0)',
    text: 'rgb(26, 26, 26)',
    white: 'rgb(250, 250, 250)',
  },
};

const DarkTheme = {
  ...DefaultTheme,
  dark: true,
  colors: {
    ...DefaultTheme.colors,
    background: 'rgb(26, 26, 26)',
    backgroundInverted: 'rgb(240, 240, 240)',
    cardBackground: 'rgb(11, 8, 9)',
    cardIconBackground: 'rgb(63, 63, 71)',
    cardIcon: 'rgb(216, 211, 212)',
    primary: 'rgb(255, 45, 85)',
    header: 'rgb(11, 8, 9)',
    text: 'rgb(240, 240, 240)',
    white: 'rgb(250, 250, 250)',
  },
};

const RootStack = createNativeStackNavigator({
  initialRouteName: 'Home',
  screenOptions: {
    headerShown: false,
  },
  screens: {
    Home: Home,
    Login: CustomLogin,
  },
});

const Navigation = createStaticNavigation(RootStack);

const App = () => {
  const scheme = useColorScheme();
  return (
    <Auth0Provider domain={config.domain} clientId={config.clientId}>
      <Navigation theme={scheme === 'dark' ? DarkTheme : LightTheme} />
    </Auth0Provider>
  );
};

export default App;
