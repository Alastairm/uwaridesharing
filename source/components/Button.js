import React, { Component } from 'react';
import { View } from 'react-native';
import Button from 'react-native-button';

export default class Glenn extends Component {
  static defaultProps = {
    backgroundColor: 'black',
    padding:10,
    height:45,
    overflow: 'hidden',
    borderRadius:4,
    fontSize:20
    color:'blue'
  }
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
        containerStyle={{padding:this.props.padding, height:this.props.height, overflow:this.props.overflow,
        borderRadius:this.props.borderRadius, backgroundColor: this.props.backgroundColor}}
        Styles={{fontSize:20, color: 'blue'}}
        onPress={this.props.onPress}>
        {this.props.children}
        </Button>
      </View>
    )
  }
}
