import React, { useState, useEffect } from "react";
import { Box } from "@mui/material";
import GameCard from "./GameCard";
import api from "../../Api";
import { GameCardType } from "../../Api";

export default function ClientCard({
  gameId,
  playerId,
}: {
  gameId: number;
  playerId: number;
}) {
  const [cards, setCards] = useState<GameCardType[]>([]);


  useEffect(() => {
    const fetchPlayerCards = async () => {
      if (gameId === 0 || playerId === 0 || playerId == null || gameId == null) return;

      const playerCards = await api.getGameCards(gameId);

      // Log the playerCards
      console.log("playerCards: ", playerCards);

      setCards(playerCards);
    };

    fetchPlayerCards();
  }, [gameId, playerId]);

  const userCard = cards.find((card) => card.cardCategory === "Bug");
  const bugCard = cards.find((card) => card.cardCategory === "User");

  return (
    <Box display="flex" justifyContent="center" alignItems="center">
      {userCard && <GameCard gameCardType={userCard} />}
      {bugCard && <GameCard gameCardType={bugCard} />}
    </Box>
  );
}
