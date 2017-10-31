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
import {CommentContainer} from './CommentContainer';

export const FeedContainer = StackNavigator({
  Feed:{
    screen: FeedScreen,
  },
  FeedDetail:{
    screen: DetailScreen,
  },
  FeedComment:{
    screen: CommentContainer,
  },
},{
  cardStyle:{
    backgroundColor:'transparent'
  }
})

