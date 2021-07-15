import { Component } from 'react';
import './Footer.css';

class Footer extends Component {
  
  render() { 
    return (
      <footer className="Footer">
        <div className="footer-logo">Curbee, Inc.<br />1 Free Pile Ave<br />Curb, USA 10001</div>
        <div className="footer-description-wrapper">
          <div className="footer-description">Community Free Stuff Alert System<br />
          hello@curbee.app<br />
            <a href="https://www.instagram.com" className="footer-link">Instagram</a>
            <a href="https://twitter.com/" className="footer-link">Twitter</a>
          </div>
        </div>
      </footer>
    );
  }
}
 
export default Footer;
