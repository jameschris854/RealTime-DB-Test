import { useState } from "react";
import { useHistory, Link } from "react-router-dom";
import Button from "../../components/Button/Button.Component";
import Input from "../../components/Input/Input.Component";
import Title from "../../components/Title/Title.Component";
import "./HomePage.styles.scss";

const HomePage = () => {
  const [inputId, setInputId] = useState("");
  const [name, setName] = useState("");
  const [name2, setName2] = useState("");
  const [roomId] = useState()
  let history = useHistory();

  const handleJoinGame = () => {
    history.push("/game/:" + inputId, { name: name2, fromHome: true });
  };

  const handleText = (val) => {
    setInputId(val);
  };

  return (
    <div className='main-container'>
      <Title>Tic Tac Toe</Title>
      <div className="homePage">
        <div className="create-game container">
          <div className="label">Enter Name</div>
          <div>
            <Input
              type="text"
              onChange={(e) => setName(e.target.value)}
              value={name}
            />
          </div>
          <div className="label">Create Game</div>
          <div>
            <Button >
              <Link
                style={{ pointerEvents: roomId ? 'none' : 'auto' }}
                to={{
                  pathname: `/game`,
                  state: { name: name },
                }}
              >
                Start New Game
              </Link>
            </Button>
          </div>
        </div>

        <div className="join-game container">
          <div className="label">Enter Name</div>
          <Input
            type="text"
            onChange={(e) => setName2(e.target.value)}
            value={name2}
          />
          <div className="label">Enter Code</div>
          <Input
            type="text"
            onChange={(e) => handleText(e.target.value)}
            value={inputId}
          />
          <Button handleClick={handleJoinGame}>join game</Button>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
