import React from "react";
import { Typography, Box } from "@mui/material";
import GameCardRadioButton from "./GameCardRadioButton";
import { GameCardType } from "../../Api";
import { SelectedCards } from "../../interfaces/CardInterface";

interface GameCardListProps {
  cards: GameCardType[];
  onSelectCard: (cardId: number, cardCategory: keyof SelectedCards) => void;
}

export default function GameCardList({ cards, onSelectCard }: GameCardListProps) {
  return (
    <Box sx={{ margin: 2 }}>
      <Typography variant="h5" gutterBottom>
        {cards[0]?.cardCategory}
      </Typography>
      {cards.map((card) => (
        <GameCardRadioButton key={card.id} gameCardType={card} onSelectCard={onSelectCard} />
      ))}
    </Box>
  );
}
