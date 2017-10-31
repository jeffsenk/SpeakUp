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
import UserDetail from './UserDetail';
import CommentScreen from './CommentScreen';

export const CommentContainer = StackNavigator({
  CommentScreen:{
    screen: CommentScreen,
  },
  UserFocus:{
    screen: UserDetail,
  }
},{
  headerMode:'none',
  cardStyle:{
    backgroundColor:'transparent'
  }
})

