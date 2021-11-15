import firebase from "firebase/compat";
import { ref, set, get, update, remove } from "firebase/database";


export const gameInit = async (db, query, id) => {

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
    player1_pos: {
      x: 0,
      y: 0
    },
    player2_pos: {
      x: 0,
      y: 0
    }
  });
};


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
    player1_pos: {
      x: data.pos1,
      y: data.pos2
    },
    player2_pos: {
      x: data.pos1,
      y: data.pos2
    }
  });
};

export const updateGame = async (db, query, id, data) => {
  let position = data.coordinates
  
  update(ref(db, query + "/" + id + "/" + [`player${data.player}_pos`] ), {
      x: position.pos1,
      y: position.pos2
  });
};