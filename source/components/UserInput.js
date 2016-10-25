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
    },
    returnKeyTypes: {
      name: "next",
      email: "next",
      phone: "done",
    },
    finalFields: {
      name: false,
      email: false,
      phone: true
    },
    showError: false
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
    this.onSubmit = this.onSubmit.bind(this);
  }
  inputProps() {
    const { field, finalFields, returnKeyTypes, labels, placeholders, keyboardTypes, errors } = this.props;
    return {
      label: labels[field],
      placeholder: placeholders[field],
      keyboardType: keyboardTypes[field],
      error: errors[field],
      finalField: finalFields[field],
      returnKeyType: returnKeyTypes[field]
    }
  }
  onChange(text) {
    let valid = this.validate(text);
    this.props.onChange(this.props.field, valid, text);
    this.setState({text: text});
    this.setState({valid: valid});
  }
  validate(text) {
    if (this.props.field == "name") {
      return (nameRegex.test(text) ? true: false);
    }else if (this.props.field == "email") {
      return (emailRegex.test(text) ? true: false);
    }else if (this.props.field == "phone") {
      return (phoneRegex.test(text) ? true: false);
    }
  }
  onFocus() {
    if( this.state.valid == true || this.props.showError == false){
      this.setState({focused: true});
    }
  }
  onBlur() {
    this.setState({focused: false});
  }
  onSubmit() {
    this.onBlur();
  }
  render() {
    const { label, placeholder, keyboardType, error, returnKeyType } = this.inputProps();
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
          ref = {this.props.ref}
          value={this.state.text}
          onChangeText={this.onChange}
          keyboardType={keyboardType}
          placeholder={(this.state.focused ? " ": placeholder)}
          onFocus={this.onFocus}
          onBlur={this.onBlur}
          onSubmitEditing={this.onSubmit}
          returnKeyType={returnKeyType}
        />
      </View>
    );
  }
}

const nameRegex = re = /[\u0000-\uFFFF]/; //Matches all unicode strings
const emailRegex = re = /^[-a-z0-9~!$%^&*_=+}{\'?]+(\.[-a-z0-9~!$%^&*_=+}{\'?]+)*@(student\.|)(uwa\.edu\.au)$/
const phoneRegex = re = /04[0-9]{8}$/;
