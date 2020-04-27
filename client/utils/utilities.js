const suits = ["Spades", "Hearts", "Diamonds", "Clubs"],
  values = ["2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K", "A"];

export const createDeck = () => {
  const deck = new Array();

  for (const value of values) {
    for (const suit of suits) {
      let weight1 = parseInt(val),
        weight2 = parseInt(val);

      // GENERAL CARD VALUES
      if (value === "J") weight1 = 11;
      if (value === "Q") weight1 = 12;
      if (value === "K") weight1 = 13;
      if (value === "A") weight1 = 1;

      // BETTER FOR CARD GAMBLING
      if (value === "J" || value === "Q" || value === "K") weight2 = 10;
      if (value === "A") weight2 = 11;

      deck.push({ value, suit, weight1, weight2, cover: false });
    }
  }

  return shuffleDeck(deck);
};

export const shuffleDeck = (deck) => {
  const newDeck = [...deck].map((_, i) => ({ ...deck[i] }));

  for (let i = 0; i < 1000; i++) {
    const one = Math.floor(Math.random() * deck.length),
      two = Math.floor(Math.random() * deck.length);

    [newDeck[two], newDeck[one]] = [newDeck[one], newDeck[two]];
  }

  return newDeck;
};
