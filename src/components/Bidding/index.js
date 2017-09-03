import React, { Component, PropTypes } from 'react';
import get from 'lodash/get';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import { postBid } from './../../actions/biddingActions';
import Auth from '../../api/auth';
import { logoutSuccess } from './../../actions/loginActions';

class Bidding extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      loading: true,
      myBid: '',
      objectId: 0,
    };
    this.updateMainItem = this.updateMainItem.bind(this);
    this.validateSubmit = this.validateSubmit.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.galleryItems && nextProps.biddingItems &&
      (this.props.galleryItems !== nextProps.galleryItems || this.props.biddingItems !== nextProps.biddingItems)) {
      if (nextProps.galleryItems.length > 0) {
        const item = this.state.objectId === 0 ? nextProps.galleryItems[0] :
          nextProps.galleryItems.find(x => get(x, 'id') === this.state.objectId);
        const bidWinner = nextProps.biddingItems.find(x => get(x, 'object_id') === item.id);
        const bidWinnerName = bidWinner ? bidWinner.name : '';
        const price = bidWinner ? bidWinner.price : '';
        const bidId = bidWinner ? bidWinner.id : '';
        const state = Object.assign({}, this.state, { myBid: '', url: item.url, objectId: item.id, basePrice: item.base_price, bidWinnerName, price, bidId, loading: false });
        this.setState(state);
      }
    }
  }

  updateMainItem(item) {
    const bidWinner = this.props.biddingItems.find(x => get(x, 'object_id') === item.id);
    const bidWinnerName = bidWinner ? bidWinner.name : '';
    const price = bidWinner ? bidWinner.price : '';
    const bidId = bidWinner ? bidWinner.id : '';
    const state = Object.assign({}, this.state, { objectId: item.id, url: item.url, basePrice: item.base_price, bidWinnerName, price, bidId });
    this.setState(state);
  }


  handleChange(e) {
    const paramName = e.target.id;
    const paramValue = e.target.value;
    const currentState = this.state;
    currentState[paramName] = paramValue;
    this.setState(currentState);
  }

  handleKeyPress(e) {
    if (e.charCode === 13) {
      this.validateSubmit();
    }
  }

  validateSubmit() {
    event.preventDefault();
    this.setState({ loading: true });
    if (this.state.basePrice < this.state.myBid && this.state.price < this.state.myBid) {
      this.props.postBidding(this.state.objectId, this.state.myBid, this.state.bidId);
      this.setState({ loading: false });
    } else {
      this.setState({ loading: false });
      alert('Please enter valid value');
    }
  }

  render() {
    if (this.state.loading === true) {
      return <div className="container" />;
    }
    return (
      <div className="container">
        <div className="main-content">
          <div className="bid-container panel">
            <div className="img-thumbnails">
              <ul className="list-unstyled">
                {
                  this.props.galleryItems.map(item =>
                    <li>
                      <a onClick={() => this.updateMainItem(item)} className="galleryCont">
                        <div className="img-thumb thumbnail" style={{ backgroundImage: `url('/images/gallery/${item.url}')` }} />
                        <span className="bid">{item.price}</span>
                        <span className="ownerName">{item.owner}</span>
                      </a>
                    </li>
                  )
                }
              </ul>
            </div>
            <div className="details-container">
              <div className="img-preview">
                <img className="thumbnail" src={`/images/gallery/${this.state.url}`} alt="img" />
              </div>
              <div className="row">
                <div className="col-sm-6">
                  <label htmlFor="curent-bid">Base Price:</label>
                </div>
                <div className="col-sm-6">
                  <span id="curent-bid">{this.state.basePrice}</span>
                </div>
              </div>
              <div className="row">
                <div className="col-sm-6">
                  <label htmlFor="curent-bid">Current Bid:</label>
                </div>
                <div className="col-sm-6">
                  <span id="curent-bid">{this.state.price === '' ? 'Not Yet' : this.state.price }</span>
                </div>
              </div>
              <div className="row">
                <div className="col-sm-6">
                  <label htmlFor="User Name">User Name:</label>
                </div>
                <div className="col-sm-6">
                  <span id="User Name">{this.state.bidWinnerName === '' ? 'Not Yet' : this.state.bidWinnerName}</span>
                </div>
              </div>
              <div className="row alignRow">
                <div className="col-sm-6"><label htmlFor="my-bid" className="myBidLbl">My bid:</label></div>
                <div className="col-sm-3">
                  <input type="text" className="form-control" id="myBid" placeholder="INR" value={this.state.myBid} onChange={e => this.handleChange(e)} />
                </div>
                <div className="col-sm-3">
                  <button className="btn btn-danger btn-sm" type="submit" onClick={() => this.validateSubmit()}>Submit</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}


Bidding.propTypes = {
  postBidding: PropTypes.func,
  galleryItems: PropTypes.arrayOf(PropTypes.shape({})),
  biddingItems: PropTypes.arrayOf(PropTypes.shape({})),
  logoutSuccess: PropTypes.func,
};

const mapStateToProps = state => ({
  biddingItems: state.app.biddingItems,
  galleryItems: state.app.gallery,
});

const mapDispatchToProps = dispatch => ({
  postBidding: (objectId, myBid, bidId) => dispatch(postBid(objectId, myBid, bidId)),
  logoutSuccess: () => dispatch(logoutSuccess()),
});


const BiddingPage = connect(mapStateToProps, mapDispatchToProps)(Bidding);

export default BiddingPage;
