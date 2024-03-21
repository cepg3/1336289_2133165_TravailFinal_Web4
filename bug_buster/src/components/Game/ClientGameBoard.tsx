import React from 'react';
import { Box, Typography } from '@mui/material';
import ClientCard from './ClientCard';
import PlayerPoints from './PlayerPoints';

export default function ClientGameBoard({ gameId, playerId }: { gameId: number; playerId: number }) {

  return (
    <Box sx={{ padding: 2 }}>
      <Typography variant="h4" gutterBottom>Tableau de jeu du Client</Typography>
      
      <ClientCard gameId={gameId} playerId={playerId} />

      <PlayerPoints gameId={gameId} playerId={playerId} />
    </Box>
  );
}
