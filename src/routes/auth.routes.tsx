import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { SignIn } from '@screens/Signin';
import { SignUp } from '@screens/Signup';
import { Home } from '@screens/Home';
import { History } from '@screens/History';
import { Profile } from '@screens/Profile';
import ChatBot from '@screens/ChatBot';
import HomeSvg from '@assets/home.svg'
import HistorySvg from '@assets/chat (2).svg'
import ProfilePhotoSvg from '@assets/profile.svg'
import { NativeStackNavigationProp, createNativeStackNavigator } from '@react-navigation/native-stack';
import { useTheme } from 'native-base';
// Importe os componentes dos ícones aqui


type AuthRoutes = {
  signIn: undefined;
  signUp: undefined;
  
}

export type AuthNavigatorRoutesProps = NativeStackNavigationProp<AuthRoutes>;
const { Navigator, Screen } = createNativeStackNavigator<AuthRoutes>();


export function AuthRoutes() {
  return (
    <Navigator screenOptions={{ headerShown: false}}>
      <Screen
        name="signIn"
        component={SignIn}
      />
      <Screen
        name="signUp"
        component={SignUp}
      />
    </Navigator>
  );
}
