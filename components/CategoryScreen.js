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
      subscribed:{}
    }
  }

  componentWillReceiveProps(nextProps){
    this.setState({subscribed:nextProps.screenProps.user.val().Subscribed});
  }

  render(){
    const props = this.props.screenProps;
    return(
      <View style={styles.main}>
        <FlatList extraData={this.state} data={props.categories}
         renderItem={({item})=>
           <CategoryItem user={props.user} category={item} database={props.database} /> }/>
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
