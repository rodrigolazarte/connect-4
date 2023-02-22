import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { createContext, useState } from 'react';


export const BoardContext = createContext();
export const TOKENS_QUANTITY = 21;

const Provider = ({children}) => {
  const [winner, setWinner] = useState(false);
  const setWinnerTrue = () => setWinner(true);
  const setWinnerFalse = () => setWinner(false);
  const [yellowTokens, setYellowTokens] = useState(TOKENS_QUANTITY);
  const [redTokens, setRedTokens] = useState(TOKENS_QUANTITY);
  const [turn, setTurn] = useState('red')
  
  return (
    <BoardContext.Provider value={{winner, setWinnerTrue, setWinnerFalse, turn, setTurn, yellowTokens, setYellowTokens, redTokens, setRedTokens}}>
      {children}
    </BoardContext.Provider>
  )
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider>
      <App />
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
