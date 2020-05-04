import React, { Component } from "react";
import { connect } from "react-redux";
import { actionSocket } from "../../store";

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
      <div className="chatFullDiv">
        <h3>Chat Room</h3>

        <div className="chatMsgDiv">
          {messages
            ? messages.map((m, i) => (
                <p key={i} className={`chatMsg ${i % 2 ? "chatMsg1" : null}`}>
                  <u>{m.name}</u>: {m.message}
                </p>
              ))
            : null}
        </div>

        <div className="chatInputDiv">
          <textarea
            className="chatTextArea"
            name="message"
            value={this.state.message}
            onChange={this.handleChange}
            placeholder="Message"
          />

          <button type="button" onClick={this.handleSubmit} className="gBtn">
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
