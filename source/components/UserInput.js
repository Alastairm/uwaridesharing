import React, { Component, PropTypes } from 'react';
import { StyleSheet, Text, TextInput } from 'react-native';

const styles = StyleSheet.create({
  valid: {
    backgroundColor: '#ffffff',
  },
  invalid: {
    backgroundColor: '#ff0000',
  },
})

export default class UserInput extends Component {
  static defaultProps = {
    labels: {
      name: "NAME",
      email: "EMAIL",
      phone: "MOBILE",
    },
    placeholders: {
      name: "Your Name",
      email: "example@uwa.edu.au",
      phone: "04 1234 5678",
    },
    keyboardTypes: {
      name: "default",
      email: "email-address",
      phone: "phone-pad",
    }
  };
  static PropTypes = {
    field: PropTypes.string.isRequired,
  };
  constructor(props) {
    super(props);
    this.state = {text: "", valid: true};
    this.inputProps = this.inputProps.bind(this);
    this.onChange = this.onChange.bind(this)
  }
  inputProps() {
    const { field, labels, placeholders, keyboardTypes } = this.props;
    return {
      label: labels[field],
      placeholder: placeholders[field],
      keyboardType: keyboardTypes[field],
    }
  }
  onChange(text) {
    this.setState({text: text});
    this.validate(text);
    this.props.onChange(this.props.field, text);
  }
  validate(text) {
     if (this.props.field == "email") {
      if (emailRegex.test(text)==true) {
        this.setState({valid: true});
      } else {
        this.setState({valid: false})
      }
     }
  }
  render() {
    const { label, placeholder, keyboardType, onChange } = this.inputProps();
    return (
      <TextInput
        style = {this.state.valid ? styles.valid: styles.invalid}
        value={this.state.text}
        onChangeText={this.onChange}
        keyboardType={keyboardType}
        placeholder={placeholder}
      />
    );
  }
}


const emailRegex = re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@(uwa.edu.au|student.uwa.edu.au)$/;
