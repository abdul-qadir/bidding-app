import React, { Component, PropTypes } from 'react';
import get from 'lodash/get';
import { connect } from 'react-redux';
import { postBid } from './../../actions/biddingActions';
import { logoutSuccess } from './../../actions/loginActions';
import Lightbox from '../lightbox';
import LightboxModal from '../lightbox/LightboxModal';
import LightboxTrigger from '../lightbox/LightBoxTrigger';

class Bidding extends Component {
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
        const sortedGalleryItems = nextProps.galleryItems.sort((firstItem, otherItem) => {
          const firstItemWinner = nextProps.biddingItems.find(x => get(x, 'object_id') === firstItem.id);
          const otherItemWinner = nextProps.biddingItems.find(x => get(x, 'object_id') === otherItem.id);
          if (firstItemWinner && otherItemWinner) {
            return otherItemWinner - firstItemWinner;
          } else if (firstItemWinner) {
            return -firstItemWinner;
          } else if (otherItemWinner) {
            return otherItemWinner;
          }
          return 0;
        });

        const highBiddedItemIds = new Set();
        for (let i = 0; i < leftPanelItems; i += 1) {
          const item = sortedGalleryItems[i];
          const biddingItem = nextProps.biddingItems.find(x => get(x, 'object_id') === item.id);
          if (biddingItem) {
            highBiddedItemIds.add(item.id);
          }
        }
        const highlyBiddedItems = sortedGalleryItems.filter(x => highBiddedItemIds.has(get(x, 'id')));
        const remainingItems = sortedGalleryItems.filter(x => !highBiddedItemIds.has(get(x, 'id')));


        /**
         const item = this.state.objectId === 0 ? nextProps.galleryItems[0] :
         nextProps.galleryItems.find(x => get(x, 'id') === this.state.objectId);

         const bidWinner = nextProps.biddingItems.find(x => get(x, 'object_id') === item.id);
         const bidWinnerName = bidWinner ? bidWinner.name : '';
         const price = bidWinner ? bidWinner.price : '';
         const bidId = bidWinner ? bidWinner.id : '';
         **/
          // const state = Object.assign({}, this.state, { myBid: '', url: item.url, objectId: item.id, basePrice: item.base_price, bidWinnerName, price, bidId, loading: false });
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
            <div className="top-bidders">
              <ul style={{ listStyle: 'none' }}>
                {
                this.state.highlyBiddedItems.map(item =>
                  <li>
                    <Lightbox>
                      <LightboxTrigger >
                        <div onClick={() => this.updateMainItem(item)}>
                          <img src={`/images/gallery/${item.url}`} alt="" />
                          <div className="onwer-name">{item.owner}</div>
                          <div className="max-bid">{item.price}</div>
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
                  </li>
                )
              }
              </ul>
            </div>
            <div className="other-bid">
              <ul style={{ listStyle: 'none' }}>
                {
                this.state.remainingItems.map(item =>
                  <li>
                    <Lightbox>
                      <LightboxTrigger >
                        <div onClick={() => this.updateMainItem(item)} className="list-item-side">
                          <img src={`/images/gallery/${item.url}`} alt="" />
                          <div className="onwer-name">{item.owner}</div>
                          <div className="max-bid">{item.price}</div>
                        </div>
                      </LightboxTrigger>
                      <LightboxModal>
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
                      </LightboxModal>
                    </Lightbox>
                  </li>
                )
              }
              </ul>
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

/**
 export const ToggleButton = (
 <button onClick={this.props.openLightbox}>Open Lightbox</button>
 );

 export const MyPanel = (
 <div>
 <h3>My Panel</h3>
 <hr />
 <textarea placeholder="Type something here..." />
 <hr />
 <button onClick={this.props.closeLightbox()}>Save</button>
 </div>
 );

 React.renderComponent(
 <Lightbox>
 <LightboxTrigger>
 <ToggleButton />
 </LightboxTrigger>
 <LightboxModal>
 <MyPanel />
 </LightboxModal>
 </Lightbox>,
 document.getElementById('react-canvas')
 );**/
