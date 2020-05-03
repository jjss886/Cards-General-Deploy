import React, { Component } from "react";
import { connect } from "react-redux";

class ChatRoom extends Component {
  render() {
    return (
      <div>
        <h3>Chat Room</h3>
      </div>
    );
  }
}

const mapState = (state) => ({ channel: state.channel });

export default connect(mapState)(ChatRoom);
