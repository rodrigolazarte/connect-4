import { createContext, useState } from 'react';
import './App.css';
import Board from './components/board/board.component';
import TurnIndicator from './components/turnIndicator/turnIndicator.component';

export const BoardContext = createContext();

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
}

function App() {
  return (
    <Provider>
      <div className="App">
        <TurnIndicator />
        <Board />
      </div>
    </Provider>
  );
}

export default App;
