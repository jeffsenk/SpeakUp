import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  TextInput,
  ScrollView,
  Alert,
  Button,
  View
} from 'react-native';
import ModalPicker from 'react-native-modal-selector';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

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
    if(this.state.name.length>0 && this.state.description.length>0 && this.state.argumentPro.length >0 && this.state.argumentCon.length>0){
    let newKey = props.database.ref('Proposals').push({
          Category:this.state.category,
          Name:this.state.name,
          Description:this.state.description,
          ArgumentPro:this.state.argumentPro,
          ArgumentCon:this.state.argumentCon,
          TimeStamp:Date.now(),
          Submitter:props.user.key,
          SubmitterName:props.user.val().Name
    },function(err){
      if(err){
       Alert.alert(err.message);
      }else{
       Alert.alert('Proposal Submitted!')
      };
    }).key;
    props.database.ref('Categories/'+this.state.category+'/Proposals/'+newKey).set('true');
    props.database.ref('Users/'+props.user.key+'/Proposals/'+newKey).set('true');
    this.resetState();
    }else{
      Alert.alert('Please complete all fields');
    }
  }

  render(){
    const data = [
      {key:0,label:'Politics'},
      {key:1,label:'Sports'},
      {key:2,label:'Tech'},
      {key:3,label:'Movies'},
      {key:4,label:'Music'}
    ]

    return(
      <KeyboardAwareScrollView style={{backgroundColor:'white'}} resetScrollToCords={{x:0,y:0}} contentContainerStyle={styles.container} scrollEnabled={true}>
        <Text style={styles.title}>New Proposal</Text>
        <Text style={styles.label}>Category</Text>
        <View style={styles.selector}>
        <ModalPicker data={data} initValue='Select Category' onChange={(option)=>{this.setState({category:option.label})}} />
        </View>
        <Text style={styles.label} >Name</Text>
        <TextInput maxLength={60} underlineColorAndroid={'transparent'} style={styles.input}
         onChangeText={(text)=>this.setState({name:text})} value={this.state.name}/>
        <Text style={styles.label} >Description</Text>
        <TextInput multiline={true} underlineColorAndroid={'transparent'} style={styles.bigInput}
         onChangeText={(text)=>this.setState({description:text})} value={this.state.description}/>
        <Text style={styles.label} >Argument Pro</Text>
        <TextInput multiline={true} underlineColorAndroid={'transparent'} style={styles.bigInput}
         onChangeText={(text)=>this.setState({argumentPro:text})} value={this.state.argumentPro}/>
        <Text style={styles.label} >Argument Con</Text>
        <TextInput multiline={true} underlineColorAndroid={'transparent'} style={styles.bigInput}
         onChangeText={(text)=>this.setState({argumentCon:text})} value={this.state.argumentCon}/>
        <Text style={{marginLeft:10,marginTop:20}}>Public: All Followers Can See Your Proposal </Text>
        <View style={styles.submit}>
          <Button onPress={this.onSubmit} title="Submit"/>
        </View>
      </KeyboardAwareScrollView>
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
  selector:{
    marginLeft:10,
    marginRight:30,
    height:50
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
