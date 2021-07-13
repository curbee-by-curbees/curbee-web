import { Component } from 'react';
import './ListingsPage.css';
import Listing from './Listing';

export default class ListingsPage extends Component {

  state = {
    listings: [
      {
        title: 'crow water',
        photos: ['https://placekitten.com/300/200'],
        city: 'Orange',
        category: 'water',
        tags: ['crows', 'nature'],
        createdAt: '2016-01-25 10:10:10.555555-05:00',
      }
    ],
    showFindForm: false
  }

  showFindForm = e => {
    e.preventDefault();
    this.setState({ showFindForm: true });
  }

  render() {
    const { listings, showFindForm } = this.state;

    return (
      <div className="ListingsPage">
        <button hidden={showFindForm} onClick={this.showFindForm}>add my observation</button>
        {showFindForm && <form className="add-find-form">
          <label class="title">
            <input type="text" title="title" placeholder="title"/>
          </label>

          <label class="photos">
            <div class="wrapper-h">
              <input type="text" title="image url" placeholder="image url"/>
              <button>&#x1F4F7;</button>
            </div>
          </label>

          <label class="location">
            <div class="wrapper-h">
              <input class="lat-input" type="text" title="latitude" placeholder="latitude"/>
              <input class="lng-input" type="text" title="longitude" placeholder="longitude"/>
              <button>&#x1f4cd;</button>
            </div>
          </label>

          <label class="category">
            <select title="category">
              <option>beans</option>
            </select>
          </label>

          <label class="tags">
            <input title="tags" type="text" placeholder="tags"/>
          </label>

          <button type="submit">submit find</button>
        </form>}

        <ul>
          {listings.map(find => (
            <Listing find={find}/>
          ))}
        </ul>
      </div>
    );
  }
}
