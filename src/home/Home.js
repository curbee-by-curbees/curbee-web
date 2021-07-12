import { Component } from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

export default class Home extends Component {
  
  render() {
    return (
      <div className="Home">
        <h2>welcome to curbee</h2>
        <h3>login in below</h3>

        <Link to='/auth'>login here!</Link>
      </div>
    );
  }

}