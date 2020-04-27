import React, { Component } from "react";
import { connect } from "react-redux";
import { addChannel } from "../store";
import { channelOption } from "../utils/utilities";

class Home extends Component {
  constructor() {
    super();
    this.state = { channel: "" };
  }

  roomCreate = () => {
    const { channels, addChannel, history } = this.props;

    while (true) {
      let str = "";

      for (let i = 0; i < 4; i++) {
        const x = Math.floor(Math.random() * channelOption.length);
        str += channelOption[x];
      }

      if (!channels.includes(str)) {
        addChannel(str);
        history.push({ pathname: `/Room/${str}`, state: { hello: "hello" } });
        return;
      }
    }
  };

  handleChange = (evt) => {
    this.setState({ [evt.target.name]: evt.target.value });
  };

  handleSubmit = (evt) => {
    evt.preventDefault();
    const { channel } = this.state,
      { channels, history } = this.props;

    if (channels.includes(channel)) {
      history.push({ pathname: `/Room/${channel}`, state: { hello: "hello" } });
      this.setState({ channel: "" });
    } else alert("Room Not Available");
  };

  render() {
    const { channels } = this.props;

    return (
      <div className="houseDiv mainDiv">
        <h3>Home to General Cards</h3>

        <button type="button" onClick={this.roomCreate}>
          Create Room!
        </button>

        <form onSubmit={this.handleSubmit}>
          <input
            value={this.state.channel}
            name="channel"
            onChange={this.handleChange}
          />

          <button type="submit">Join</button>
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
