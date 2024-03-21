import React from 'react';
import { Box, Typography } from '@mui/material';
import ClientCard from './ClientCard';
import PlayerPoints from './PlayerPoints';
import CardListDisplay from './CardListDisplay';

export default function TechGameBoard({ gameId, playerId, clientId }: { gameId: number; playerId: number; clientId: number}) {

  return (
    <Box sx={{ padding: 2 }}>
      <Typography variant="h4" gutterBottom>Tableau de jeu</Typography>
      
      <Box display="flex" justifyContent="space-around" alignItems="center" mb={4}>
        <ClientCard gameId={gameId} playerId={clientId} />
        <PlayerPoints gameId={gameId} playerId={playerId} />
      </Box>

      <CardListDisplay gameId={gameId} playerId={playerId} />
    </Box>
  );
}
