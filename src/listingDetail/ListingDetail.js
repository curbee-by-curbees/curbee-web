import { Component } from 'react';
import { getFind, claimFind, getLocation } from '../utils/curbee-api';
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
      const location = await getLocation({ latitude: find.latitude, longitude: find.longitude });
      console.log(find);
      this.setState({ find, location,  showButton: !find.isClaimed, showDiv: find.isClaimed });
    }
    catch (err) {
      console.log(err.message);
    }

    fetch(`http://http://localhost:7890/api/v1/finds/${match.params.id}`)
      .then(results => results.json())
      .then(showButton => this.setState({ showButton: showButton }))
      .then(showDiv => this.setState({ showDiv: showDiv }));
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
        <button className="claim" onClick={this.handleClaimed} style={{ visibility: this.state.showButton ? 'visible' : 'hidden' }}>I claimed this find</button>
        <div id="claimed" style={{ visibility: this.state.showDiv ? 'visible' : 'hidden' }}>Claimed</div>
      </div>
    );
  }
}
