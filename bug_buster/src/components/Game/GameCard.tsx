import React from "react";
import { Card as MuiCard, CardContent, Typography } from "@mui/material";

type CardType = "Bug" | "User" | "Start" | "Middle" | "End";

const getBorderColor = (type: CardType): string => {
  switch (type) {
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
  text,
  type,
}: {
  text: string;
  type: CardType;
}) {
  return (
    <MuiCard
      style={{
        width: "300px",
        margin: "20px",
        border: `2px solid ${getBorderColor(type)}`,
        display: "inline-block",
        transform: "rotate(-90deg)",
      }}
    >
      <CardContent>
        <Typography variant="body2" component="p">
          {text}
        </Typography>
      </CardContent>
    </MuiCard>
  );
}
