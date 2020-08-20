import React from "react"
import PropTypes from "prop-types"
class HomePage extends React.Component {
  handleSubmit() {

  }

  render () {
    return (
      <div className="container-fluid">
        <div className="mt-5">
          <div className="mx-auto" style={{ "width": "585px" }}>
            <h1> PrivInt Eye for patient safety </h1>
            <hr style={{ "border-top": "1px solid #f8f9fa" }}/>
          </div>
          <div className="row mt-5 pl-5">
            <div className="col-sm">
              <input
                type="text"
                className="form-control"
                placeholder="Please enter your free text here"
                aria-label="Username"
                aria-describedby="basic-addon1"
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
        </div>
      </div>
    );
  }
}

export default HomePage
