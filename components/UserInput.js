import React, { Component, Proptypes } from 'react';
import { StyleSheet, Text, TextInput } from 'react-native';

const styles = StyleSheet.create({
  invalid: {
    borderRadius: 5,
    borderColor: 'red',
  },
  valid: {
    borderRadius: 1,
    borderColor: 'black'
  }
})

class UserInput extends Component {
  constructor(props) {
    super(props);
    this.state = {text: "", style:{}}
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
    this.setState({text});
    this.validate();
    this.props.onChange(this.props.field, text);
  }
  validate() {
    // if (this.state.field == "email") {
      if (!emailRegex.test(this.state.text)) {
        this.setState({invalid: true});
      }
    // }
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
// UserInput.propTypes = {
//   field: Proptypes.string,
//   onChange: Proptypes.func,
// }
UserInput.defaultProps = {
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
}

export default UserInput;

  const emailRegex = re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@(uwa.edu.au|student.uwa.edu.au)$/;
