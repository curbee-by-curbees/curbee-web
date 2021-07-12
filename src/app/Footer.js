import { Component } from 'react';
import './Footer.css';

class Footer extends Component {
  
  render() { 
    return (
      <footer className="Footer">
        <div className="footer-logo">Curbee<span className='red'>.</span></div>
        <div className="footer-description">Community Free Stuff Alert System<br />
          hello@curbee.com<br />
          <a className="footer-link">Instagram</a>
          <a className="footer-link">Twitter</a>
        </div>
      </footer>
    );
  }
}
 
export default Footer;