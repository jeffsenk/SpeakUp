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
  View
} from 'react-native';

import CategoryItem from './CategoryItem';
import IconButton from './IconButton';

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
    const fillColor = 'black';
    var none = this.state.gender == 'none' ? 'check-square' : 'square-o';
    var male = this.state.gender == 'male' ? 'check-square' : 'square-o';
    var female = this.state.gender == 'female' ? 'check-square' : 'square-o';

    return(
      <ScrollView style={styles.main}>
        <Text style={{fontSize:25}}>Signed in as:</Text>
        <Text style={{marginBottom:20}}>{props.user.val().Name}</Text>
        <View style={{width:100}}>
          <Button onPress={this.handleLogOut} title="Log Out"/>
        </View>
        <Text style={styles.title}>Categories</Text>
        <FlatList style={{marginLeft:20}} extraData={this.state} data={this.state.categories}
         renderItem={({item})=>
           <CategoryItem user={props.user} category={item} database={props.database} /> }/>
        <Text style={styles.title}> Demographics </Text>
        <Text style={styles.subTitle}> Gender </Text>
        <View style={styles.option}>
          <IconButton source={none} onPress={this.selectGender.bind(this,'none')} color={fillColor} />
          <Text style={styles.label} >None</Text>
        </View>
        <View style={styles.option}>
          <IconButton source={male} onPress={this.selectGender.bind(this,'male')} color={fillColor} />
          <Text style={styles.label}>Male</Text>
        </View>
        <View style={styles.option}>
          <IconButton source={female} onPress={this.selectGender.bind(this,'female')} color={fillColor} />
          <Text style={styles.label}>Female</Text>
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
      </ScrollView>
    );
  }

}
const styles = StyleSheet.create({
  main:{
    marginLeft:10,
    flex:1,
  },
  title:{
    marginTop:10,
    marginBottom:30,
    fontSize:25
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
