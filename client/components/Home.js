import React, { Component } from "react";
import { connect } from "react-redux";
import axios from "axios";
import { addNewChannel, addNewPlayer } from "../store";
import { channelOption } from "../utils/utilities";
import socket from "../utils/socket";

class Home extends Component {
  constructor() {
    super();
    this.state = { rooms: {}, channel: "", name: "" };
  }

  async componentDidMount() {
    const { data: rooms } = await axios.get("/all-rooms");
    this.setState({ rooms });
  }

  roomCreate = async () => {
    const { addNewChannel, history } = this.props,
      { name, rooms } = this.state;

    if (!name.length) return alert("Please fill in name");

    while (true) {
      let channel = "";

      for (let i = 0; i < 4; i++) {
        const x = Math.floor(Math.random() * channelOption.length);
        channel += channelOption[x];
      }

      if (!(channel in rooms)) {
        addNewChannel(channel, name);

        await axios.post("/new-room", { channel });

        socket.emit("new-room", channel);

        history.push({
          pathname: `/Room/${channel}`,
          state: { room: channel, name },
        });

        return;
      }
    }
  };

  handleChange = (evt) => {
    this.setState({ [evt.target.name]: evt.target.value });
  };

  joinRoom = (evt) => {
    evt.preventDefault();

    const { channel, name, rooms } = this.state,
      { channels, history, addNewPlayer } = this.props;

    if (!name.length) return alert("Please fill in name");

    if (channel in rooms) {
      // addNewPlayer(channel, name);

      history.push({
        pathname: `/Room/${channel}`,
        state: { room: channel, name },
      });

      this.setState({ channel: "" });
    } else alert("Room Not Available");
  };

  render() {
    const { rooms } = this.state,
      roomIds = Object.keys(rooms);
    console.log("state render -", this.state);

    return (
      <div className="houseDiv mainDiv">
        <h3>Home to General Cards</h3>

        <input
          name="name"
          value={this.state.name}
          onChange={this.handleChange}
          placeholder="name"
        />

        <button type="button" className="gBtn" onClick={this.roomCreate}>
          Create Room!
        </button>

        <form onSubmit={this.joinRoom}>
          <input
            name="channel"
            value={this.state.channel}
            onChange={this.handleChange}
            placeholder="channel"
          />

          <button type="submit" className="gBtn">
            Join
          </button>
        </form>

        <div>{roomIds ? roomIds.map((x, i) => <p key={i}>{x}</p>) : null}</div>
      </div>
    );
  }
}

const mapState = (state) => ({
  channels: state.channels,
});

const mapDispatch = (dispatch) => ({
  addNewChannel: (channel, name) => dispatch(addNewChannel(channel, name)),
  addNewPlayer: (channel, name) => dispatch(addNewPlayer(channel, name)),
});

export default connect(mapState, mapDispatch)(Home);
