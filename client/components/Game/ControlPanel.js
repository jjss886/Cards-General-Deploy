import React, { Component } from "react";
import { connect } from "react-redux";

class ControlPanel extends Component {
  render() {
    return (
      <div className="cpFullDiv">
        <h3>Control Panel</h3>

        <button type="button" className="gBtn">
          Draw
        </button>

        <button type="button" className="gBtn">
          Next
        </button>
      </div>
    );
  }
}

const mapState = (state) => ({});

const mapDispatch = (dispatch) => ({});

export default connect(mapState, mapDispatch)(ControlPanel);
