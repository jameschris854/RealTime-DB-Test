import "./App.css";
import "firebase/compat/firestore";
import "firebase/compat/app";
import HomePage from "./pages/HomePage/HomePage.component";
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import TicTacToe from "./pages/TicTacToe/TicTacToe";

function App() {
 
  return (
    <Router>
    <div className="App">
      <header className="App-header"></header>
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
    </div>
    </Router>
  );
}



export default App;
