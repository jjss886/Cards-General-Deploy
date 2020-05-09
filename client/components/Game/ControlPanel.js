import React, { Component } from "react";
import { connect } from "react-redux";
import { drawCard, nextPlayer } from "../../store";

class ControlPanel extends Component {
  drawing = () => {
    const { user, deck, drawCard } = this.props;
    drawCard(user, deck.slice(-1));
  };

  next = () => {
    const { user, players, nextPlayer } = this.props,
      curPlayers = Object.keys(players),
      lenIdx = curPlayers.length - 1,
      curIdx = curPlayers.indexOf(user);

    if (lenIdx === curIdx) nextPlayer(curPlayers[0]);
    else nextPlayer(curPlayers[curIdx + 1]);
  };

  render() {
    const { user, livePlayer } = this.props;

    return (
      <div className="cpFullDiv">
        <h3>Control Panel</h3>

        {user && user === livePlayer ? (
          <>
            <button type="button" className="gBtn">
              Draw
            </button>

            <button type="button" className="gBtn">
              Next
            </button>
          </>
        ) : null}
      </div>
    );
  }
}

const mapState = (state) => ({
  user: state.user,
  deck: state.deck,
  players: state.channel.players,
  livePlayer: state.channel.livePlayer,
});

const mapDispatch = (dispatch) => ({
  drawCard: (name, card) => dispatch(drawCard(name, card)),
  nextPlayer: (name) => dispatch(nextPlayer(name)),
});

export default connect(mapState, mapDispatch)(ControlPanel);
