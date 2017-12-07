import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  Button,
  Image,
  CheckBox,
  TextInput,
  FlatList,
  ScrollView,
  TouchableHighlight,
  View
} from 'react-native';

import CategoryItem from './CategoryItem';
import IconButton from './IconButton';
import Icon from 'react-native-vector-icons/FontAwesome';

export default class CategoryScreen extends Component<{}>{
  static navigationOptions={
    header:null
  }

  constructor(props){
    super(props);
    this.state = {
      subscribed:{},
      categories:[],
      gender:'none',
      age:'',
      income:''
    }
    this.fetchCategories = this.fetchCategories.bind(this);
    this.handleLogOut = this.handleLogOut.bind(this);
    this.fetchDemographics = this.fetchDemographics.bind(this);
    this.selectGender = this.selectGender.bind(this);
    this.selectIncome = this.selectIncome.bind(this);
    this.selectAge = this.selectAge.bind(this);
  }

  handleLogOut(){
    this.props.screenProps.auth.signOut();
  }

  fetchCategories(database){
    database.ref('Categories').once('value').then(function(snapShot){
      snapShot.forEach(function(category){
        let newState = this.state.categories;
        newState.push(category);
        this.setState({categories:newState});
      }.bind(this));
    }.bind(this));
  }

  fetchDemographics(database,user){
    database.ref('Users/'+user.key).on('value',function(snapShot){
      this.setState({gender:snapShot.val().Gender,age:snapShot.val().Age,income:snapShot.val().Income});
    }.bind(this));
  }

  selectGender(gender){
    this.props.screenProps.database.ref('Users/'+this.props.screenProps.user.key+'/Gender').set(gender);
  }

  selectIncome(income){
    this.props.screenProps.database.ref('Users/'+this.props.screenProps.user.key+'/Income').set(income);
  }

  selectAge(age){
    this.props.screenProps.database.ref('Users/'+this.props.screenProps.user.key+'/Age').set(age);
  }

  componentWillReceiveProps(nextProps){
    this.setState({subscribed:nextProps.screenProps.user.child('Following/Categories').val()});
  }

  componentDidMount(){
    this.fetchCategories(this.props.screenProps.database);
    this.fetchDemographics(this.props.screenProps.database,this.props.screenProps.user);
  }

  render(){
    const props = this.props.screenProps;
    var fillColor = 'black';
    var none = this.state.gender == 'none' ? 'check' : 'square-o';
    var noneColor = this.state.gender == 'none' ? '#2196f3' : 'white';
    var male = this.state.gender == 'male' ? 'check' : 'square-o';
    var maleColor = this.state.gender == 'male' ? '#2196f3' : 'white';
    var female = this.state.gender == 'female' ? 'check' : 'square-o';
    var femaleColor = this.state.gender == 'female' ? '#2196f3' : 'white';

    return(
      <ScrollView style={styles.main}>
        <View style={styles.titleView}>
          <Text style={styles.title}>Categories</Text>
        </View>
        <FlatList style={{marginLeft:20}} extraData={this.state} data={this.state.categories}
         renderItem={({item})=>
           <CategoryItem user={props.user} category={item} database={props.database} /> }/>
        <View style={styles.titleView}>
	  <Text style={styles.title}> Demographics </Text>
        </View>
        <Text style={styles.subTitle}> Gender </Text>
        <View style={styles.option}>
          <TouchableHighlight onPress={this.selectGender.bind(this,'none')} underlayColor='white'>
            <View style={{flexDirection:'row'}}>
	      <View style={{width:40}}>
		<Icon name={none} size={32} color={noneColor}/>
	      </View>
	      <Text style={styles.label} >None</Text>
            </View>
          </TouchableHighlight>
        </View>
        <View style={styles.option}>
          <TouchableHighlight onPress={this.selectGender.bind(this,'male')} underlayColor='white'>
            <View style={{flexDirection:'row'}}>
	      <View style={{width:40}}>
		<Icon name={male} size={32} color={maleColor}/>
	      </View>
	      <Text style={styles.label} >Male</Text>
            </View>
          </TouchableHighlight>
        </View>
        <View style={styles.option}>
          <TouchableHighlight onPress={this.selectGender.bind(this,'female')} underlayColor='white'>
            <View style={{flexDirection:'row'}}>
	      <View style={{width:40}}>
		<Icon name={female} size={32} color={femaleColor}/>
	      </View>
	      <Text style={styles.label} >Female</Text>
            </View>
          </TouchableHighlight>
        </View>
        <Text style={styles.subTitle}>Age </Text>
        <View style={styles.option}>
          <TextInput style={styles.income} maxLength={3} underlineColorAndroid={'transparent'}
           onChangeText={(text)=>this.selectAge(text)} value={this.state.age}/>
        </View>
        <Text style={styles.subTitle}>Household Income </Text>
        <View style={styles.option}>
          <TextInput style={styles.income} maxLength={15} underlineColorAndroid={'transparent'}
           onChangeText={(text)=>this.selectIncome(text)} value={this.state.income}/>
          <Text style={styles.label} > (in Thousands $) </Text>
        </View>
        <Text style={{fontSize:25,marginTop:20}}>Signed in as:</Text>
        <Text style={{marginBottom:20}}>{props.user.val().Name}</Text>
        <View style={{width:100,marginBottom:50}}>
          <Button onPress={this.handleLogOut} title="Log Out"/>
        </View>
      </ScrollView>
    );
  }

}
const styles = StyleSheet.create({
  main:{
    marginLeft:10,
    flex:1,
  },
  titleView:{
    marginTop:10,
    marginBottom:20,
    borderBottomWidth:1,
    borderBottomColor:'lightgray'
  },
  title:{
    fontSize:25,
    marginBottom:10
  },
  subTitle:{
    marginBottom:10,
    fontSize:22
  },
  option:{
    marginLeft:20,
    marginBottom:10,
    flexDirection:'row',
    alignItems:'center'
  },
  label:{
    marginLeft: 10,
    fontSize:20
  },
  income:{
    height:40,
    width:80,
    borderStyle:'solid',
    borderWidth:1,
    borderColor:'lightgray'
  }
});
