import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  BackHandler,
  Button,
  View
} from 'react-native';
import {TabNavigator} from 'react-navigation';
import FeedScreen from './FeedScreen';
import CategoryScreen from './CategoryScreen';
import FollowingScreen from './FollowingScreen';

export const TabContainer = TabNavigator({
  Home:{
    screen: FeedScreen,
  },
  Category:{
    screen: CategoryScreen,
  }
},{
  tabBarPosition:'bottom',
  animationEnabled:'true'  
})

