import React, { useState, useEffect } from 'react';
import { Box } from '@mui/material';
import GameCard from './GameCard';
import api from '../../Api';
import { GameCardType } from '../../Api';

export default function ClientCard({ gameId, playerId } : { gameId: number, playerId: number }) {
  const [cards, setCards] = useState<GameCardType[]>([]);

  useEffect(() => {
    const fetchPlayerCards = async () => {
      const playerCards = await api.getPlayerCards(gameId, playerId);
      setCards(playerCards);
    };

    fetchPlayerCards();
  }, [gameId, playerId]);

  const userCard = cards.find(card => card.cardCategory === 'User');
  const bugCard = cards.find(card => card.cardCategory === 'Bug');

  return (
    <Box display="flex" justifyContent="center" alignItems="center">
      {userCard && <GameCard gameCardType={userCard} />}
      {bugCard && <GameCard gameCardType={bugCard} />}
    </Box>
  );
}
