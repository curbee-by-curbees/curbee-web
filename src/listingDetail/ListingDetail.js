import { Component } from 'react';
import { getFind, claimFind } from '../utils/curbee-api';
import './ListingDetail.css';


export default class ListingDetail extends Component {
  state = {
    find: null
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
  }

  handleClaimed = async () => {
    const { find } = this.state;

    try {
      const claimedTask = await claimFind(find.id);
      this.setState({ find: claimedTask });
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
        <div id="claimed" >Claimed</div>
      </div>
    );
  }
}
