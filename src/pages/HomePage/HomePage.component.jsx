import { useState } from "react";
import { useHistory, Link } from "react-router-dom";
import "./HomePage.styles.scss";

const HomePage = () => {
  const [inputId, setInputId] = useState("");
  const [name, setName] = useState(""); 
  const [name2, setName2] = useState(""); 
  const [roomId] = useState()
  let history = useHistory();

  const handleJoinGame = () => {
    history.push("/game/:" + inputId,{name:name2,fromHome:true});
  };

  const handleText = (val) => {
    setInputId(val);
  };

  return (
    <div className='main-container'>
      <div style={{textAlign:'center'}}>Tic Tac Toe</div>
      <div className="homePage">
        <div className="create-game container">
          <div className="label">Enter Name</div>
          <div>
            <input
              type="text"
              onChange={(e) => setName(e.target.value)}
              value={name}
            />
          </div>
          <div className="label">Create Game</div>
          <div>
            <button >
              <Link 
              style={{pointerEvents: roomId? 'none' :'auto'}}
                to={{
                  pathname: `/game`,
                  state: { name: name },
                }}
              >
                Start New Game
              </Link>
            </button>
          </div>
        </div>

        <div className="join-game container">
          <div className="label">Enter Name</div>
          <input
            type="text"
            onChange={(e) => setName2(e.target.value)}
            value={name2}
          />
          <div className="label">Enter Code</div>
          <input
            type="text"
            onChange={(e) => handleText(e.target.value)}
            value={inputId}
          />
          <button onClick={handleJoinGame}>join game</button>
        </div>
      </div>
    </div>
  );
};

export default HomePage;