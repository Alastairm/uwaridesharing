import React, { Component, PropTypes } from 'react';
import { Text, TextInput, View } from 'react-native';

const nameRegex = /[\u0000-\uFFFF]/; // Matches all unicode strings
const emailRegex = /^[-a-z0-9~!$%^&*_=+}{'?]+(\.[-a-z0-9~!$%^&*_=+}{'?]+)*@(student\.|)(uwa\.edu\.au)$/;
const phoneRegex = /04[0-9]{8}$/;

export default class UserInput extends Component {
  static defaultProps = {
    showError: false,
    labels: {
      name: 'NAME',
      email: 'EMAIL',
      phone: 'MOBILE',
    },
    placeholders: {
      name: 'Name',
      email: 'Email',
      phone: 'Mobile',
    },
    keyboardTypes: {
      name: 'default',
      email: 'email-address',
      phone: 'phone-pad',
    },
    errors: {
      name: 'Please enter a valid name',
      email: 'Please enter a valid @student.uwa.edu.au or @uwa.edu.au email',
      phone: 'Please enter a valid Australian mobile number',
    },
    returnKeyTypes: {
      name: 'next',
      email: 'next',
      phone: 'done',
    },
    refs: {
      name: '1',
      email: '2',
      phone: '3',
    },
    finalFields: {
      name: false,
      email: false,
      phone: true,
    },
  };
  static propTypes = {
    field: PropTypes.string.isRequired,
    finalFields: PropTypes.shape({
      name: PropTypes.bool,
      email: PropTypes.bool,
      phone: PropTypes.bool,
    }),
    errors: PropTypes.shape({
      name: PropTypes.string,
      email: PropTypes.string,
      phone: PropTypes.string,
    }),
    labels: PropTypes.shape({
      name: PropTypes.string,
      email: PropTypes.string,
      phone: PropTypes.string,
    }),
    keyboardTypes: PropTypes.shape({
      name: PropTypes.string,
      email: PropTypes.string,
      phone: PropTypes.string,
    }),
    placeholders: PropTypes.shape({
      name: PropTypes.string,
      email: PropTypes.string,
      phone: PropTypes.string,
    }),
    returnKeyTypes: PropTypes.shape({
      name: PropTypes.string,
      email: PropTypes.string,
      phone: PropTypes.string,
    }),
    refs: PropTypes.shape({
      name: PropTypes.string,
      email: PropTypes.string,
      phone: PropTypes.string,
    }),
    onChange: PropTypes.func.isRequired,
    showError: PropTypes.bool,
  };
  constructor(props) {
    super(props);
    this.state = { text: '', valid: false, title: ' ' };
    this.inputProps = this.inputProps.bind(this);
    this.onChange = this.onChange.bind(this);
    this.onFocus = this.onFocus.bind(this);
    this.onBlur = this.onBlur.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }
  onChange(text) {
    const valid = this.validate(text);
    this.props.onChange(this.props.field, valid, text);
    this.setState({ text });
    this.setState({ valid });
  }
  onFocus() {
    if (this.state.valid === true || this.props.showError === false) {
      this.setState({ focused: true });
    }
  }
  onBlur() {
    this.setState({ focused: false });
  }
  onSubmit() {
    this.onBlur();
  }
  validate(text) {
    if (this.props.field === 'name') {
      return nameRegex.test(text);
    } else if (this.props.field === 'email') {
      return emailRegex.test(text);
    } else if (this.props.field === 'phone') {
      return phoneRegex.test(text);
    }
    return null;
  }
  inputProps() {
    const { field, finalFields, returnKeyTypes, labels,
      placeholders, keyboardTypes, errors, refs } = this.props;
    return {
      label: labels[field],
      placeholder: placeholders[field],
      keyboardType: keyboardTypes[field],
      error: errors[field],
      finalField: finalFields[field],
      returnKeyType: returnKeyTypes[field],
      ref: refs[field],
    };
  }
  render() {
    const { label, placeholder, keyboardType, error, returnKeyType, ref } = this.inputProps();
    const focusedLabel = label;
    let unfocusedLabel;
    if (this.props.showError === true && this.state.valid === false) {
      unfocusedLabel = error;
    } else {
      unfocusedLabel = ' ';
    }
    return (
      <View>
        <Text style={{ fontSize: 10 }}>
          {this.state.focused ? focusedLabel : unfocusedLabel}
        </Text>
        <TextInput
          style={{ height: 80 }}
          ref={ref}
          value={this.state.text}
          onChangeText={this.onChange}
          keyboardType={keyboardType}
          placeholder={(this.state.focused ? ' ' : placeholder)}
          onFocus={this.onFocus}
          onBlur={this.onBlur}
          onSubmitEditing={this.onSubmit}
          returnKeyType={returnKeyType}
        />
      </View>
    );
  }
}
