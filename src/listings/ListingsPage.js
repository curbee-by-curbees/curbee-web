import { Component } from 'react';
import { addFind, getFinds } from '../utils/curbee-api';
import './ListingsPage.css';
import Listing from './Listing';

export default class ListingsPage extends Component {

  state = {
    listings: [],
    showFindForm: false,
    showListings: true,
    title: '',
    url: '',
    latitude: '',
    longitude: '',
    category: '',
    tags: []
  };

  async componentDidMount() {
    const finds = await getFinds();
    this.setState({ listings: finds });
  }

  showFindForm = e => {
    e.preventDefault();
    this.setState({ showFindForm: true });
    this.setState({ showListings: false });
  }

  postFind = async e => {
    e.preventDefault();
    console.log('button clicked');
    const { history } = this.props;
    const { title, url, latitude, longitude, category, tags } = this.state;

    console.log('here', this.state);

    try {
      const newFind = await addFind({
        title,
        url,
        latitude,
        longitude,
        category,
        tags
      });
      history.push(`/api/v1/finds/${newFind.id}`);
    }
    catch (err) {
      console.log('ERROR', err.message);
    }
  }

  handleTitleChange = ({ target }) => {
    this.setState({ title: target.value });
  }

  handleUrlChange = ({ target }) => {
    this.setState({ url: target.value });
  }

  handleLatitudeChange = ({ target }) => {
    this.setState({ latitude: target.value });
  }

  handleLongitudeChange = ({ target }) => {
    this.setState({ longitude: target.value });
  }

  handleCategoryChange = ({ target }) => {
    this.setState({ category: target.value });
  }

  handleTagsChange = ({ target }) => {
    this.setState({ tags: [target.value] });
  }


  render() {
    const { listings, showFindForm, showListings, title, url, latitude, longitude, category, tags } = this.state;

    return (
      <div className="ListingsPage">
        <button className='add-obs-button' hidden={showFindForm} onClick={this.showFindForm} >Add an Observation</button>
        {showFindForm && <form className="add-find-form" onSubmit={this.postFind}>
          <label className="title">
            <input type="text" value={title} title="title" onChange={this.handleTitleChange} placeholder="title"/>
          </label>

          <label className="photos">
            <div className="wrapper-h">
              <input type="text" value={url} title="image url" onChange={this.handleUrlChange} placeholder="image url"/>
              <button>&#x1F4F7;</button>
            </div>
          </label>

          <label className="location">
            <div className="wrapper-h">
              <input className="lat-input" value={latitude} onChange={this.handleLatitudeChange} type="text" title="latitude" placeholder="latitude"/>
              <input className="lng-input" value={longitude} onChange={this.handleLongitudeChange} type="text" title="longitude" placeholder="longitude"/>
              <button>&#x1f4cd;</button>
            </div>
          </label>

          <label className="category">
            <select title="category" value={category} onChange={this.handleCategoryChange} >
              <option>furniture</option>
              <option>furniture</option>
              <option>furniture</option>
              <option>furniture</option>
            </select>
          </label>

          <label className="tags">
            <input title="tags" value={tags} onChange={this.handleTagsChange} type="text" placeholder="tags"/>
          </label>

          <button type="submit">submit find</button>
        </form>}

        {showListings && <ul>
          {listings.map(find => (
            <Listing find={find}/>
          ))}
        </ul>}
      </div>
    );
  }
}
