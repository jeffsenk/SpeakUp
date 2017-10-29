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
    screen: FeedContainer,
  },
  Category:{
    screen: CategoryScreen,
  },
  Following:{
    screen: FollowingContainer
  }
},{
  tabBarPosition:'bottom',
  animationEnabled:'true'  
})

