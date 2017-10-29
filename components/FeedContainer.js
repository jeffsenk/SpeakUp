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
import FeedScreen from './FeedScreen';
import DetailScreen from './CategoryScreen';
import CommentScreen from './FollowingScreen';

export const FeedContainer = StackNavigator({
  Home:{
    screen: FeedScreen,
  },
  Detail:{
    screen: DetailScreen,
  },
  Comment:{
    screen: CommentScreen,
  }
})

