import React from "react";
import { Radio, RadioGroup, FormControlLabel, FormControl } from "@mui/material";
import GameCard from "./GameCard";
import { GameCardType } from "../../Api";
import { SelectedCards } from "../../interfaces/CardInterface";

interface GameCardRadioButtonProps {
  gameCardType: GameCardType;
  onSelectCard: (cardId: number, cardCategory: keyof SelectedCards) => void;
  selectedCardId: number | null;
}

export default function GameCardRadioButton({ gameCardType, onSelectCard, selectedCardId }: GameCardRadioButtonProps) {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onSelectCard(gameCardType.id, gameCardType.cardCategory as keyof SelectedCards);
  };

  const value = selectedCardId !== null ? selectedCardId.toString() : '';

  return (
    <div style={{ display: "flex", alignItems: "center" }}>
      <FormControl component="fieldset">
        <RadioGroup
          row
          aria-label={`${gameCardType.cardCategory}-selection`}
          name={`${gameCardType.cardCategory}-selection`}
          value={value}
          onChange={handleChange}
        >
          <FormControlLabel 
            value={gameCardType.id.toString()} 
            control={<Radio />} 
            label=""
          />
        </RadioGroup>
      </FormControl>
      <GameCard gameCardType={gameCardType} />
    </div>
  );
}
