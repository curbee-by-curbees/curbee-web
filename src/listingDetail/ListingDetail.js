import { Component } from 'react';
import { getFind, claimFind } from '../utils/curbee-api';
import './ListingDetail.css';


export default class ListingDetail extends Component {
  state = {
    find: null,
    showButton: true,
    showDiv: false
  }

  async componentDidMount() {

    const { match } = this.props;

    try {
      const find = await getFind(match.params.id);
      this.setState({ find: find });
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
    const { find } = this.state;

    return (
      <div className="ListingDetail">
        {find && <div>
          <h2>{find.title}</h2>
          <img src={find.photos && find.photos[0] && find.photos[0].photo} alt={find.title}/>
          <span>{find.city}</span>
          <span>{find.category}</span>
          <span>{find.tags}</span>
        </div>}
        <button className="claim" onClick={this.handleClaimed} style={{ visibility: this.state.showButton ? 'visible' : 'hidden' }}>I claimed this find</button>
        <div id="claimed" style={{ visibility: this.state.showDiv ? 'visible' : 'hidden' }}>Claimed</div>
      </div>
    );
  }
}
