// @flow

/* eslint react/prop-types: 0 */  // --> OFF
import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import RnButton from 'react-native-button';

export default class Button extends Component {
  static defaultProps = {
    backgroundColor: '#faba12',
    width: 180,
    height: 60,
    overflow: 'hidden',
    borderRadius: 4,
    fontSize: 20,
    color: 'white',
  }
  constructor(props) {
    super(props);
    this.handlePress = this.handlePress.bind(this);
  }
  styles = StyleSheet.create({
    containerStyle: {
      flex: 1,
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      width: this.props.width,
      overflow: this.props.overflow,
      borderRadius: this.props.borderRadius,
      backgroundColor: this.props.backgroundColor,
    },
    style: {
      fontSize: this.props.fontSize,
      color: this.props.color,
    },
    viewStyle: {
      height: this.props.height,
      alignItems: 'center',
    },
  })
  handlePress() {
    this.props.onNext();
  }
  render() {
    return (
      <View style={this.styles.viewStyle}>
        <RnButton
          containerStyle={this.styles.containerStyle}
          style={this.styles.style}
          onPress={this.props.onPress}
        >
          {this.props.children}
        </RnButton>
      </View>
    );
  }
}
