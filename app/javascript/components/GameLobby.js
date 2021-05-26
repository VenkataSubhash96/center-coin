import React from "react"
import PropTypes from "prop-types"
class GameLobby extends React.Component {
	constructor(props) {
  	super();
  	this.state = {
  		players: props.room_details.users
  	};

  	this.renderPlayers = this.renderPlayers.bind(this);
    this.renderStartGameButton = this.renderStartGameButton.bind(this);
    this.startGame = this.startGame.bind(this);
  };

  renderPlayers() {
  	var hostUser = this.props.room_details.host_user
  	return this.state.players.map((player, index) => {
  		return (
  			<div key={index}>
  				<h5>{player} {hostUser == player ? " - host" : null}</h5>
  			</div>
  		);
  	});
  }

  renderStartGameButton() {
    if (this.props.room_details.user_name == this.props.room_details.host_user) {
      return (
        <button
          type="button"
          className='btn btn-success'
          onClick={this.startGame}
          disabled={this.props.room_details.users.length < 2}
        >
          Start Game
        </button>
      );
    }
  }

  startGame() {
    console.log('came to start game');
  }

  render() {
  	return (
  		<div className="container-fluid">
        <div className="mt-5">
          <div className="mx-auto" style={{ "width": "585px" }}>
          	<h1> You are in the game lobby </h1>
          	<br /><br />
          	<h3>{`The room id is ${this.props.room_details.identifier}` }</h3>
          	<br /><br />
          	<h4 style={{"textDecoration": "underline"}}>Players</h4>
          	<br />
          	{this.renderPlayers()}
            <br /><br />
            {this.renderStartGameButton()}
          </div>
        </div>
      </div>
  	);
  }
}

export default GameLobby
