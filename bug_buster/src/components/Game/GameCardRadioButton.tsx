import React from "react";
import { Radio, RadioGroup, FormControlLabel, FormControl } from "@mui/material";
import GameCard from "./GameCard";
import { GameCardType } from "../../Api";
import { SelectedCards } from "../../interfaces/CardInterface";

interface GameCardRadioButtonProps {
  gameCardType: GameCardType;
  onSelectCard: (cardId: number, cardCategory: keyof SelectedCards) => void;
}

export default function GameCardRadioButton({ gameCardType, onSelectCard }: GameCardRadioButtonProps) {
  const handleChange = () => {
    onSelectCard(gameCardType.id, gameCardType.cardCategory as keyof SelectedCards);
  };

  return (
    <div style={{ display: "flex", alignItems: "center" }}>
      <FormControl component="fieldset">
        <RadioGroup row aria-label="game-card-selection" name="game-card-selection">
          <FormControlLabel control={<Radio onChange={handleChange} />} label="" />
        </RadioGroup>
      </FormControl>
      <GameCard gameCardType={gameCardType} />
    </div>
  );
}
