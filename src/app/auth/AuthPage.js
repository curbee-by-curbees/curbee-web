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
    this.setState({ username: target.value });
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
            
            <input name="phoneNumber" type="phoneNumber" required={true}
              value={phoneNumber} placeholder="Phone Number" onChange={this.handlePhoneNumberChange} />
          </label>
        </p>
        }

        <p>
          <label>
            
            <input name="username" value={username} required={true}
              placeholder="Username" onChange={this.handleUsernameChange} />
          </label>
        </p>

        <p>
          <label>
            
            <input name="password" type="password" required={true}
              value={password} placeholder="Password" onChange={this.handlePasswordChange} />
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