import { Component } from 'react';
import { Link } from 'react-router-dom';
import { getFind, getLocation } from '../utils/curbee-api';
import './ListingDetail.css';


export default class ListingDetail extends Component {
  state = {
    find: null,
    location: null
  }

  async componentDidMount() {
    const { match } = this.props;
    try {
      const find = await getFind(match.params.id);
      const location = await getLocation({ latitude: find.latitude, longitude: find.longitude });
      this.setState({ find: find, location:location });
    }
    catch (err) {
      console.log(err.message);
    }
  }

  render() {
    const { find, location } = this.state;

    return (
      <div className="ListingDetail">
        {find && <div>
          <h2>{find.title}</h2>
          <img src={find.photos && find.photos[0] && find.photos[0].photo} alt={find.title}/>
          <div>Street: {location.street}</div>
          <div>City: {location.city}</div>
          <div>State: {location.state}</div>
          <div>Category: {find.category}</div>
          <div>Tags: {find.tags}</div>
          <a href={'https://www.openstreetmap.org/#map=18/' + find.latitude + '/' + find.longitude}>Map</a><br/>
          <Link to="/listings" exact={true}>Return to Listings</Link>
        </div>}
      </div>
    );
  }
}
