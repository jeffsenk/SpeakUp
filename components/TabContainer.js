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
import NewProposalScreen from './NewProposalScreen';
import Icon from 'react-native-vector-icons/FontAwesome';

export const TabContainer = TabNavigator({
  Home:{
    screen: FeedContainer,
    navigationOptions:({navigation})=>({
      tabBarIcon:({tintColor})=>(
        <Icon name='bullhorn' size={25} />
      )
    }),
  },
  Categories:{
    screen: CategoryScreen,
    navigationOptions:({navigation})=>({
      tabBarIcon:({tintColor})=>(
        <Icon name='check' size={25} />
      )
    }),
  },
  Following:{
    screen: FollowingContainer,
    navigationOptions:({navigation})=>({
      tabBarIcon:({tintColor})=>(
        <Icon name='star' size={25} />
      )
    }),
  },
  Users:{
    screen: UserContainer,
    navigationOptions:({navigation})=>({
      tabBarIcon:({tintColor})=>(
        <Icon name='user' size={25} />
      )
    }),
  },
  New:{
    screen: NewProposalScreen,
    navigationOptions:({navigation})=>({
      tabBarIcon:({tintColor})=>(
        <Icon name='plus' size={25} />
      )
    }),
  }
},{
  tabBarPosition:'bottom',
  animationEnabled:true,
  tabBarOptions:{
    showLabel:false,
    showIcon:true,
    pressColor:'lightgray',
    style:{
      backgroundColor:'transparent'
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

