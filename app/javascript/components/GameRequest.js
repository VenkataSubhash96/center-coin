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
    	userName: null
    };

    this.createRoom = this.createRoom.bind(this);
    this.handleCreateGameButtonClicked = this.handleCreateGameButtonClicked.bind(this);
    this.handleUserNameUpdate = this.handleUserNameUpdate.bind(this);
    this.joinRoom = this.joinRoom.bind(this);
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
  	this.setState({ createGameButtonClicked: true });
  }

  handleUserNameUpdate(event) {
  	this.setState({ userName: event.target.value });
  }

  joinRoom() {
  	const params = {
      source_game: this.props.game
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

  onSuccess() {
  	console.log('Success');
  }

  onFailure() {
  	console.log('Failed');
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
	              <button 
				        	type="button" 
				        	className='btn btn-success'
				        	onClick={this.createRoom}
				        >
				        	Create
				        </button>
				        <br /><br /><br /><br />
            	</div>
            ) : (null)}
            <br /><br />
            <button
              type='submit'
              className='btn btn-success'
              disabled={this.state.createGameButtonClicked}
              href={this.props.join_room_url}
            >
              Join a room
            </button>
          </div>
        </div>
      </div>
  	);
  }
};
export default GameRequest
