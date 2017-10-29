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
import FollowingScreen from './FeedScreen';
import DetailScreen from './CategoryScreen';
import CommentScreen from './FollowingScreen';

export const FollowingContainer = StackNavigator({
  Home:{
    screen: FollowingScreen,
  },
  Detail:{
    screen: DetailScreen,
  },
  Comment:{
    screen: CommentScreen,
  }
})

