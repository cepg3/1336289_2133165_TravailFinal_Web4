import React, { useEffect, useRef } from "react";
import { UserContextType } from "../Login/UserContext";
import { CircularProgress, Box, Button } from "@mui/material";
import api, { GameType, PlayerType } from "../../Api";
import TechGameBoard from "./TechGameBoard";
import ClientGameBoard from "./ClientGameBoard";

export default function Game({
  gameCode,
  user,
  setUser,
  keepChecking,
  setKeepChecking,
}: {
  gameCode: string;
  user: UserContextType;
  setUser: (user: UserContextType) => void;
  keepChecking: boolean;
  setKeepChecking: (keepChecking: boolean) => void;
}) {
  const [game, setGame] = React.useState<GameType | null>(null);

  const handleStartGame = async () => {
	if (game && user.id !== null && user.id !== undefined) {
	  await api.startGame(game.id);
	  
	  if (!game.current_client_player_id) {
		setGame({
		  ...game,
		  is_started: true,
		  current_client_player_id: user.id,
		});
	  } else {
		setGame({
		  ...game,
		  is_started: true,
		});
	  }
	} else {
	  console.error(
		"Erreur : Le jeu n'est pas défini ou l'ID de l'utilisateur est indéfini."
	  );
	}
  };
  

  useEffect(() => {
    if (!keepChecking) return;

    const checkUserAndGame = async () => {
      console.log("Checking username : ", user.username);
      let currentUser = user;

      const isUsernameTaken = await api.isUsernameTaken(user.username);
      if (isUsernameTaken) {
        console.log("Username already taken : ", user.username);
        const playerInfo = await api.getPlayer(user.username);
        currentUser = {
          ...playerInfo,
          is_in_game: true,
          is_client: true,
        };
      } else {
        const newUser = await api.createPlayer(user.username);
        console.log("User created : ", newUser.username);
        currentUser = {
          ...newUser,
          is_in_game: true,
          is_client: true,
        };
        setUser(currentUser);
      }
      const gameExist = await api.doesGameExist(gameCode);
      let gameData = null;
      if (gameExist) {
        gameData = await api.getGame(gameCode);
      } else {
        gameData = await api.createGame(gameCode);
      }

      if (
        gameData &&
        gameData.id !== null &&
        currentUser &&
        currentUser.id !== null
      ) {
        const joinedGame = await api.joinGame(gameData.id, currentUser.id);
        console.log("Joined game: ", joinedGame);
        setGame(joinedGame);
        setKeepChecking(false);
      } else {
        console.log(
          "Impossible de rejoindre le jeu : ID de jeu ou d'utilisateur manquant."
        );
      }
    };

    checkUserAndGame();
  }, [user, keepChecking, gameCode]);

  if (!game) {
    return <div>Chargement...</div>;
  } else {
    if (game.is_started === false) {
      return <Button onClick={handleStartGame}>Démarrer le jeu</Button>;
    }

    const isClient = user.id === game.current_client_player_id;

    console.log("Utilisateur : ", user);
    console.log("Jeu : ", game);

    return isClient ? (
      <ClientGameBoard gameId={game.id} playerId={user.id!} />
    ) : (
      <TechGameBoard
        gameId={game.id}
        playerId={user.id!}
        clientId={game.current_client_player_id}
      />
    );
  }
}
