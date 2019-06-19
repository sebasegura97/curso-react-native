import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';

import TabBarIcon from '../components/TabBarIcon';
import Calendar from '../screens/Calendar';
import Patients from '../screens/Patients';
import SettingsScreen from '../screens/SettingsScreen';
import AddPatient from '../screens/AddPatient'

const CalendarStack = createStackNavigator({
  Calendar: Calendar,
});

CalendarStack.navigationOptions = {
  tabBarLabel: 'Calendario',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={  
        Platform.OS === 'ios'
          ? `ios-calendar`
          : 'md-calendar'
      }
    />
  ),
};

const PatientsStack = createStackNavigator({
  Patients: Patients,
  AddPatient: AddPatient
});

PatientsStack.navigationOptions = {
  tabBarLabel: 'Pacientes',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? 'ios-contact' : 'md-contact'}
    />
  ),
};

const SettingsStack = createStackNavigator({
  Settings: SettingsScreen,
});

SettingsStack.navigationOptions = {
  tabBarLabel: 'Configuracion',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? 'ios-options' : 'md-options'}
    />
  ),
};

export default createBottomTabNavigator({
  CalendarStack,
  PatientsStack,
  SettingsStack,
});
