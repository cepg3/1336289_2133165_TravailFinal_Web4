import React, { useState, useEffect } from "react";
import { Grid, Button } from "@mui/material";
import GameCardList from "./GameCardList";
import api from "../../Api";
import { GameCardType } from "../../Api";
import { SelectedCards } from "../../interfaces/CardInterface";

export default function CardListDisplay({ gameId, playerId }: { gameId: number; playerId: number }) {
  const [cards, setCards] = useState<GameCardType[]>([]);
  const [selectedCards, setSelectedCards] = useState<SelectedCards>({});

  useEffect(() => {
    const fetchPlayerCards = async () => {
      const playerCards = await api.getPlayerCards(gameId, playerId);
      setCards(playerCards);
    };

    fetchPlayerCards();
  }, [gameId, playerId]);
  
  const handleSelectCard = (cardId: number, cardCategory: keyof SelectedCards) => {
    setSelectedCards(prev => ({ ...prev, [cardCategory]: cardId }));
  };

  const handleSubmit = () => {
    const selectedCardsDetails = Object.values(selectedCards).map(id =>
      cards.find(card => card.id === id)
    );
    const phrase = selectedCardsDetails.map(card => card?.text).join(' ');
    console.log("Soumission de la phrase :", phrase);
  };

  const cardsStart = cards.filter(card => card.cardCategory === "Start");
  const cardsMiddle = cards.filter(card => card.cardCategory === "Middle");
  const cardsEnd = cards.filter(card => card.cardCategory === "End");

  return (
    <div>
      <Grid container spacing={2}>
        <Grid item xs={12} md={4}>
          <GameCardList cards={cardsStart} onSelectCard={handleSelectCard} />
        </Grid>
        <Grid item xs={12} md={4}>
          <GameCardList cards={cardsMiddle} onSelectCard={handleSelectCard} />
        </Grid>
        <Grid item xs={12} md={4}>
          <GameCardList cards={cardsEnd} onSelectCard={handleSelectCard} />
        </Grid>
      </Grid>
      <Button onClick={handleSubmit} variant="contained" color="primary">
        Soumettre la phrase
      </Button>
    </div>
  );
}
