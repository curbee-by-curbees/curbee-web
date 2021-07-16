import { Component } from 'react';
import { signUp, login } from '../utils/curbee-api'; 
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
    e.preventDefault();

    const { isSignUp } = this.state;
    const { history } = this.props;

    this.setState({ error: '' });

    try {
      const action = isSignUp ? signUp : login;
      const user = await action(this.state);

      // set the TOKEN and USERID in our local storage
      window.localStorage.setItem('TOKEN', user.token);
      window.localStorage.setItem('USERID', user.id);

      history.push('/listings');
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
            
            <input name="phoneNumber" type="tel" required={true}
              value={phoneNumber} placeholder="Phone Number" onChange={this.handlePhoneNumberChange} />
          </label>
        </p>}

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
          <button type="submit" className="submit">Sign {isSignUp ? 'Up' : 'In'}</button>
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