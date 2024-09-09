import 'react-native-gesture-handler';
import React from 'react';
import {StatusBar} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import DetailsScreen from '../components/screens/DetailsScreen';
import BottomNavigator from '../components/navigation/BottomNavigator';
import OnBoardScreen from '../components/screens/OnBoardScreen';
import {Colors} from '@/constants/Colors';

const Stack = createStackNavigator();

export default function Index() {
  return (
    <NavigationContainer independent={true}>
      <StatusBar backgroundColor={Colors.required.white} barStyle="dark-content" />
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="BoardScreen" component={OnBoardScreen} />
        <Stack.Screen name="Home" component={BottomNavigator} />
        <Stack.Screen name="DetailsScreen" component={DetailsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );

}
