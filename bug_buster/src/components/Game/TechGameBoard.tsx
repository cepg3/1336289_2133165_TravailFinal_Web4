import React from 'react';
import { Box, Typography } from '@mui/material';
import ClientCard from './ClientCard';
import PlayerPoints from './PlayerPoints';
import CardListDisplay from './CardListDisplay';

export default function TechGameBoard() {
  // TODO Modifier les valeurs gameId et playerId pour correspondre à votre partie
  const gameId = Number("123");
  const playerId = Number("456");

  return (
    <Box sx={{ padding: 2 }}>
      <Typography variant="h4" gutterBottom>Tableau de jeu</Typography>
      
      <Box display="flex" justifyContent="space-around" alignItems="center" mb={4}>
        <ClientCard gameId={gameId} playerId={playerId} />
        <PlayerPoints gameId={gameId} playerId={playerId} />
      </Box>

      <CardListDisplay gameId={gameId} playerId={playerId} />
    </Box>
  );
}
