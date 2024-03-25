import React from "react";
import { Card as MuiCard, CardContent, Typography } from "@mui/material";
import { GameCardType } from "../../Api";

const getBorderColor = (cardType: string): string => {
  switch (cardType) {
    case "Bug":
      return "red";
    case "User":
      return "blue";
    case "Start":
      return "green";
    case "Middle":
      return "yellow";
    case "End":
      return "purple";
    default:
      return "grey";
  }
};

export default function GameCard({
  gameCardType,
}: {
  gameCardType: GameCardType;
}) {
  return (
    <MuiCard
      style={{
        width: "300px",
        height: "150px",
        margin: "20px",
        border: `10px solid ${getBorderColor(gameCardType.cardCategory)}`,
        display: "inline-block",
      }}
    >
      <CardContent>
        <Typography variant="body2" component="p">
          {gameCardType.text}
        </Typography>
      </CardContent>
    </MuiCard>
  );
}
