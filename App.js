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
import Icon from 'react-native-vector-icons/FontAwesome'

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
      authUser: {},
      dbUser:{},
      loggedOut:false
    }
    console.ignoredYellowBox=['Setting a timer'];
    this.fetchLocation = this.fetchLocation.bind(this);
  }

  fetchLocation(userRef){
    navigator.geolocation.getCurrentPosition(function(position){
      userRef.child('Latitude').set(position.coords.latitude);    
      userRef.child('Longitude').set(position.coords.longitude);    
  },function(error){
      console.log(error.message);
    },{ enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 });
  }

  componentDidMount(){
    firebase.auth().onAuthStateChanged(function(currentUser){
      if(currentUser){
        this.setState({
          authUser: currentUser
        });
        let database = firebase.database();
        let userRef = database.ref('Users/'+currentUser.uid);
        userRef.on('value',function(snapShot){
          this.setState({dbUser:snapShot});
          this.fetchLocation(userRef);
        }.bind(this));
      }else{
        this.setState({
          authUser: {},
          dbUser:{},
          loggedOut:true
        });
      }
    }.bind(this));
  }

  render() {
    if(this.state.dbUser.key){
      return(
        <MainContainer auth={firebase.auth()} user={this.state.dbUser} database={firebase.database()}/>
      );
    }
    if(this.state.loggedOut){
      return (
        <View style={styles.container}>
          <LogInScreen database={firebase.database()} auth={firebase.auth()}/>
        </View>
      );
    }
    return(
      <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
        <Icon name='bullhorn' size={70} color='salmon'/>
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
