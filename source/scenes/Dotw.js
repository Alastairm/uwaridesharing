
import React, { Component } from 'react';
import { AsyncStorage, Text, WebView } from 'react-native';
import * as firebase from 'firebase';

export default class Dotw extends Component {
  constructor(props) {
    super(props);
    this.state = {
      trackingReady: false,
      trackingLink: null,
      title: 'booking your ride',
    };
    this.componentDidMount = this.componentDidMount.bind(this);
  }
  async componentDidMount() {
    const uid = await AsyncStorage.getItem('user.uid');
    const ref = await firebase.database().ref(`users/${uid}/`);
    ref.once('child_added').then((event) => {
      const tracking = event.val().tracking;
      this.setState({ trackingLink: tracking });
      this.setState({ trackingReady: true });
      this.setState({ title: 'What should title be' });
    });
  }
  render() {
    const trackingPage = (<WebView
      source={{ uri: this.state.trackingLink }}
      style={{ marginTop: 20 }}
    />);
    const placeHolder = <Text> Waiting... </Text>;
    const content = this.state.trackingReady ? trackingPage : placeHolder;

    return (
      content
    );
  }
}
