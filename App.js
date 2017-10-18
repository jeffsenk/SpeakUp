/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  ScrollView,
  View
} from 'react-native';
import firebase from './fire';
import LogInScreen from './components/LogInScreen';
import MainContainer from './components/MainContainer';

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' +
    'Cmd+D or shake for dev menu',
  android: 'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

export default class App extends Component<{}> {
  constructor(props){
    super(props);
    this.state={
      user: {}
    }
  }

  componentWillMount(){
    firebase.auth().onAuthStateChanged(function(currentUser) {
      if(currentUser){
        this.setState({
          user: currentUser
        });
      }else{
        this.setState({
          user: {}
        });
      }
    }.bind(this));
  }

  render() {
    if(this.state.user.email){
      return(
        <MainContainer firebase={firebase}/>
      );
    }
    return (
      <View style={styles.container}>
        <LogInScreen auth={firebase.auth()}/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  }
});
