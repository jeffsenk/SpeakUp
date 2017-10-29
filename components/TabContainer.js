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
import {FeedContainer} from './FeedContainer';
import CategoryScreen from './CategoryScreen';
import {FollowingContainer} from './FollowingContainer';

export const TabContainer = TabNavigator({
  Home:{
    screen: FeedContainer
  },
  Category:{
    screen: CategoryScreen
  },
  Following:{
    screen: FollowingContainer
  }
},{
  tabBarPosition:'bottom',
  animationEnabled:true  
})

