import { Component } from 'react';
import { addFind, addPhoto, alertAboutFind, getNearby } from '../utils/curbee-api.js';
import './ListingsPage.css';
import Listing from './Listing';

export default class ListingsPage extends Component {

  state = {
    listings: [],
    showFindForm: false,
    showListings: true,
    title: '',
    url: '',
    photos: [],
    latitude: '',
    longitude: '',
    category: '',
    tags: []
  };

  async componentDidMount() {
    navigator.geolocation.getCurrentPosition(this.getListings);
  }

  getListings = async pos => {
    const { latitude, longitude } = pos.coords;

    const finds = await getNearby({
      latitude: latitude || 45.5051,
      longitude: longitude || -122.6750,
      radius: 10
    });

    this.setState({ listings: finds });
  }

  showWidget = () => {
    // add the cloudinary widget
    let widget = window.cloudinary.createUploadWidget(
      {
        cloudName: 'curbeecloud',
        uploadPreset: 'curbee-by-curbeez',
        public_id: `curbee${Math.floor(Math.random() * 100)}`
      },
      async (error, result) => {
        if (!error && result && result.event === 'success') {
          console.log('Done! Here is the image info: ', result.info);
          this.setState({ url: result.info.secure_url });
          this.setState({ photos: [...this.state.photos, result.info] });
        }
      }
    );

    widget.open();
  }

  showFindForm = e => {
    e.preventDefault();
    this.setState({ showFindForm: true });
    this.setState({ showListings: false });
  }

  postFind = async e => {
    e.preventDefault();
    
    const { history } = this.props;
    const { title, photos, latitude, longitude, category, tags } = this.state;

    try {
      // post find
      const newFind = await addFind({
        title,
        latitude,
        longitude,
        category,
        tags,
        isClaimed: false,
        userId: window.localStorage.getItem('USERID')
      });
      
      // post photos
      photos.forEach(async info => {
        await addPhoto({
          photo: info.secure_url,
          findId: newFind.id,
          userId: window.localStorage.getItem('USERID')
        });
      });

      // alert nearby phones of find
      await alertAboutFind(newFind.id);

      // redirect to that find's page
      history.push(`/listings/${newFind.id}`);
    }
    catch (err) {
      console.log('ERROR', err.message);
    }
  }

  handleChange = e => {
    const obj = {};
    obj[e.target.name] = e.target.value;
    this.setState(obj);
  }

  handleTagsChange = ({ target }) => {
    this.setState({ tags: [target.value] });
  }

  askLocation = e => {
    navigator.geolocation.getCurrentPosition(pos => {
      this.setState({ latitude: pos.coords.latitude, longitude: pos.coords.longitude });
    });
  }

  render() {
    const { listings, showFindForm, showListings, title, url, latitude, longitude, category, tags } = this.state;

    return (
      <div className="ListingsPage">
        <button className='add-obs-button' hidden={showFindForm} onClick={this.showFindForm} >Add a Find</button>
        {showFindForm && <form className="add-find-form" onSubmit={e => e.preventDefault()}>
          <label className="title">Title:
            <input type="text" value={title} name="title" title="title" onChange={this.handleChange} placeholder="title"/>
          </label>

          <label className="photos">Photo URL:
            <div className="wrapper-h">
              <input type="text" value={url} name="url" title="image url" onChange={this.handleChange} placeholder="image url"/>
              <button id="upload_widget" className="image-upload-btn" onClick={this.showWidget}>Upload</button>
            </div>
          </label>

          <label className="location">Location:
            <div className="wrapper-h">
              <input className="lat-input" name="latitude" value={latitude} onChange={this.handleChange} type="text" title="latitude" placeholder="latitude"/>
              <input className="lng-input" name="longitude" value={longitude} onChange={this.handleChange} type="text" title="longitude" placeholder="longitude"/>
              <button onClick={this.askLocation} className="loc-btn">Find Your Location</button>
            </div>
          </label>

          <label className="category">Listing Category:
            <select title="category" name="category" value={category} onChange={this.handleChange}>
              <option value="art">art</option>
              <option value="auto">auto</option>
              <option value="books">books</option>
              <option value="electronics">electronics</option>
              <option value="furniture">furniture</option>
              <option value="garden">garden</option>
              <option value="household">household</option>
              <option value="kitchen">kitchen</option>
              <option value="outdoors">outdoors</option>
              <option value="sporting">sporting</option>
              <option value="toys">toys</option>
              <option value="misc">misc</option>
            </select>
          </label>

          <label className="tags">Tags:
            <input title="tags" value={tags} onChange={this.handleTagsChange} type="text" placeholder="tags"/>
          </label>

          <button className="sub-btn" type="submit" onClick={this.postFind}>Submit</button>
        </form>}

        {showListings && <ul>
          {listings.map(find => (
            <Listing key={find.id} find={find}/>
          ))}
        </ul>}
      </div>
    );
  }
}
