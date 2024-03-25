import React, { useState, useEffect } from "react";
import { Box } from "@mui/material";
import GameCard from "./GameCard";
import api from "../../Api";
import { GameCardType } from "../../Api";

export default function ClientCard({
  gameId,
}: {
  gameId: number;
}) {
  const [cards, setCards] = useState<GameCardType[]>([]);


  useEffect(() => {
    const fetchPlayerCards = async () => {
      if (gameId === 0 || gameId == null) return;

      const clientCard = await api.getGameCards(gameId);

      setCards(clientCard);
    };

    fetchPlayerCards();
  }, [gameId]);

  const userCard = cards.find((card) => card.cardCategory === "Bug");
  const bugCard = cards.find((card) => card.cardCategory === "User");

  return (
    <Box display="flex" justifyContent="center" alignItems="center">
      {userCard && <GameCard gameCardType={userCard} />}
      {bugCard && <GameCard gameCardType={bugCard} />}
    </Box>
  );
}
