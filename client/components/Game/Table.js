import React, { Component } from "react";
import { connect } from "react-redux";

class Table extends Component {
  render() {
    return (
      <div>
        <h3>Table</h3>
      </div>
    );
  }
}

const mapState = (state) => ({});

export default connect(mapState)(Table);
