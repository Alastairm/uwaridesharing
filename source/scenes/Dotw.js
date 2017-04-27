
import React, { Component } from 'react';
import { WebView } from 'react-native';
import { Header, Container, Title, Content, Body } from 'native-base';

export default class Dotw extends Component {
  constructor(props) {
    super(props);
    this.state = {
      url: 'www.google.com',
    };
  }
  render() {
    return (
      <Container>
        <Header>
          <Body>
            <Title>Your driver is on their way</Title>
          </Body>
        </Header>

        <Content>
          <WebView
            source={{ uri: 'http://www.google.com' }}
            style={{ marginTop: 20 }}
          />
        </Content>
      </Container>
    );
  }
}
