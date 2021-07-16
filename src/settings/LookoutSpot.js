import React, { Component } from 'react';
import './LookoutSpot.css';

export default class LookoutSpot extends Component {

  render() {
    const { spot } = this.props;

    return (
      <li className="LookoutSpot wrapper-h">
        <span className='lookout-name'>{spot.name}</span>
        <span className='lookout-city'>{spot.city}</span>
        <span className='lookout-tags'>{spot.tags}</span>
      </li>
    );
  }
}