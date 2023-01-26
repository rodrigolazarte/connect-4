import { createContext, useState } from 'react';
import './App.css';
import Board from './components/board/board.component';
import PlayerContainer from './components/playerContainers/playerContainer.component';

export const BoardContext = createContext();

const Provider = ({children}) => {
  const [winner, setWinner] = useState(false);
  const setWinnerTrue = () => setWinner(true);
  const setWinnerFalse = () => setWinner(false);
  
  return (
    <BoardContext.Provider value={{winner, setWinnerTrue, setWinnerFalse}}>
      {children}
    </BoardContext.Provider>
  )
}

function App() {
  return (
    <Provider>
      <div className="App">
        <Board />
      </div>
    </Provider>
  );
}

export default App;
