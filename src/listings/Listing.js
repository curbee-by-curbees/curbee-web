import { Component } from 'react';
import { Link } from 'react-router-dom';
import './Listing.css';

export default class Listing extends Component {

  render() {
    const { find } = this.props;

    return (
      <li className="Listing">
        <img src={find.photos[0]} alt={find.title}/>
        <Link to={`/listings/${find.id}`}>{find.title}</Link>
        <span>({find.city})</span>
      </li>
    );
  }
}
