import { motion } from "framer-motion";
import { useState } from "react";
import { useHistory, Link } from "react-router-dom";
import Button from "../../components/Button/Button.Component";
import Input from "../../components/Input/Input.Component";
import Title from "../../components/Title/Title.Component";
import "./HomePage.styles.scss";
import Play from './play.svg'

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
  const transition = { duration: 0.6, ease: [0.43, 0.13, 0.23, 0.96] };

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
              
            <Button style={{position:'relative'}}>
              <div style={{height:40,position:'absolute',left:-5,top:-10}}>
            <motion.div
             transition={transition}
             initial={{scale: 500.0,}}
             animate={{scale:1}}
             exit={{scale: 500.0}}
             style={{padding:0,margin:0}}
             >
              <Play style={{height:40}} />
            </motion.div>
            </div>
              <Link
                style={{ pointerEvents: roomId ? 'none' : 'auto' }}
                to={{
                  pathname: `/game`,
                  state: { name: name },
                }}
              >
                New Game
              </Link>
            </Button>
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
