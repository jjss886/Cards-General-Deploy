import React, { Component } from "react";
import { connect } from "react-redux";
import { drawCard } from "../../store";

class ControlPanel extends Component {
  drawing = () => {
    const { user, deck, drawCard } = this.props;
    drawCard(user, deck.slice(-1));
  };

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

const mapState = (state) => ({ user: state.user, deck: state.deck });

const mapDispatch = (dispatch) => ({
  drawCard: (name, card) => dispatch(drawCard(name, card)),
});

export default connect(mapState, mapDispatch)(ControlPanel);
