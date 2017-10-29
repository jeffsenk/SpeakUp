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
import FollowingScreen from './FollowingScreen';
import DetailScreen from './DetailScreen';
import CommentScreen from './CommentScreen';

export const FollowingContainer = StackNavigator({
  Following:{
    screen: FollowingScreen,
  },
  Detail:{
    screen: DetailScreen,
  },
  Comment:{
    screen: CommentScreen,
  }
})

