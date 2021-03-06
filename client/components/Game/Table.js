import React, { Component } from "react";
import { connect } from "react-redux";
import Card from "./Card";

class Table extends Component {
  render() {
    const { deck, table, trash } = this.props;

    return (
      <div className="tableFullDiv">
        <h3>Table</h3>

        {deck && deck.length ? <Card card={deck.slice(-1)[0]} /> : null}

        {table && table.length ? <Card card={table.slice(-1)[0]} /> : null}

        {trash && trash.length ? <Card card={trash.slice(-1)[0]} /> : null}
      </div>
    );
  }
}

const mapState = (state) => ({
  deck: state.channel.deck,
  table: state.channel.table,
  trash: state.channel.trash,
});

export default connect(mapState)(Table);
