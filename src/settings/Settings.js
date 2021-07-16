import { Component } from 'react';
import { addSpot } from '../utils/curbee-api';
import './Settings.css';
import './LookoutSpot';
import LookoutSpot from './LookoutSpot';

class Settings extends Component {

  state = {
    name: '',
    radius: '',
    latitude: '',
    longitude: '',
    tags: [],
    lookoutspots: [],
    showLookoutSpot: true,
    showSpotForm: true
  }

  postSpot = async e => {
    e.preventDefault();

    const { name, radius, latitude, longitude, tags } = this.state;
    console.log(window.localStorage.getItem('USERID'));

    try {
      const newSpot = await addSpot({
        name,
        radius,
        latitude,
        longitude,
        tags,
        userId: window.localStorage.getItem('USERID')
      });
      console.log(newSpot);
      this.setState({ lookoutspots: [...this.state.lookoutspots, newSpot] });
    }
    catch (err) {
      console.log('ERROR', err.message);
    }
  }

  askLocation = e => {
    e.preventDefault();
    navigator.geolocation.getCurrentPosition(pos => {
      this.setState({ latitude: pos.coords.latitude, longitude: pos.coords.longitude });
    });
  }

  handleNameChange = ({ target }) => {
    this.setState({ name: target.value });
  }

  handleRadiusChange = ({ target }) => {
    this.setState({ radius: target.value });
  }

  handleLatitudeChange = ({ target }) => {
    this.setState({ latitude: target.value });
  }

  handleLongitudeChange = ({ target }) => {
    this.setState({ longitude: target.value });
  }

  handleTagsChange = ({ target }) => {
    this.setState({ tags: [target.value] });
  }

  render() { 
    const { name, radius, latitude, longitude, tags, lookoutspots, showLookoutSpot, showSpotForm } = this.state;

    return (
      <div className="Settings">
        
        {showSpotForm && <form>

          <p>
            <label>
              <input name="name" type="text" defaultValue={name} placeholder="“Home”, “Work”, etc." onChange={this.handleNameChange} />
            </label>
          </p>

          <p>
            <label>
              <input name="radius" type="text" defaultValue={radius} placeholder="radius" onChange={this.handleRadiusChange} />
            </label>
          </p>

          <p>
            <label>
              <input name="latitude" type="text" defaultValue={latitude} placeholder="latitude" onChange={this.handleLatitudeChange} />
            </label>
          </p>

          <p>
            <label>
              <input name="longitude" type="text" defaultValue={longitude} placeholder="longitude" onChange={this.handleLongitudeChange} />
            </label>
          </p>
          <button onClick={this.askLocation}>Find Your Location</button>

          <p>
            <label>
              <input name="tag" type="text" defaultValue={tags} placeholder="tags" onChange={this.handleTagsChange} />
            </label>
          </p>

          <button type="submit" onClick={this.postSpot}>Add Lookout Spot</button>

        </form>}

        {showLookoutSpot && <ul>
          {lookoutspots.map(spot => (
            <LookoutSpot key={spot.id} spot={spot}/>
          ))}
        </ul>}
        
      </div>
    );
  }

}
 
export default Settings;