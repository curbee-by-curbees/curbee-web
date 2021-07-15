import { Component } from 'react';
import { Link } from 'react-router-dom';
import './Header.css';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown';

class Header extends Component {


  render() { 
    return (
      <header className="Header">
        <div></div>
        <div className="logo-div">
          <h1>Curbee<span className="red">.</span></h1>
        </div>
        {/* <div className='nav-div'>
          <Link to="/settings">Settings</Link>
          <Link to="/listings">Listings</Link>
        </div> */}
        <div className='dropdown-div'>
          <DropdownButton align="end" id="dropdown-button" title="•••">
            <Dropdown.Item className='dropdown-item listings' href="/listings">Listings</Dropdown.Item>
            <Dropdown.Item className='dropdown-item' href="/settings">Settings</Dropdown.Item>
          </DropdownButton>
        </div>
      </header>
    );
  }
}
 
export default Header;
