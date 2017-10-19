import React, { Component } from 'react';
import {
  Platform,
  View,
  Text
} from 'react-native';
import MainScreen from './MainScreen';

export default class MainContainer extends Component<{}>{
  constructor(props){
    super(props);
    this.state={
      proposals:[]
    }
  }

  componentDidMount(){
    let database = this.props.firebase.database();
    let proposals = database.ref('Proposals');
    proposals.on('value',function(snapshot){
      snapshot.forEach(function(child){
        var match = false;
        for(var i =0;i<this.state.proposals.length;i++){
          if(this.state.proposals[i].key == child.key){
            let newState = this.state.proposals;
            newState[i] = child;
            this.setState({proposals:newState});
            match = true;
            break;
          }
        }
        if(!match){
          let newState = this.state.proposals;
          newState.push(child);
          this.setState({proposals:newState});
        }
      }.bind(this));
    }.bind(this));
  }

  render(){
    if(this.state.proposals.length>0){
      return(
        <MainScreen followingKeys={this.props.user.val().Following} proposals={this.state.proposals}/>
      );
    }
    return(
      <View>
       <Text>Loading</Text>
      </View>
    );
  }

}
