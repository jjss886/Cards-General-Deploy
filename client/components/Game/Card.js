import React from "react";

const suitSymbols = {
  Spades: [9824, "&spades;", "Black"],
  Clubs: [9827, "&clubs;", "Black"],
  Hearts: [9829, "&hearts;", "Red"],
  Diamonds: [9830, "&diams;", "Red"],
};

const Card = ({ card }) => (
  <div className={`cardDiv cardColor${suitSymbols[card.suit][2]}`}>
    {card.cover ? (
      <div className="cardCoverDiv">
        <span className="coveredText">Covered!</span>
      </div>
    ) : (
      <>
        <span>{card.value}</span>
        <span>{String.fromCharCode(suitSymbols[card.suit][0])}</span>
      </>
    )}
  </div>
);

export default Card;
