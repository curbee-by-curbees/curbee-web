import { Component } from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

export default class Home extends Component {
  
  render() {
    return (
      <div className="Home">
        <h2>Welcome!</h2>
        

        <Link to='/auth'>Log In or Sign Up</Link>
      </div>
    );
  }

}