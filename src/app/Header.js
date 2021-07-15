import { Component } from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

class Header extends Component {


  render() { 
    return (
      <header className="Header">
        <div>
          <h1>Curbee<span className="red">.</span></h1>
          <Link to="/settings">settings</Link>
          <Link to="/listings">listings</Link>
        </div>
      </header>
    );
  }
}
 
export default Header;
