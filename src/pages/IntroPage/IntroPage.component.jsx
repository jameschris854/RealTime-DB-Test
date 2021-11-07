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
    <motion.div
    initial={{scale:0,translateY:-200}}
    animate={{scale:1,translateY:0}}
    exit={{opacity:0}}
    transition={transition}
    className="main-container-intro">
      <Title style={{ fontSize: "100px", minHeight: "100px" }}>TIC TAC TOE</Title>
      <div className="play-container">
        <div>Play</div>
        <div>
          <Link to="/home">
            <Play className="introVector" />
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

export default IntroPage;
