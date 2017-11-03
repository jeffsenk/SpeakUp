import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  TextInput,
  ScrollView,
  Picker,
  Alert,
  Button,
  View
} from 'react-native';

export default class NewProposalScreen extends Component<{}>{
  constructor(props){
    super(props);
    this.state={
      category:"Politics",
      group:'none',
      groupName:'none',
      name:"",
      description:"",
      argumentPro:'',
      argumentCon:''
    }
    this.onSubmit = this.onSubmit.bind(this);
    this.resetState = this.resetState.bind(this);
  }

  resetState(){
    this.setState({
      category:"Politics",
      group:'none',
      groupName:'none',
      name:"",
      description:"",
      argumentPro:'',
      argumentCon:''
    });
  }

  onSubmit(){
    let props = this.props.screenProps;
    let newKey = props.database.ref('Proposals').push({
          Category:this.state.category,
          GroupName:this.state.groupName,
          Group:this.state.group,
          Name:this.state.name,
          Description:this.state.description,
          ArgumentPro:this.state.argumentPro,
          ArgumentCon:this.state.argumentCon,
          Submitter:props.user.key,
          SubmitterName:props.user.val().Name
    },function(err){
      if(err){return onErr(err);}else{Alert.alert('Proposal Submitted!')};
    }).key;
    props.database.ref('Categories/'+this.state.category+'/Proposals/'+newKey).set('true');
    props.database.ref('Users/'+props.user.key+'/Proposals/'+newKey).set('true');
    this.resetState();
  }

  render(){
    return(
      <ScrollView style={{flex:1}}>
        <Text style={styles.title}>New Proposal</Text>
        <Text style={styles.label}>Category</Text>
        <View style={styles.input}>
        <Picker selectedValue={this.state.category} onValueChange={(itemValue,itemIndex)=>this.setState({category:itemValue})}>
          <Picker.Item label="Politics" value="Politics"/>
          <Picker.Item label="Sports" value="Sports"/>
          <Picker.Item label="Tech" value="Tech"/>
        </Picker>
        </View>
        <Text style={styles.label} >Name</Text>
        <TextInput maxLength={60} underlineColorAndroid={'transparent'} style={styles.input}
         onChangeText={(text)=>this.setState({name:text})} value={this.state.name}/>
        <Text style={styles.label} >Description</Text>
        <TextInput multiline={true} underlineColorAndroid={'transparent'} style={styles.bigInput}
         onChangeText={(text)=>this.setState({description:text})} value={this.state.description}/>
        <Text style={styles.label} >Argument Pro</Text>
        <TextInput underlineColorAndroid={'transparent'} style={styles.bigInput}
         onChangeText={(text)=>this.setState({argumentPro:text})} value={this.state.argumentPro}/>
        <Text style={styles.label} >Argument Con</Text>
        <TextInput underlineColorAndroid={'transparent'} style={styles.bigInput}
         onChangeText={(text)=>this.setState({argumentCon:text})} value={this.state.argumentCon}/>
        <View style={styles.submit}>
          <Button onPress={this.onSubmit} title="Submit"/>
        </View>
      </ScrollView>
    );
  }

}

const styles = StyleSheet.create({
  title:{
    marginTop:10,
    marginLeft:10,
    fontSize:25,
    height:40
  },
  label:{
    marginLeft:10,
    height:20
  },
  bigInput:{
    textAlignVertical:'top',
    flex:1,
    borderWidth:1,
    borderColor:'lightgray',
    marginLeft:10,
    marginRight:30,
    height:80,
  },
  input:{
    borderWidth:1,
    borderColor:'lightgray',
    marginLeft:10,
    marginRight:30,
    height:50,
  },
  submit:{
    marginLeft:10,
    marginTop:20,
    width:150
  }
});
