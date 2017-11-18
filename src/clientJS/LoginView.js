import React, { Component } from "react";
import { Container, Header, Content, Button, Text } from "native-base";
import { AppRegistry, Image } from "react-native";

export default class LoginView extends Component {
  render() {
    let openImg = {
      uri:
        "https://d24wuq6o951i2g.cloudfront.net/img/events/id/282/2826921/assets/76d.FDC_Logo-Stacked-2-colour-for-white-bg.png"
    };
    return (
      <Container>
        <Header />
        <Content>
          <Image source={openImg} style={{ width: 300, height: 250 }} />
        </Content>
      </Container>
    );
  }
}
