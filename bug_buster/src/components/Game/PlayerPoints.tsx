import React, { useState, useEffect } from "react";
import { Box, Typography } from "@mui/material";
import api from "../../Api";

export default function PlayerPoints({ playerId }: { playerId: number }) {
  const [playerPoints, setPlayerPoints] = useState<number>(0);

  useEffect(() => {
    const fetchPlayerPoints = async () => {
      if (playerId === 0 || playerId == null) return;

      try {
        const player = await api.getPlayerById(playerId);
        setPlayerPoints(player.points);
      } catch (error) {
        console.error("Erreur lors de la récupération des points du joueur:", error);
      }
    };

    fetchPlayerPoints();
  }, [playerId]);

  return (
    <Box display="flex" justifyContent="center" alignItems="center">
      <Typography variant="h6">Points: {playerPoints}</Typography>
    </Box>
  );
}
