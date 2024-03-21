import React from "react";
import { Grid } from "@mui/material";
import GameCardList from "./GameCardList";
import { GameCardType } from "../../Api";

const cardsCategory1: GameCardType[] = [];
const cardsCategory2: GameCardType[] = [];
const cardsCategory3: GameCardType[] = [];

export default function CardListDisplay() {
  return (
    <Grid container spacing={2}>
      <Grid item xs={12} md={4}>
        <GameCardList cards={cardsCategory1} />
      </Grid>
      <Grid item xs={12} md={4}>
        <GameCardList cards={cardsCategory2} />
      </Grid>
      <Grid item xs={12} md={4}>
        <GameCardList cards={cardsCategory3} />
      </Grid>
    </Grid>
  );
}
