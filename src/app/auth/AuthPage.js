import { Component } from 'react';
import { signUp, login } from '../../utils/curbee-api'; 
import './AuthPage.css';

export default class AuthPage extends Component {
  state = {
    isSignUp: true,
    username: '',
    password: '',
    phoneNumber: '',
    error: ''
  }

  handleSwitch = () => {
    this.setState({ isSignUp: !this.state.isSignUp });
  }

  handleSubmit = async e => {
    const { isSignUp } = this.state;
    const { onUser, history } = this.props;

    e.preventDefault();

    this.setState({ error: '' });

    try {
      const action = isSignUp ? signUp : login;
      const user = await action(this.state);

      onUser(user);

      history.push('/');
    }
    catch (err) {
      this.setState({ error: err.message });
    }
  }

  handleUsernameChange = ({ target }) => {
    this.setState({ name: target.value });
  }

  handlePasswordChange = ({ target }) => {
    this.setState({ password: target.value });
  }

  handlePhoneNumberChange = ({ target }) => {
    this.setState({ phoneNumber: target.value });
  }

  render() {
    const { isSignUp, username, password, phoneNumber, error } = this.state;

    return (
      <form className="AuthPage" onSubmit={this.handleSubmit}>
        {isSignUp && <p>
          <label>
            <span>phone number</span>
            <input name="phoneNumber" type="phoneNumber" required={true}
              value={phoneNumber} onChange={this.handlePhoneNumberChange} />
          </label>
        </p>
        }

        <p>
          <label>
            <span>username</span>
            <input name="name" value={username} required={true}
              onChange={this.handleUsernameChange} />
          </label>
        </p>

        <p>
          <label>
            <span>password</span>
            <input name="password" type="password" required={true}
              value={password} onChange={this.handlePasswordChange} />
          </label>
        </p>




        <p>
          <button type="submit">Sign {isSignUp ? 'Up' : 'In'}</button>
        </p>

        <p>
          <button type="button" className="switch" onClick={this.handleSwitch}>
            {isSignUp
              ? 'Already have an account?'
              : 'Need to create an account?'
            }
          </button>
        </p>
        {error && <p>{error}</p>}
      </form>
    );
  }
}