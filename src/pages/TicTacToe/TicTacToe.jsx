import { useObject, useObjectVal } from "react-firebase-hooks/database";
import "firebase/compat/firestore";
import "firebase/compat/app";
import { getDatabase } from "firebase/database";
import { useEffect, useState } from "react";
import firebase, {
  resetGame,
  joinGame,
  newGameInit,
  fireBaseInit,
  updateGameBoard,
  removeGame,
} from "../../firebase/firebase";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";
import { useParams, useHistory, useLocation } from "react-router-dom";
import './TicTacToe.style.scss'

const TicTacToe = () => {
  fireBaseInit();
  const db = getDatabase();
  const [roomId, setRoomId] = useState("");
  const [gameData, setGameData] = useState([]);
  const dbcounter = firebase.database().ref("tictactoe/" + roomId);
  const [data] = useObject(dbcounter);
  const [gameStatus] = useObjectVal(
    firebase.database().ref("tictactoe/" + roomId + "/gameStatus")
  );
  const [winList] = useObject(
    firebase.database().ref("tictactoe/" + roomId + "/winList")
  );
  const [player, setPlayer] = useState(1);
  const [sessionData, setSessionData] = useState({});
  const [ip, setIp] = useState("");
  let { joinId } = useParams();
  let history = useHistory();
  let location = useLocation();

  useEffect(() => {
    if(!joinId){
        if(!roomId || roomId === '') return newGame()
        setPlayer(1)
    }else{
        setRoomId(joinId.split(':')[1])
        handleJoinGame(joinId.split(':')[1])
        setPlayer(2)
    }
    getIp()
    },[])

    useEffect(() => {
        return async () => {
          let id = localStorage.getItem('roomId')
          localStorage.clear('roomId')
          console.log("cleaned up",id,'aasda');
        };
      }, []);

  useEffect(() => {
    console.log("component did mount");
    console.log(roomId);
    if (!roomId) return;
    console.log(data, "aaaaaaaaa");
    let val = data ? data.val() : { data: [] };
    if (!val) return;
    setSessionData(val);
    setGameData(val.data);
    (() => (gameStatus === "draw" ? alert("game draw") : null))();
  }, [data, gameStatus, winList, roomId,joinId]);

  //creating function to load ip address from the API
  const getIp = async () => {
    const res = await axios.get("https://geolocation-db.com/json/");
    console.log(res);
    setIp(res.data.IPv4);
    return res.data.IPv4;
  };

  const newGame = async (val) => {
    let name = location.state ? location.state.name : "er";
    const roomId = uuidv4();
    console.log(roomId);
    let ip = await getIp();
    setRoomId(roomId);
    newGameInit(db, "tictactoe", roomId, ip, name);
    setPlayer(1);
    localStorage.setItem('roomId',roomId)
  };

  const resetGameHandler = async () => {
    resetGame(db, "tictactoe", roomId, ip);
  };

  const handleJoinGame = async (id) => {
    let name = location.state ? location.state.name : "er";
    console.log(id);
    let ip = await getIp();
    joinGame(db, "tictactoe/" + roomId, id, ip,name);
    setRoomId(id);
  };

  const quitGame = (id) => {
      console.log('aaaaaaaaaaaaaaaaaaaaaaaaaaa');
    removeGame(db, "tictactoe", id);
    history.push("/");
  };

  const updateTile = (id) => {
    if (sessionData.player1.isActive && player === 1)
      return updateGameBoard(db, "tictactoe/" + roomId, player, id);
    if (sessionData.player2.isActive && player === 2)
      return updateGameBoard(db, "tictactoe/" + roomId, player, id);
  };

  const checkTile = (id) => {
    if (!winList || winList.val().length < 2) return "";
    if (winList.val().includes(id)) return "win";
  };
  console.log(gameData, sessionData);
  return (
    <>
      {gameData && sessionData && sessionData.player1 ? (
        <div className='ttt-container'>
          <div className="box">
            <div className="player">
              {sessionData && sessionData.player1 && sessionData.player1.name}
            </div>
            <div className="tile-container">
              {gameData &&
                gameData.map((item, key) => (
                  <div
                    className={`tile ${checkTile(key)}`}
                    key={key}
                    onClick={() => updateTile(key)}
                  >
                    <div>{item}</div>
                  </div>
                ))}
            </div>
            <div className="player">
              {sessionData && sessionData.player2 && sessionData.player2.name}
            </div>
          </div>
          <button onClick={() => quitGame(roomId)}>quit</button>
          <button onClick={() => resetGameHandler()}>reset</button>
          <div className='share-code'>{window.location.host}/game/:{roomId}</div>
        </div>
      ) : (
        <span>loadning ...</span>
      )}
    </>
  );
};

export default TicTacToe;
