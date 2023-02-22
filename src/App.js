import { createContext, useContext, useState } from 'react';
import { BoardContext } from '.';
import './App.css';
import Board from './components/board/board.component';
import PlayerContainer from './components/playerContainer/playerContainer.component';
import TurnIndicator from './components/turnIndicator/turnIndicator.component';
//import PlayerImage from './components/playerImage/playerImage.component';

/* export const BoardContext = createContext();

const Provider = ({children}) => {
  const [winner, setWinner] = useState(false);
  const setWinnerTrue = () => setWinner(true);
  const setWinnerFalse = () => setWinner(false);
  const [turn, setTurn] = useState('red')
  
  return (
    <BoardContext.Provider value={{winner, setWinnerTrue, setWinnerFalse, turn, setTurn}}>
      {children}
    </BoardContext.Provider>
  )
} */

function App() {
  const {turn} = useContext(BoardContext)

  return (
      <div className="App">
        <PlayerContainer 
          className='containerPlayerOne'
          animate={turn === 'red' ? 'animateRed' : ''}
          >
            <h2>Player One</h2>
        </PlayerContainer>
        <PlayerContainer 
          className='containerPlayerTwo'
          animate={turn === 'yellow' ? 'animateYellow' : ''}
          >
            <h2>Player Two</h2>
        </PlayerContainer>
        <TurnIndicator />
        <Board />
      </div>
  );
}

export default App;
