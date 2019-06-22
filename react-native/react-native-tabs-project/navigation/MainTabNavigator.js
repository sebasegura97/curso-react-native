import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';

import TabBarIcon from '../components/TabBarIcon';
import Calendar from '../screens/Calendar';
import SettingsScreen from '../screens/SettingsScreen';
import Patients from '../screens/Patients/index';
import AddPatient from '../screens/Patients/AddPatient'
import Patient from '../screens/Patients/Patient'
import NewEntry from '../screens/Patients/NewEntry';
import AddDate from '../screens/Patients/AddDate';
import AddHistory from '../screens/Patients/AddHistory';

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
  AddPatient: { screen: AddPatient, path: 'patients/add' },
  Patient: { screen: Patient, path: 'patients/patient'},
  NewEntry: { screen: NewEntry, path: 'patients/newEntry' },
  AddDate: { screen: AddDate, path: 'patients/addDate' },
  AddHistory: { screen: AddHistory, path: 'patients/addHiAddHistory' },
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
