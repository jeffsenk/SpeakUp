import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  Button,
  Image,
  FlatList,
  View
} from 'react-native';

import CategoryItem from './CategoryItem';

export default class CategoryScreen extends Component<{}>{
  static navigationOptions={
    header:null
  }

  constructor(props){
    super(props);
    this.state = {
      subscribed:{},
      categories:[]
    }
    this.fetchCategories = this.fetchCategories.bind(this);
    this.handleLogOut = this.handleLogOut.bind(this);
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

  componentWillReceiveProps(nextProps){
    this.setState({subscribed:nextProps.screenProps.user.child('Following/Categories').val()});
  }

  componentDidMount(){
    this.fetchCategories(this.props.screenProps.database);
  }

  render(){
    const props = this.props.screenProps;
    return(
      <View style={styles.main}>
        <Text style={{fontSize:25}}>Signed in as:</Text>
        <Text style={{marginBottom:20}}>{props.user.val().Name}</Text>
        <View style={{width:100}}>
          <Button onPress={this.handleLogOut} title="Log Out"/>
        </View>
        <Text style={styles.title}>Categories</Text>
        <FlatList style={{marginLeft:20}} extraData={this.state} data={this.state.categories}
         renderItem={({item})=>
           <CategoryItem user={props.user} category={item} database={props.database} /> }/>
      </View>
    );
  }

}
const styles = StyleSheet.create({
  main:{
    marginLeft:10,
    flex:1,
    justifyContent:'flex-start'
  },
  title:{
    marginTop:10,
    marginBottom:30,
    fontSize:25
  }
});
