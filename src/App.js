import { createContext, useContext, useState } from 'react';
import { BoardContext } from '.';
import './App.css';
import Board from './components/board/board.component';
import PlayerContainer from './components/playerContainer/playerContainer.component';
import TurnIndicator from './components/turnIndicator/turnIndicator.component';

function App() {
  const {turn, redTokens, yellowTokens} = useContext(BoardContext)

  return (
      <div className="App">
        <PlayerContainer 
          className='containerPlayerOne'
          animate={turn === 'red' ? 'animateRed' : ''}
          tokens={redTokens}
          >
            <h2>Player One</h2>
        </PlayerContainer>
        <PlayerContainer 
          className='containerPlayerTwo'
          animate={turn === 'yellow' ? 'animateYellow' : ''}
          tokens={yellowTokens}
          >
            <h2>Player Two</h2>
        </PlayerContainer>
        <TurnIndicator />
        <Board />
      </div>
  );
}

export default App;
