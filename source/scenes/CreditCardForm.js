import React, { Component } from 'react';
import { AsyncStorage, StyleSheet, Text, View } from 'react-native';
import { CreditCardInput } from "react-native-credit-card-input";

secret = "sk_test_jKEt5KSdxsDccE0kqZwpJrwN"; // not sure if wise in production
publishable = 'pk_test_ZyA7ct7H5STJYWjMUbOGTOHS'

export default class CreditCardForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      form: "",
    };
    this.onChange = this.onChange.bind(this);
  }
  async onChange(form) {
    this.setState({form: form})
    if (form.valid == true) {
      let number = form.values.number.replace(/ /g,'');
      number = number;
      let expiry = form.values.expiry.split("/");
      exp_month = expiry[0];
      exp_year = expiry[1];
      cvc = form.values.cvc

      var source = {
        "source[object]": 'card',
        "source[number]": number,
        "source[exp_month]": exp_month,
        "source[exp_year]": exp_year,
        "source[cvc]": cvc
      }

      var reqBody = [];
      for (var property in source) {
        var encodedKey = encodeURIComponent(property);
        var encodedValue = encodeURIComponent(source[property]);
        reqBody.push(encodedKey + "=" + encodedValue);
      }
      reqBody = reqBody.join("&");

      try {
        let response = await fetch('https://api.stripe.com/v1/customers', {
          method: 'POST',
          headers: {
            'Accept': '*/*',
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': 'Bearer '+ secret
          },
          body: reqBody
        })
        // this.setState({Response: response})
        var responseJson = await response.json();
        this.setState({ResponseJson: responseJson})
      } catch(error) {
        this.setState({ResponseError: error})
      }
      await AsyncStorage.setItem('user.stripe.id', responseJson.id);
    }
  }
  render() {
    return (
      <View>
        <CreditCardInput
          focues={this.state.focused}
          onChange={this.onChange}
        />
        <Text>
          {JSON.stringify(this.state)}
        </Text>
      </View>
    )
  }
}
