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
  leaveGame
} from "../../firebase/firebase";
import { v4 as uuidv4 } from "uuid";
import { useParams, useHistory, useLocation } from "react-router-dom";
import "./TicTacToe.style.scss";

const TicTacToe = () => {
  
  // meta data
  fireBaseInit();
  const db = getDatabase();
  const [roomId, setRoomId] = useState("");
  const [gameData, setGameData] = useState([]);
  const [player, setPlayer] = useState(1);
  
  // watch firebase
  const roomRef = firebase.database().ref("tictactoe/" + roomId);
  const [data] = useObject(roomRef);
  const [gameStatus] = useObjectVal(firebase.database().ref("tictactoe/" + roomId + "/gameStatus"));
  const [winList] = useObject(firebase.database().ref("tictactoe/" + roomId + "/winList"));

  // data from firebase session
  const [sessionData, setSessionData] = useState({});
  const [role, setRole] = useState("player");
  
  //dom variables
  const [joinName, setJoinName] = useState("");
  const [getName,setGetName] = useState(false)
  
  // navigation hooks
  let history = useHistory();
  let location = useLocation();
  let { joinId } = useParams();


  // init for component did mount.
  useEffect(() => {
    init()
    // eslint-disable-next-line
  }, []);

  // update dom when game data changes
  useEffect(() => {
    if (!roomId) return;
    let val = data ? data.val() : { data: [] };
    if (!val) return;
    setSessionData(val);
    setGameData(val.data);
    (() => (gameStatus === "draw" ? alert("game draw") : gameStatus === 'over' ? alert('game over'): gameStatus === 'hostLeft' ? quitGame(roomId) : null))();
    // eslint-disable-next-line
  }, [data, gameStatus, winList, roomId, joinId]);

  // on page mount
  
  const init = async () => {
    console.log('init',location.state);
    if (!joinId) {
      if (!roomId || roomId === "") return newGame();
      setPlayer(1);
    } else {
      if(!(location.state && location.state.fromHome)){
          setRoomId(joinId.split(":")[1]);
          setPlayer(2);
          setGetName(true)
      }else{
        setRoomId(joinId.split(":")[1]);
        setPlayer(2);
        handleJoinGame(joinId.split(':')[1],location.state.name)
      }
    }
  }

  
  const newGame = async (val) => {
    let name = location.state ? location.state.name : '';
    const roomId = uuidv4();
    setRoomId(roomId);
    newGameInit(db, "tictactoe", roomId,name);
    setPlayer(1);
    setRole("host");
  };
  
  // ******************** player one features *******************//
  const resetGameHandler = async () => {
    resetGame(db, "tictactoe", roomId);
  };

  const quitGame = (id) => {
    if(player === 2) alert('game has been ended by host')
    removeGame(db, "tictactoe", id);
    history.push("/");
  };

    // ******************** player two features *******************//

  const handleJoinGame = async (id,name) => {
    joinGame(db, "tictactoe/", id, name);
    setRoomId(id);
  };


  const leaveRoom = (id,player) => {
    console.log(sessionData);
    if(sessionData.player2.isActive){
      leaveGame(db, "tictactoe", id,player);
    }else{
      quitGame(roomId)
    }
    history.push("/");
  };

  // ******************** common features *******************//

  // update board using firebase
  const updateTile = (id) => {
    if (sessionData.player1.isActive && player === 1)
      return updateGameBoard(db, "tictactoe/" + roomId, player, id);
    if (sessionData.player2.isActive && player === 2)
      return updateGameBoard(db, "tictactoe/" + roomId, player, id);
  };

  // check win conditions
  const checkTile = (id) => {
    if (!winList || winList.val()?.length < 2) return "";
    if (winList.val()?.includes(id)) return "win";
  };

  return (
    <>
      {getName ? (
                <>
                  <input
                  type="text"
                  onChange={(e) => setJoinName(e.target.value)}
                  value={joinName} />
                  <button onClick={() => {
                    setGetName(false) 
                    console.log(joinId.split(":")[1]);
                    handleJoinGame(joinId.split(":")[1],joinName)
                    }}>join game</button>
                </>
            ) : 
            gameData && sessionData && sessionData.player1 ? (
        <div className="ttt-container">
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
          {role === "host" ? (
            <div className="game-controls">
              <button onClick={() => leaveRoom(roomId,player)}>quit</button>
              <button onClick={() => resetGameHandler()}>reset</button>
            </div>
          ) : (
            <button onClick={() => leaveRoom(roomId,player)}>Leave Game</button>
          )}
          <div className="share-code" onClick={() => {navigator.clipboard.writeText(window.location.host+'/game/:'+roomId)}}>
            {window.location.host}/game/:{roomId}
          </div>
        </div>
      ):
       (
        <span>loadning ...</span>
       )}
    </>
  );
};

export default TicTacToe;
