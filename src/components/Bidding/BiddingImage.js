import React, { Component, PropTypes } from 'react';
import get from 'lodash/get';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import { postBid } from './../../actions/biddingActions';
import { logoutSuccess } from './../../actions/loginActions';
import Spinner from '../Spinner';
import Lightbox from '../lightbox';
import LightboxModal from '../lightbox/LightboxModal';
import LightboxTrigger from '../lightbox/LightBoxTrigger';

class BiddingImage extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      loading: true,
      myBid: '',
      objectId: 0,
      highlyBiddedItems: [],
      remainingItems: [],
    };
    this.updateMainItem = this.updateMainItem.bind(this);
    this.validateSubmit = this.validateSubmit.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.galleryItems && nextProps.biddingItems &&
      (this.props.galleryItems !== nextProps.galleryItems || this.props.biddingItems !== nextProps.biddingItems)) {
      if (nextProps.galleryItems.length > 0) {
        const leftPanelItems = Math.floor(nextProps.galleryItems.length / 5);
        const galleryItems = nextProps.galleryItems.map((galleryItem) => {
          const biddingItem = nextProps.biddingItems.find(x => get(x, 'object_id') === galleryItem.id);
          return {
            ...galleryItem,
            bidPrice: biddingItem ? biddingItem.price : galleryItem.base_price,
          };
        });

        const sortedGalleryItems = galleryItems.sort((firstItem, otherItem) => otherItem.bidPrice - firstItem.bidPrice);

        const highBiddedItemIds = new Set();
        for (let i = 0; i < leftPanelItems; i += 1) {
          const item = sortedGalleryItems[i];
          if (item.bidPrice !== 0) {
            highBiddedItemIds.add(item.id);
          }
        }
        const highlyBiddedItems = sortedGalleryItems.filter(x => highBiddedItemIds.has(get(x, 'id')));
        const remainingItems = sortedGalleryItems.filter(x => !highBiddedItemIds.has(get(x, 'id')));
        const state = Object.assign({}, this.state, { highlyBiddedItems, remainingItems, loading: false });
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
      this.setState({ loading: false, myBid: '' });
      browserHistory.push('/');
      document.getElementById('lightbox-Btn-Cls').click();
    } else {
      this.setState({ loading: false });
      alert('Please enter price greater than base Price and last bidded price(if any) ');
    }
  }

  render() {
    if (this.state.loading === true) {
      return <Spinner />;
    }
    return (
      <div className="container gallery-container">
        {this.props.refresh ? <div className="refreshMsg" >Highesh Bid Price might have been updated. Please try again with higher value than current bid price.</div> : null }
        <div className="tz-gallery">
          <div className="topBidder">
            <div className="col-sm-6 col-md-12">
              {
                this.state.highlyBiddedItems.map(item => (
                  <Lightbox className="lightboxHover" key={item.id}>
                    <LightboxTrigger>
                      <div className="thumbnail">
                        <a className="lightbox" onClick={() => this.updateMainItem(item)}>
                          <img src={`/images/gallery/${item.url}`} alt="" />
                        </a>
                        <div className="caption">
                          <h3>{item.owner}</h3>
                          { item.bidPrice === item.base_price ? <p>{item.bidPrice}</p> : <p><i>{item.bidPrice}</i></p>}
                        </div>
                      </div>
                    </LightboxTrigger>
                    <LightboxModal>
                      <div className="details-container">
                        <div>
                          <img src={`/images/gallery/${this.state.url}`} alt="img" />
                        </div>
                        <div>
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
                    </LightboxModal>
                  </Lightbox>
              ))
              }
            </div>
          </div>


          <div className="otherBidder">
            <div className="col-sm-6 col-md-12">
              {
                  this.state.remainingItems.map(item => (
                    <Lightbox className="col-sm-6 col-md-6 lightboxHover" key={item.id}>
                      <LightboxTrigger>
                        <div className="thumbnail">
                          <a className="lightbox" onClick={() => this.updateMainItem(item)}>
                            <img src={`/images/gallery/${item.url}`} alt="" />
                          </a>
                          <div className="caption">
                            <h3>{item.owner}</h3>
                            { item.bidPrice === item.base_price ? <p>{item.bidPrice}</p> : <p><i>{item.bidPrice}</i></p>}
                          </div>
                        </div>
                      </LightboxTrigger>
                      <LightboxModal>
                        <div className="details-container">
                          <div>
                            <img src={`/images/gallery/${this.state.url}`} alt="img" />
                          </div>
                          <div>
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
                      </LightboxModal>
                    </Lightbox>
                    ))
                }
            </div>
          </div>
        </div>
      </div>

    );
  }
}


BiddingImage.propTypes = {
  postBidding: PropTypes.func,
  galleryItems: PropTypes.arrayOf(PropTypes.shape({})),
  biddingItems: PropTypes.arrayOf(PropTypes.shape({})),
  refresh: PropTypes.bool,

};

const mapStateToProps = state => ({
  biddingItems: state.app.biddingItems,
  galleryItems: state.app.gallery,
  refresh: state.app.refresh,
});

const mapDispatchToProps = dispatch => ({
  postBidding: (objectId, myBid, bidId) => dispatch(postBid(objectId, myBid, bidId)),
  logoutSuccess: () => dispatch(logoutSuccess()),
});


const BiddingPage = connect(mapStateToProps, mapDispatchToProps)(BiddingImage);

export default BiddingPage;
