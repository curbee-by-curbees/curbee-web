import { Component } from 'react';
import { addSpot } from '../utils/curbee-api';
import './Settings.css';

class Settings extends Component {

  state = {
    name: '',
    radius: '',
    latitude: '',
    longitude: '',
    tags: []
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

    }
    catch (err) {
      console.log('ERROR', err.message);
    }
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
    const { name, radius, latitude, longitude, tags } = this.state;

    return (
      <div className="Settings">
        <div>lookout spots:</div>
        <form onSubmit={this.postSpot}>

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

          <p>
            <label>
              <input name="tag" type="text" defaultValue={tags} placeholder="tags" onChange={this.handleTagsChange} />
            </label>
          </p>

          <button type="submit" onSubmit={this.postSpot}>add lookout spot</button>

        </form>

       
        
      </div>
    );
  }

}
 
export default Settings;