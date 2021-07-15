import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './Listing.css';

export default class Listing extends Component {

  render() {
    const { find } = this.props;

    return (
      <li className="Listing wrapper-h">
        <img src={(find.photos && find.photos[0]) || 'https:placekitten.com/300/300'} alt={find.title} />
        <Link className='find-link' to={`/listings/${find.id}`}> {find.title}</Link>
        <span className='city'>({find.city})</span>
      </li>
    );
  }
}
