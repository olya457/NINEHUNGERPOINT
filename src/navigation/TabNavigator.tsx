import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import PlacesScreen from '../screens/PlacesScreen';
import MapScreen from '../screens/MapScreen';
import QuizScreen from '../screens/QuizScreen';
import StoriesScreen from '../screens/StoriesScreen';
import SavedScreen from '../screens/SavedScreen';
import CustomTabBar from '../components/CustomTabBar';
import { TabParamList } from '../types';

const Tab = createBottomTabNavigator<TabParamList>();

const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{ headerShown: false }}
      tabBar={props => <CustomTabBar {...props} />}
    >
      <Tab.Screen name="Places" component={PlacesScreen} />
      <Tab.Screen name="Map" component={MapScreen} />
      <Tab.Screen name="Quiz" component={QuizScreen} />
      <Tab.Screen name="Stories" component={StoriesScreen} />
      <Tab.Screen name="Saved" component={SavedScreen} />
    </Tab.Navigator>
  );
};

export default TabNavigator;