import { Component } from 'react';
import './Listing.css';

export default class Listing extends Component {

  /*
  title
  photos
  lat-lng --> address
  category
  tags
  */

  render() {
    const { find } = this.props;

    return (
      <li className="Listing">
        <img src={find.photos[0]}/>
        <a href="">{find.title}</a>
      </li>
    )
  }
}
