import { Component } from 'react';
import { getFind } from '../utils/curbee-api';
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

  
  render() {
    const { find } = this.state;

    return (
      <div className="ListingDetail">
        {find && <div>
          <h2>{find.title}</h2>
          <img src={find.photos[0].photo} alt={find.title}/>
          <span>{find.city}</span>
          <span>{find.category}</span>
          <span>{find.tags}</span>
        </div>}
      </div>
    );
  }
}
