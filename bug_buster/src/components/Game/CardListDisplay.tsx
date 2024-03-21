import React, { useState, useEffect } from "react";
import { Grid } from "@mui/material";
import GameCardList from "./GameCardList";
import api from "../../Api";
import { GameCardType } from "../../Api";

export default function CardListDisplay({
  gameId,
  playerId,
}: {
  gameId: number;
  playerId: number;
}) {
  const [cards, setCards] = useState<GameCardType[]>([]);

  useEffect(() => {
    const fetchPlayerCards = async () => {
      const playerCards = await api.getPlayerCards(gameId, playerId);
      setCards(playerCards);
    };

    fetchPlayerCards();
  }, [gameId, playerId]);

  const cardsStart = cards.filter((card) => card.cardCategory === "Start");
  const cardsMiddle = cards.filter((card) => card.cardCategory === "Middle");
  const cardsEnd = cards.filter((card) => card.cardCategory === "End");

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} md={4}>
        <GameCardList cards={cardsStart} />
      </Grid>
      <Grid item xs={12} md={4}>
        <GameCardList cards={cardsMiddle} />
      </Grid>
      <Grid item xs={12} md={4}>
        <GameCardList cards={cardsEnd} />
      </Grid>
    </Grid>
  );
}
