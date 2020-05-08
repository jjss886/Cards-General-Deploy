import React, { Component } from "react";
import { connect } from "react-redux";
import { drawCard } from "../../store";

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

const mapState = (state) => ({ user: state.user });

const mapDispatch = (dispatch) => ({
  drawCard: (name, card) => dispatch(drawCard(name, card)),
});

export default connect(mapState, mapDispatch)(ControlPanel);
