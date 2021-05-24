import React from "react"
import PropTypes from "prop-types"
class HomePage extends React.Component {
  constructor() {
    super();
  };

  render () {
    return (
      <div className="container-fluid">
        <div className="mt-5">
          <div className="mx-auto" style={{ "width": "585px" }}>
            <h1> Welcome to my games show </h1>
            <br /><br />
            <a
              type='submit'
              className='btn btn-success'
              href={this.props.center_coin_game_url}
            >
              Play Center Coin
            </a>
          </div>
        </div>
      </div>
    );
  }
}

export default HomePage
