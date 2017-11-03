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
import {CommentContainer} from './CommentContainer';
export const FollowingContainer = StackNavigator({
  Following:{
    screen: FollowingScreen,
  },
  FollowingDetail:{
    screen: DetailScreen,
  },
  FollowingComment:{
    screen: CommentContainer,
  }
},{
  cardStyle:{
    backgroundColor:'transparent'
  }
})

