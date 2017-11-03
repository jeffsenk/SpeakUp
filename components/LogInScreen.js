import React, {Component} from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Button,
  TextInput
} from 'react-native';
import firebase from 'firebase';

export default class LogInBox extends Component<{}> {

  constructor(props){
    super(props);
    this.state = {email:"",password:""}
    this.toggleSignIn = this.toggleSignIn.bind(this);
    this.handleSignUp = this.handleSignUp.bind(this);
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

  handleSignUp(){
    if (this.props.auth.currentUser){
      this.props.auth.signOut();
    }else{
      this.props.auth.createUserWithEmailAndPassword(this.state.email,this.state.password).then(function(user){
        this.props.database.ref('Users/'+user.uid).set(true);
        this.props.database.ref('Users/'+user.uid+'/Name').set(this.state.email);
        this.props.database.ref('Users/'+user.uid+'/email').set(this.state.email);
        this.props.database.ref('Users/'+user.uid+'/Following/Users/JrEg1g2It0ZkY0T0voOAuQLKwKA3').set(true);
        this.props.database.ref('Users/'+user.uid+'/Following/Categories/Sports').set(true);
        this.props.database.ref('Users/'+user.uid+'/Following/Categories/Politics').set(true);
        this.props.database.ref('Users/'+user.uid+'/Following/Categories/Tech').set(true);
      }.bind(this),function(error){
        alert(error.message);
      });
    }
  }

  render(){
    return (
      <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
        <Text style={styles.title} >SpeakUp</Text>
        <TextInput style={styles.input} value={this.state.email} onChangeText={(text)=>this.setState({email:text})} placeholder="Email"/>
        <TextInput style={styles.input} value={this.state.password} onChangeText={(text)=>this.setState({password:text})} placeholder="Password"/>
        <View style={styles.buttons}>
          <Button onPress={this.toggleSignIn} title="Sign In"/>
          <Button onPress={this.handleSignUp} title="Sign Up"/>
        </View>
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
  },
  buttons:{
    marginTop:20,
    width:200,
    flexDirection:'row',
    justifyContent:'space-between'
  },

});
