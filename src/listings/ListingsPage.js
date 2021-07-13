import { Component } from 'react';
import './ListingsPage.css';

export default class ListingsPage extends Component {

  state = {
    listings: []
  }

  render() {
    const { listings } = this.state;

    return (
      <div className="ListingsPage">
        <button>add my observation</button>

        <ul>
          {listings.map(find => {
        
          })}
        </ul>
      </div>
    );
  }
}
