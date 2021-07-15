import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './Listing.css';

export default class Listing extends Component {

  render() {
    const { find } = this.props;

    console.log(find);

    return (
      <li className="Listing wrapper-h">
        <img src={(find.photos && find.photos[0].photo) || 'http://placekitten.com/200/300'} alt={find.title} />
        <Link className='find-link' to={`/listings/${find.id}`}> {find.title}</Link>
        <span className='city'>({find.city})</span>
      </li>
    );
  }
}
