import { useState } from "react";
import { useHistory,Link } from "react-router-dom";

const HomePage = () => {
  const [inputId, setInputId] = useState("");
  const [name, setName] = useState("");
  let history = useHistory();

  const handleCreateGame = () => {
    history.push("/game");
  };

  const handleJoinGame = () => {
    history.push("/game/:" + inputId);
  };

  const handleText = (val) => {
    setInputId(val);
  };

  return (
    <div className="homePage">
      <div>Enter Name</div>
      <div>
        <input
          type="text"
          onChange={(e) => setName(e.target.value)}
          value={name}
        />
      </div>
      <div>Create Game</div>
      <div>
        <Link
          to={{
            pathname: `/game`,
            state:{name:name}
          }}
        >
          Start New Game
        </Link>
      </div>
      <div>join Game</div>
      <div>
        <input
          type="text"
          onChange={(e) => handleText(e.target.value)}
          value={inputId}
        />
        <button onClick={handleJoinGame}>join game</button>
      </div>
    </div>
  );
};

export default HomePage;
