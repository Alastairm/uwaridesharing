import React, { Component } from 'react';
import { View } from 'react-native';
import Button from 'react-native-button';

export default class Glenn extends Component {
  static defaultProps = {
    backgroundColor: '#faba12',
    width:60,
    height:70,
    overflow: 'hidden',
    borderRadius:4,
    fontSize:20,
    color: 'white'
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
        containerStyle={{width:this.props.width, height:this.props.height, overflow:this.props.overflow,
        borderRadius:this.props.borderRadius, backgroundColor: this.props.backgroundColor}}
        style={{fontSize:this.props.fontSize, color: this.props.color }}
        onPress={this.props.onPress}>
        {this.props.children}
        </Button>
      </View>
    )
  }
}
