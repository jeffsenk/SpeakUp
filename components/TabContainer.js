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
import {UserContainer} from './UserContainer';

export const TabContainer = TabNavigator({
  Home:{
    screen: FeedContainer,
  },
  Categories:{
    screen: CategoryScreen
  },
  Following:{
    screen: FollowingContainer
  },
  Users:{
    screen: UserContainer
  }
},{
  tabBarPosition:'bottom',
  animationEnabled:true,
  tabBarOptions:{
    pressColor:'lightgray',
    style:{
      backgroundColor:'transparent'
    },
    labelStyle:{
      color:'black'
    },
    tabStyle:{
      borderTopWidth:1,
      borderTopColor:'lightgray'
    },
    indicatorStyle:{
      backgroundColor:'black'
    }
  }  
})

