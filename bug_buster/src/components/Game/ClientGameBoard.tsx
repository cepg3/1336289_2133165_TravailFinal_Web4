import React from 'react';
import { Box, Typography } from '@mui/material';
import ClientCard from './ClientCard';
import PlayerPoints from './PlayerPoints';

export default function ClientGameBoard({ gameId, playerId }: { gameId: number; playerId: number }) {

  // Log the player ID and game ID
  console.log("Player ID: ", playerId);
  console.log("Game ID: ", gameId);

  return (
    <Box sx={{ padding: 2 }}>
      <Typography variant="h4" gutterBottom>Tableau de jeu du Client</Typography>
      
      <ClientCard gameId={gameId} />

      <PlayerPoints playerId={playerId} />
    </Box>
  );
}
