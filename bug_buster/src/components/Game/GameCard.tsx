import React from "react";
import { Card as MuiCard, CardContent, Typography } from "@mui/material";
import {GameCardType} from "../../Api";



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
  gameCardType
}: {
  gameCardType: GameCardType;
}) {
  return (
    <MuiCard
      style={{
        width: "300px",
        margin: "20px",
        border: `2px solid ${getBorderColor(gameCardType.cardCategory)}`,
        display: "inline-block",
        transform: "rotate(-90deg)",
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
