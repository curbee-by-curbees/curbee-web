import { Component } from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

class Header extends Component {


  render() { 
    return (
      <header className="Header">

        <h1>Curbee<span className="red">.</span></h1>
        <Link to="/settings"><img src="setting-gear.png" alt="settings"></img></Link>
        <Link to="/listings">listings</Link>

    
        
      </header>
    );
  }

}
 
export default Header;
