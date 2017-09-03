import React, { Component } from 'react';


class Home extends Component {
  state = {
    courseList: [],
    divStyle: {
      backgroundImage: 'url(images/adam-birkett-183643.jpg)',
    },
  }

  render() {
    return (
      <div className="main-content">
        <div className="bid-container panel">
          <div className="img-thumbnails">
            <ul className="list-unstyled">
              <li>
                <a >
                  <div className="img-thumb" style={this.state.divStyle} />
                  <span className="bid"> $150</span>
                </a>
              </li>
              <li>
                <a >
                  <div className="img-thumb" style={this.state.divStyle} />
                  <span className="bid"> $150</span>
                </a>
              </li>
              <li>
                <a >
                  <div className="img-thumb" style={this.state.divStyle} />
                  <span className="bid"> $150</span>
                </a>
              </li>

            </ul>
          </div>
          <div className="details-container ">
            <div action="">
              <div className="form-group row">
                <div className="col-sm-6">
                  <label htmlFor="curent-bid">Current Bid:</label>
                </div>
                <div className="col-sm-6">
                  <span id="curent-bid">$150</span>
                </div>
              </div>
              <div className="form-group row">
                <div className="col-sm-6">
                  <label htmlFor="User Name">User Name:</label>
                </div>
                <div className="col-sm-6">
                  <span id="User Name">Jon Due</span>
                </div>
              </div>
              <div className="form-group row">
                <div className="col-sm-6"><label htmlFor="my-bid">My bid:</label></div>
                <div className="col-sm-6">
                  <input type="text" className="form-control" id="my-bid" placeholder="$" />
                </div>
              </div>

              <div className="form-group text-right">
                <button className=" btn btn-login" type="submit">Submit</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Home;
