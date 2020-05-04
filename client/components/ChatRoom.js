import React, { Component } from "react";
import { connect } from "react-redux";
import { actionSocket } from "../store";

class ChatRoom extends Component {
  constructor() {
    super();
    this.state = {
      message: "",
    };
  }

  handleChange = (evt) => {
    this.setState({ [evt.target.name]: evt.target.value });
  };

  handleSubmit = (evt) => {
    evt.preventDefault();

    const { message } = this.state,
      { user, roomId } = this.props;

    if (message.length) {
      // NEED TO SEND MESSAGE BACK TO REDUX & SOCKET
      actionSocket({ type: "POST_MSG", roomId, name: user, message });

      this.setState({ message: "" });
    }
  };

  render() {
    const { messages } = this.props;

    return (
      <div>
        <h3>Chat Room</h3>

        {messages.map((m, i) => {
          <p key={i}>
            {m.name}: {m.message}
          </p>;
        })}

        <div>
          <input
            name="message"
            value={this.state.message}
            onChange={this.handleChange}
            placeholder="Message"
          />

          <button type="button" onClick={this.handleSubmit}>
            Send
          </button>
        </div>
      </div>
    );
  }
}

const mapState = (state) => ({
  user: state.user,
  roomId: state.channel.room,
  messages: state.channel.messages,
});

export default connect(mapState)(ChatRoom);
