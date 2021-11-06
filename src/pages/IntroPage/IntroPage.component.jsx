import Title from "../../components/Title/Title.Component";
import "./IntroPage.styles.scss";
import VectorX from "./VectorX.svg";
import VectorO from "./VectorO.svg";
import Play from "./play.svg";
import { Link, useHistory } from "react-router-dom";
import { motion } from "framer-motion";

const IntroPage = () => {
  let history = useHistory();
  const transition = { duration: 0.6, ease: [0.43, 0.13, 0.23, 0.96] };

  const handlePlay = () => {
    history.push("/home");
  };
  return (
    <div className="main-container-intro">
      <Title style={{ fontSize: "100px", minHeight: "100px" }}>
        Tic Tac Toe
      </Title>
      <div className="play-container">
        <div>Play</div>
        <motion.div
          whileHover={{ scale: 1.1 }}
          transition={transition}
          exit={{scale: 100.0,}}
        >
          <Link to="/home">
            <Play className="introVector" />
          </Link>
        </motion.div>
      </div>
    </div>
  );
};

export default IntroPage;
