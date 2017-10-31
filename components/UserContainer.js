import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  BackHandler,
  Button,
  View
} from 'react-native';
import {StackNavigator} from 'react-navigation';
import UserScreen from './UserScreen';
import UserDetail from './UserDetail';

export const UserContainer = StackNavigator({
  User:{
    screen: UserScreen,
  },
  UserDetail:{
    screen: UserDetail,
  }
},{
  cardStyle:{
    backgroundColor:'transparent'
  }
})

