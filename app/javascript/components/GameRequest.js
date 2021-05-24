const handleUnauthorizedErrors = response => {
  const redirectUrl = response.url.split("/").pop();
  if (!response.ok && response.status !== 422) {
    if (
      response.status === 401 ||
      response.status === 406 ||
      (response.status === 404 && redirectUrl === "sign_in.json")
    ) {
      location.reload();
    }
    console.log("Throwing error", response.statusText);
    throw Error(response.statusText);
  }
  return response;
};

const onApiFailure = response => {
  toastr.error("Something went wrong, please try after sometime !");
  console.log("Error response", response);
};

import React from "react"
import PropTypes from "prop-types"
class GameRequest extends React.Component {
	constructor() {
    super();
    this.state = {
    	createGameButtonClicked: false,
      joinGameButtonClicked: false,
    	userName: null,
      roomId: null,
      joinRoomErrorMessage: null
    };

    this.createRoom = this.createRoom.bind(this);
    this.handleCreateGameButtonClicked = this.handleCreateGameButtonClicked.bind(this);
    this.handleJoinGameButtonClicked = this.handleJoinGameButtonClicked.bind(this);
    this.handleUserNameUpdate = this.handleUserNameUpdate.bind(this);
    this.handleRoomIdUpdate = this.handleRoomIdUpdate.bind(this);
    this.joinRoom = this.joinRoom.bind(this);
    this.renderCancelButton = this.renderCancelButton.bind(this);
    this.resetLobby = this.resetLobby.bind(this);
    this.onSuccess = this.onSuccess.bind(this);
    this.onFailure = this.onFailure.bind(this);
  };

  createRoom() {
  	const params = {
      source_game: this.props.game,
      user_name: this.state.userName
    };
    this.makeRequest(this.props.create_room_url, params)
  }

  handleCreateGameButtonClicked() {
  	this.setState({ createGameButtonClicked: true, userName: null });
  }

  handleJoinGameButtonClicked() {
    this.setState({ joinGameButtonClicked: true, userName: null });
  }

  handleUserNameUpdate(event) {
  	this.setState({ userName: event.target.value });
  }

  handleRoomIdUpdate(event) {
    this.setState({ roomId: event.target.value });
  }

  joinRoom() {
  	const params = {
      user_name: this.state.userName,
      identifier: this.state.roomId
    }
    this.makeRequest(this.props.join_room_url, params)	
  }

  makeRequest(requestUrl, params) {
  	this.post_request(
      params,
      requestUrl,
      this.onSuccess,
      this.onFailure
    )
  }

  renderCancelButton() {
    return (
      <button 
        type="button" 
        className='btn btn-secondary'
        onClick={this.resetLobby}
      >
        Cancel
      </button>
    );
  }

  resetLobby() {
    this.setState({
      createGameButtonClicked: false,
      joinGameButtonClicked: false,
      userName: null,
      roomId: null,
      joinRoomErrorMessage: null
    });
  }

  onSuccess(json) {
  	window.location.href = this.props.game_lobby_url.replace("id", json.room_id);
  }

  onFailure(json) {
  	this.setState({ joinRoomErrorMessage: json.errors });
  }

  post_request(
    params,
    link,
    successCallback,
    failureCallback
  ) {
    let header = {
      Accept: "application/json",
      "Content-Type": "application/json"
    };
    fetch(link, {
      method: 'POST',
      body: JSON.stringify(params),
      headers: header,
      credentials: "include"
    })
      .then(handleUnauthorizedErrors)
      .then(function(response) {
        return response.json();
      })
      .then(function(json) {
        if (json.success !== undefined) {
          json.success ? successCallback(json) : failureCallback(json);
        } else {
          successCallback(json)
        }
      })
      .catch(function(ex) {
        console.log("#service api failed", ex);
        failureCallback();
      });
  }

  render() {
  	return(
  		<div className="container-fluid">
        <div className="mt-5">
          <div className="mx-auto" style={{ "width": "585px" }}>
          	<h1> Welcome to Center Coin </h1>
          	<br />
            <button
              type='submit'
              className='btn btn-success'
              disabled={this.state.createGameButtonClicked}
              onClick={this.handleCreateGameButtonClicked}
            >
              Create a room
            </button>
            {this.state.createGameButtonClicked ? (
            	<div>
            		<br /><br />
            		<input
	                type="text"
	                className="form-control"
	                placeholder="What is your nick name"
	                aria-label="UserName"
	                aria-describedby="basic-addon1"
	                onChange={this.handleUserNameUpdate}
	              />
	              <br />
                <div>
                  <button 
                    type="button" 
                    className='btn btn-success'
                    onClick={this.createRoom}
                  >
                    Create
                  </button>
                  &emsp;
                  {this.renderCancelButton()}
                </div>
				        <br /><br /><br /><br />
            	</div>
            ) : (null)}
            <br /><br />
            <button
              type='submit'
              className='btn btn-success'
              disabled={this.state.joinGameButtonClicked}
              onClick={this.handleJoinGameButtonClicked}
            >
              Join a room
            </button>
            {this.state.joinGameButtonClicked ? (
              <div>
                <br /><br />
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter room ID"
                  aria-label="roomId"
                  aria-describedby="basic-addon1"
                  onChange={this.handleRoomIdUpdate}
                />
                <br /><br />
                <input
                  type="text"
                  className="form-control"
                  placeholder="What is your nick name"
                  aria-label="UserName"
                  aria-describedby="basic-addon1"
                  onChange={this.handleUserNameUpdate}
                />
                <br />
                <div>
                  <button
                    type="button" 
                    className='btn btn-success'
                    onClick={this.joinRoom}
                  >
                    Join
                  </button>
                  &emsp;
                  {this.renderCancelButton()}
                </div>
                <br /><br />
                <strong>{this.state.joinRoomErrorMessage}</strong>
              </div>
            ) : (null)}
          </div>
        </div>
      </div>
  	);
  }
};
export default GameRequest
