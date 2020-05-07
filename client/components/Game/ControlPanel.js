import React, { Component } from "react";
import { connect } from "react-redux";

class ControlPanel extends Component {
  render() {
    return (
      <div>
        <h3>Control Panel</h3>
      </div>
    );
  }
}

const mapState = (state) => ({});

const mapDispatch = (dispatch) => ({});

export default connect(mapState, mapDispatch)(ControlPanel);
