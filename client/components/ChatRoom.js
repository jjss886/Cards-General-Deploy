import React, { Component } from "react";
import { connect } from "react-redux";

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

    const { message } = this.state;

    if (message.length) {
      // NEED TO SEND MESSAGE BACK TO REDUX & SOCKET

      this.setState({ message: "" });
    }
  };

  render() {
    return (
      <div>
        <h3>Chat Room</h3>

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
    );
  }
}

const mapState = (state) => ({ channel: state.channel });

export default connect(mapState)(ChatRoom);
