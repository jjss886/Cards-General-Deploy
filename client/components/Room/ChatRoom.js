import React, { Component, createRef } from "react";
import { connect } from "react-redux";
import { actionSocket } from "../../store";

class ChatRoom extends Component {
  constructor() {
    super();
    this.state = {
      message: "",
    };
    this.chatDiv = createRef();
  }

  componentDidUpdate(prevProps) {
    const prevMsgs = prevProps.messages;

    if (prevMsgs && this.props.messages.length !== prevMsgs.length) {
      const chatRoom = this.chatDiv.current;

      chatRoom.scrollTop = chatRoom.scrollHeight - chatRoom.clientHeight;
    }
  }

  handleChange = (evt) => {
    this.setState({ [evt.target.name]: evt.target.value });
  };

  handleSubmit = (evt) => {
    evt.preventDefault();

    const { message } = this.state,
      { user, roomId } = this.props;

    if (message.length) {
      actionSocket({ type: "POST_MSG", roomId, name: user, message });

      this.setState({ message: "" });
    }
  };

  render() {
    const { messages } = this.props;

    return (
      <div className="chatFullDiv">
        <h3>Chat Room</h3>

        <div className="chatMsgDiv" ref={this.chatDiv}>
          {messages
            ? messages.map((m, i) =>
                m.name ? (
                  <p key={i} className={`chatMsg ${i % 2 ? "chatMsg1" : null}`}>
                    {m.name}: {m.message}
                  </p>
                ) : (
                  <p
                    key={i}
                    className={`chatMsg ${
                      i % 2 ? "chatMsg1" : null
                    } chatLeaveMsg`}
                  >
                    {m.message}
                  </p>
                )
              )
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
