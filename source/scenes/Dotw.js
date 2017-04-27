// temporry solution for the demo, just in case we do not finish
import React, { Component } from 'react';
import { WebView } from 'react-native';
import { Header, Container, Title, Content, Body } from 'native-base';

export default class Dotw extends Component {
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
