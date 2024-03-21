import React, { useState } from "react";
import {
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
} from "@mui/material";
import GameCard from "./GameCard";
import { GameCardType } from "../../Api";

const getRadioGroupName = (cardCategory: string): string => {
  switch (cardCategory) {
    case "Bug":
      return "Bug";
    case "User":
      return "User";
    case "Start":
      return "Start";
    case "Middle":
      return "Middle";
    case "End":
      return "End";
    default:
      return "General";
  }
};

export default function GameCardRadioButton({
  gameCardType,
}: {
  gameCardType: GameCardType;
}) {
  const radioGroupName = getRadioGroupName(gameCardType.cardCategory);

  return (
    <div style={{ display: "flex", alignItems: "center" }}>
      <FormControl component="fieldset">
        <RadioGroup row aria-label={radioGroupName} name={radioGroupName}>
          <Radio />
        </RadioGroup>
      </FormControl>
      <GameCard gameCardType={gameCardType} />
    </div>
  );
}
