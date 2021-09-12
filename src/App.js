import "./App.css";
import { useObject, useObjectVal } from "react-firebase-hooks/database";
import "firebase/compat/firestore";
import "firebase/compat/app";
import { getDatabase } from "firebase/database";
import { useEffect, useState } from "react";
import firebase, {resetGame,joinGame, newGameInit, fireBaseInit,updateGameBoard, removeGame } from "./firebase/firebase";
import { v4 as uuidv4 } from 'uuid';
import axios from "axios";
import HomePage from "./pages/HomePage/HomePage";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import TicTacToe from "./pages/TicTacToe/TicTacToe";

function App() {
 
  return (
    <Router>
    <div className="App">
      <header className="App-header"></header>
      <section>
      <Switch>
          <Route path="/home">
            <HomePage />
          </Route>
          <Route path="/game/:joinId">
            <TicTacToe />
          </Route>
          <Route path="/game/">
            <TicTacToe />
          </Route>
          <Route path="/">
            <HomePage />
          </Route>
        </Switch>
      </section>
    </div>
    </Router>
  );
}

function ChatRoom() {
  return <div>room</div>;
}

export default App;
