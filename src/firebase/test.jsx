import firebase from "firebase/compat";
import { ref, set, get, update, remove } from "firebase/database";

export const joinGame = async (db, query, id, data) => {
  set(ref(db, query + "/" + id), {
    id: id,
    player1: {
      ip: "",
      isActive: true,
    },
    player2: {
      ip: "",
      name: "waiting for player 2",
      isActive: false,
    },
    gameStatus: "on",
    winList: [""],
    data: {
      pos1: data.pos1,
      pos2: data.pos2,
      pos3: data.pos3,
      pos4: data.pos4,
    },
  });
};
