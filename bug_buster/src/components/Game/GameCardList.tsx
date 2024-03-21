import React from "react";
import { Typography, Box } from "@mui/material";
import GameCardRadioButton from "./GameCardRadioButton";
import { GameCardType } from "../../Api";

export default function GameCardList({ cards }: { cards: GameCardType[] }) {
  return (
    <Box sx={{ margin: 2 }}>
      <Typography variant="h5" gutterBottom>
        {cards[0].cardCategory}
      </Typography>
      {cards.map((card) => (
        <GameCardRadioButton key={card.id} gameCardType={card} />
      ))}
    </Box>
  );
}
