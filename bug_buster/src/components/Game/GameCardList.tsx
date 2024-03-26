import React, { useState } from "react";
import { Typography, Box } from "@mui/material";
import GameCardRadioButton from "./GameCardRadioButton";
import { GameCardType } from "../../Api";
import { SelectedCards } from "../../interfaces/CardInterface";

interface GameCardListProps {
  cards: GameCardType[];
  onSelectCard: (cardId: number, cardCategory: keyof SelectedCards) => void;
}

export default function GameCardList({ cards, onSelectCard }: GameCardListProps) {
  const [selectedCardId, setSelectedCardId] = useState<number | null>(null);

  const handleSelectCard = (cardId: number, cardCategory: keyof SelectedCards) => {
    setSelectedCardId(cardId);
    onSelectCard(cardId, cardCategory);
  };

  return (
    <Box sx={{ margin: 2 }}>
      <Typography variant="h5" gutterBottom>
        {cards[0]?.cardCategory}
      </Typography>
      {cards.map((card) => (
        <GameCardRadioButton
          key={card.id}
          gameCardType={card}
          onSelectCard={handleSelectCard}
          selectedCardId={selectedCardId}
        />
      ))}
    </Box>
  );
}
