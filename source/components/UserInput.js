import React, { Component, PropTypes } from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';


export default class UserInput extends Component {
  static defaultProps = {
    showError: false,
    labels: {
      name: "NAME",
      email: "EMAIL",
      phone: "MOBILE",
    },
    placeholders: {
      name: "Name",
      email: "Email",
      phone: "Mobile",
    },
    keyboardTypes: {
      name: "default",
      email: "email-address",
      phone: "phone-pad",
    },
    errors: {
      name: "Please enter a valid name",
      email: "Please enter a valid @student.uwa.edu.au or @uwa.edu.au email",
      phone: "Please enter a valid Australian mobile number"
    }
  };
  static PropTypes = {
    field: PropTypes.string.isRequired,
  };
  constructor(props) {
    super(props);
    this.state = {text: "", valid: false, title: " ", };
    this.inputProps = this.inputProps.bind(this);
    this.onChange = this.onChange.bind(this);
    this.onFocus = this.onFocus.bind(this);
    this.onBlur = this.onBlur.bind(this);
  }
  inputProps() {
    const { field, labels, placeholders, keyboardTypes, errors } = this.props;
    return {
      label: labels[field],
      placeholder: placeholders[field],
      keyboardType: keyboardTypes[field],
      error: errors[field]
    }
  }
  onChange(text) {
    this.setState({text: text});
    this.validate(text);
    this.props.onChange(this.props.field, this.state.valid, text);
  }
  validate(text) {
    if (this.props.field == "name") {
      this.setState({valid: (nameRegex.test(text) ? true: false)})
    }else if (this.props.field == "email") {
      this.setState({valid: (emailRegex.test(text) ? true: false)})
    }else if (this.props.field == "phone") {
      this.setState({valid: (phoneRegex.test(text) ? true: false)})
    }
  }
  onFocus() {
    const { label, placeholder, keyboardType, error } = this.inputProps();
    this.setState({focused: true});
  }
  onBlur() {
    this.setState({focused: false});
  }
  render() {
    const { label, placeholder, keyboardType, error } = this.inputProps();
    var focusedLabel = label;
    var unfocusedLabel;
    if ( this.props.showError == true && this.state.valid == false) {
      unfocusedLabel = error;
    } else {
      unfocusedLabel = " ";
    }
    return (
      <View>
        <Text style={{fontSize: 10}}>
          {this.state.focused ? focusedLabel: unfocusedLabel}
        </Text>
        <TextInput
          value={this.state.text}
          onChangeText={this.onChange}
          keyboardType={keyboardType}
          placeholder={(this.state.focused ? " ": placeholder)}
          onFocus={this.onFocus}
          onBlur={this.onBlur}
        />
      </View>
    );
  }
}

const nameRegex = re = /[\u0000-\uFFFF]/; //Matches all unicode strings
const emailRegex = re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@(uwa.edu.au|student.uwa.edu.au)$/;
const phoneRegex = re = /04([0-9]{7})/;
