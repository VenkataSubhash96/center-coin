import React from "react"
import PropTypes from "prop-types"
class GameLobby extends React.Component {
	constructor(props) {
  	super();
  	this.state = {
  		players: props.room_details.users
  	};

  	this.renderPlayers = this.renderPlayers.bind(this);
  };

  renderPlayers() {
  	var hostUser = this.props.room_details.host_user
  	return this.state.players.map((player, index) => {
  		return (
  			<div key={index}>
  				<h5>{player} - {hostUser == player ? "host" : null}</h5>
  			</div>
  		);
  	});
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
          </div>
        </div>
      </div>
  	);
  }
}

export default GameLobby
