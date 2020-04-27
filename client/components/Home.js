import React, { Component } from "react";
import { connect } from "react-redux";
import { addChannel } from "../store";

class Home extends Component {
  constructor() {
    super();
    this.state = { channel: "" };
  }

  handleChange = (evt) => {
    this.setState({ [evt.target.name]: evt.target.value });
  };

  handleSubmit = (evt) => {
    evt.preventDefault();
  };

  render() {
    const { channels } = this.state;

    return (
      <div className="houseDiv mainDiv">
        <h3>Home to General Cards</h3>

        <form onSubmit={this.handleSubmit}>
          <input
            value={this.state.channel}
            name="channel"
            onChange={this.handleChange}
          />

          <button type="submit">Submit</button>
        </form>

        <div>
          {channels ? channels.map((x, i) => <p key={i}>{x}</p>) : null}
        </div>
      </div>
    );
  }
}

const mapState = (state) => ({
  channels: state.channels,
});

const mapDispatch = (dispatch) => ({
  addChannel: (channel) => dispatch(addChannel(channel)),
});

export default connect(mapState, mapDispatch)(Home);
