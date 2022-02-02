import React from 'react';
import Userfront from '@userfront/core';

// Initialize Userfront Core JS
Userfront.init('demo1234');

// Define the Password reset form component
export default class PasswordResetForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      passwordVerify: '',
      alertMessage: '',
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.setAlertMessage = this.setAlertMessage.bind(this);
    this.handleEmailVerification = this.handleEmailVerification.bind(this);
  }

  // Whenever an input changes value, change the corresponding state variable
  handleInputChange(event) {
    event.preventDefault();
    const target = event.target;
    this.setState({
      [target.name]: target.value,
    });
  }

  handleSubmit(event) {
    event.preventDefault();

    // Reset the alert to empty
    this.setAlertMessage();

    // Verify that the passwords match
    if (this.state.password !== this.state.passwordVerify) {
      return this.setAlertMessage('Passwords must match');
    }

    // Call Userfront.resetPassword()
    Userfront.resetPassword({
      password: this.state.password,
    }).catch(error => {
      this.setAlertMessage(error.message);
    });
  }

  setAlertMessage(message) {
    this.setState({ alertMessage: message });
  }

  handleEmailVerification() {
    Userfront.init('demo1234');

    Userfront.sendResetLink(this.state.email);
  }

  render() {
    return (
      <div className='h-screen my-[10%]'>
        <Alert message={this.state.alertMessage} />
        <form onSubmit={this.handleSubmit}>
          <label>
            Email
            <input
              name='email'
              type='email'
              value={this.state.email}
              onChange={this.handleInputChange}
            />
          </label>
          <label>
            Password
            <input
              name='password'
              type='password'
              value={this.state.password}
              onChange={this.handleInputChange}
            />
          </label>
          <label>
            Re-type password
            <input
              name='passwordVerify'
              type='password'
              value={this.state.passwordVerify}
              onChange={this.handleInputChange}
            />
          </label>
          <button onClick={this.handleEmailVerification}>Send email verification</button>
          <button type='submit'>Reset password</button>
        </form>
      </div>
    );
  }
}

// Define the alert component
class Alert extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    if (!this.props.message) return '';
    return <div id='alert'>{this.props.message}</div>;
  }
}
