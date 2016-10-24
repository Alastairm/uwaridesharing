import React, { Component } from 'react';
import { View } from 'react-native';
import Button from 'react-native-button';

export default class Glenn extends Component {
  constructor(props) {
    super(props);
    this.handlePress = this.handlePress.bind(this);
  }
  handlePress() {
    this.props.onNext();
  }
  render(){
    return (
      <View>
        <Button
        containerStyle={{padding:10, height:45, overflow:'hidden',
        borderRadius:4, backgroundColor:'black'}}
        Styles={{fontSize:20, color: 'blue'}}
        onPress={this.props.onPress}>
        {this.props.children}
        </Button>
      </View>
    )
  }
}
