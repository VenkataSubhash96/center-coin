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
class HomePage extends React.Component {
  constructor() {
    super();
    this.state = {
      inputText: "",
      apiResponse: "",
      showProbabilityInfo: false
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.showResponse = this.showResponse.bind(this);
    this.renderProbabilityButton = this.renderProbabilityButton.bind(this);
    this.setShowProbabilityInfo = this.setShowProbabilityInfo.bind(this);
    this.renderProbabilityInfo = this.renderProbabilityInfo.bind(this);
    this.onSuccess = this.onSuccess.bind(this);
    this.onFailure = this.onFailure.bind(this);
  };

  get_request(
    params,
    link,
    successCallback,
    failureCallback
  ) {
    let apiRequest = link + '?' + $.param(params);
    let header = {
      Accept: "application/json",
      "Content-Type": "application/json"
    };
    fetch(apiRequest, {
      method: 'GET',
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

  handleInputChange(event) {
    event.preventDefault();
    this.setState({ inputText: event.target.value });
  }

  handleSubmit() {
    const params = {
      input_text: this.state.inputText
    }
    this.get_request(
      params,
      this.props.script_url,
      this.onSuccess,
      this.onFailure
    )
  }

  onSuccess(json) {
    this.setState({ apiResponse: json.response });
  }

  onFailure() {
    this.setState({ apiResponse: 'Fetching response failed' });
  }

  renderProbabilityButton() {
    return (
      <button
        type='submit'
        className='btn btn-success'
        onClick={this.setShowProbabilityInfo}
      >
        More details
      </button>
    );
  }

  renderProbabilityInfo() {
    return (
      <div className="row">
        <div className="col-4">
          <img src={this.props.sleep_tracking_graph_url} style={{"width": "400px", "height": "250px"}} />
        </div>
        <div className="col-6">
          <table class="table table-bordered">
            <tbody>
              <tr style={{"color": "white"}}>
                <th scope="row">Quality of sleep</th>
                <td>Average</td>
              </tr>
              <tr style={{"color": "white"}}>
                <th scope="row">Fall Prediction</th>
                <td>67%</td>
              </tr>
              <tr style={{"color": "white"}}>
                <th scope="row">Number of alerts</th>
                <td>3</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    );
  }

  setShowProbabilityInfo() {
    this.setState({ showProbabilityInfo: true });
  }

  showResponse() {
    return (
      this.state.apiResponse == "" ? (<div></div>) : (
        <div>
          <div className="row mt-5 pl-5">
            <div className="col-sm">
              <legend>{this.state.apiResponse}</legend>
            </div>
          </div>
          <div className="row mt-5 pl-5">
            <div className="col-sm">
              {this.state.showProbabilityInfo ? (this.renderProbabilityInfo()) : (this.renderProbabilityButton())}
            </div>
          </div>
        </div>
      )
    );
  }

  render () {
    return (
      <div className="container-fluid">
        <div className="mt-5">
          <div className="mx-auto" style={{ "width": "585px" }}>
            <h1> PrivInt Eye for patient safety </h1>
            <hr style={{ "borderTop": "1px solid #f8f9fa" }}/>
            <table class="table table-bordered">
              <tbody>
                <tr style={{"color": "white"}}>
                  <th scope="row">Name</th>
                  <td>John Sam</td>
                </tr>
                <tr style={{"color": "white"}}>
                  <th scope="row">MRN</th>
                  <td>1234567</td>
                </tr>
                <tr style={{"color": "white"}}>
                  <th scope="row">Bed</th>
                  <td>GM 34</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="row mt-5 pl-5">
            <div className="col-sm">
              <input
                type="text"
                className="form-control"
                placeholder="Please enter your free text here"
                aria-label="Username"
                aria-describedby="basic-addon1"
                onChange={this.handleInputChange}
              />
            </div>
            <div className="col-sm">
              <button
                type='submit'
                className='btn btn-success'
                onClick={this.handleSubmit}
              >
                Submit
              </button>
            </div>
          </div>
          {this.showResponse()}
        </div>
      </div>
    );
  }
}

export default HomePage
