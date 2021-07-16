import { Component } from 'react';
import { getFind, claimFind } from '../utils/curbee-api';
import { Link } from 'react-router-dom';
import './ListingDetail.css';

export default class ListingDetail extends Component {
  state = {
    find: null,
    showButton: true,
    showDiv: false,
    location: null
  }

  async componentDidMount() {
    const { match } = this.props;

    try {
      const find = await getFind(match.params.id);
      console.log(find);
      this.setState({ find, location: find.address, showButton: !find.isClaimed, showDiv: find.isClaimed });
    }
    catch (err) {
      console.log(err.message);
      this.props.history.push('/listings');
    }
  }

  handleClaimed = async () => {
    const { find } = this.state;

    try {
      const claimedFind = await claimFind(find.id);

      this.setState({ 
        find: { ...claimedFind }, 
        showButton: false, 
        showDiv: true 
      });
    }
    catch (err) {
      console.log(err);
    }
  }

  openMap = e => {
    e.preventDefault();
    const { longitude, latitude } = this.state.find;
    const latLng = [latitude, longitude].join(',');

    // open in maps if apple device, otherwise open in google maps
    const notApple = (navigator.platform.indexOf('iPhone') + navigator.platform.indexOf('iPod') + navigator.platform.indexOf('iPad')) === -3;
    if (notApple) window.open(`https://maps.google.com/maps?daddr=${latLng}&amp;ll=`);
    else window.open(`maps://maps.google.com/maps?daddr=${latLng}&amp;ll=`);
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
          { find.isClaimed 
            ? <div id="claimed">this find has been claimed</div>
            : <button className="claim" onClick={this.handleClaimed}>mark as claimed</button>
          }
          <button className="open-maps-button" onClick={this.openMap}>show this finding in a map</button>
        </div>}

        <Link to="/listings" exact={true}>Return to Listings</Link>
      </div>
    );
  }
}
