import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  FlatList,
  View
} from 'react-native';

import CategoryItem from './CategoryItem';

export default class CategoryScreen extends Component<{}>{
  constructor(props){
    super(props);
    this.state = {
      categories:[],
      subscribed:{}
    }
  }

  componentWillReceiveProps(nextProps){
    this.setState({subscribed:nextProps.userSubscribed});
  }

  componentDidMount(){
    this.props.database.ref('Categories').once('value').then(function(snapShot){
      snapShot.forEach(function(category){
        let newState = this.state.categories;
        newState.push(category);
        this.setState({categories:newState});
      }.bind(this));
    }.bind(this));
  }

  render(){
    return(
      <View style={styles.main}>
        <FlatList extraData={this.state} data={this.state.categories}
         renderItem={({item})=>
           <CategoryItem userKey={this.props.userKey} category={item} database={this.props.database} userSubscribed={this.props.userSubscribed}/> }/>
      </View>
    );
  }

}
const styles = StyleSheet.create({
  main:{
    marginTop:50,
    marginLeft:30,
    flex:1,
    justifyContent:'flex-start'
  }
});
