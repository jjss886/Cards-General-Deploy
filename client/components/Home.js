import React, { Component } from "react";
import { connect } from "react-redux";
import { addNewChannel } from "../store";
import { channelOption } from "../utils/utilities";

class Home extends Component {
  constructor() {
    super();
    this.state = { channel: "", name: "" };
  }

  roomCreate = () => {
    const { channels, addNewChannel, history } = this.props;

    while (true) {
      let str = "";

      for (let i = 0; i < 4; i++) {
        const x = Math.floor(Math.random() * channelOption.length);
        str += channelOption[x];
      }

      if (!(str in channels)) {
        addNewChannel(str, this.state.name);
        history.push({ pathname: `/Room/${str}`, state: { channel: str } });
        return;
      }
    }
  };

  handleChange = (evt) => {
    this.setState({ [evt.target.name]: evt.target.value });
  };

  handleSubmit = (evt) => {
    evt.preventDefault();
    const { channel, name } = this.state,
      { channels, history } = this.props;

    if (channel in channels) {
      history.push({ pathname: `/Room/${channel}`, state: { channel, name } });
      this.setState({ channel: "" });
    } else alert("Room Not Available");
  };

  render() {
    const { rooms } = this.props;

    return (
      <div className="houseDiv mainDiv">
        <h3>Home to General Cards</h3>

        <input
          name="name"
          value={this.state.name}
          onChange={this.handleChange}
          placeholder="name"
        />

        {this.state.name.length ? (
          <>
            <button type="button" onClick={this.roomCreate}>
              Create Room!
            </button>

            <form onSubmit={this.handleSubmit}>
              <input
                name="channel"
                value={this.state.channel}
                onChange={this.handleChange}
                placeholder="channel"
              />

              <button type="submit">Join</button>
            </form>
          </>
        ) : null}

        <div>{rooms ? rooms.map((x, i) => <p key={i}>{x}</p>) : null}</div>
      </div>
    );
  }
}

const mapState = (state) => ({
  channels: state.channels,
  rooms: Object.keys(state.channels),
});

const mapDispatch = (dispatch) => ({
  addNewChannel: (channel, name) => dispatch(addNewChannel(channel, name)),
});

export default connect(mapState, mapDispatch)(Home);
