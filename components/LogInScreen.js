import React, {Component} from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Button,
  TextInput
} from 'react-native';

export default class LogInBox extends Component<{}> {

  constructor(props){
    super(props);
    this.state = {email:"",password:""}
    this.toggleSignIn = this.toggleSignIn.bind(this);
  }

  toggleSignIn(){
    if (this.props.auth.currentUser){
      this.props.auth.signOut();
    }else{
      var email = this.state.email;
      var password = this.state.password;
      this.props.auth.signInWithEmailAndPassword(email, password).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        if (errorCode === 'auth/wrong-password') {
          alert('Wrong password.');
        } else {
          alert(errorMessage);
        }
        console.log(error);
      });
    }
  }

  render(){
    return (
      <View style={{alignItems:'center'}}>
        <Text style={styles.title} >SpeakUp</Text>
        <TextInput style={styles.input} value={this.state.email} onChangeText={(text)=>this.setState({email:text})} placeholder="Email"/>
        <TextInput style={styles.input} value={this.state.password} onChangeText={(text)=>this.setState({password:text})} placeholder="Password"/>
        <Button onPress={this.toggleSignIn} title="Sign In"/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  input:{
    width:200
  },
  title:{
    fontSize:40,
    marginBottom:50
  }
});
