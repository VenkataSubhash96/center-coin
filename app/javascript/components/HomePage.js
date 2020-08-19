import React from "react"
import PropTypes from "prop-types"
class HomePage extends React.Component {
  handleSubmit() {

  }

  render () {
    return (
      <button
        type='submit'
        className='btn btn-success'
        onClick={this.handleSubmit}
      >
        Submit
      </button>
    );
  }
}

export default HomePage
