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
import DetailScreen from './DetailScreen';
import CommentScreen from './CommentScreen';

export const FeedContainer = StackNavigator({
  Feed:{
    screen: FeedScreen,
  },
  Detail:{
    screen: DetailScreen,
  },
  Comment:{
    screen: CommentScreen,
  },
},{
  cardStyle:{
    backgroundColor:'transparent'
  }
})

