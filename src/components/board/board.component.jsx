import './board.css'
import Cell from '../cell/cell.component';
import { useContext, useEffect, useReducer, useState } from 'react';
import { BoardContext } from '../../App';
import PlayerContainer from '../playerContainers/playerContainer.component';

const Board = () => {
    var initialState = {};
    
    const {winner, setWinnerTrue, setWinnerFalse} = useContext(BoardContext);

    const [turn, setTurn] = useState('red');
    const [markedCells, setMarkedCells] = useState(initialState)

    const changeTurn = () => {
        if (turn === 'red') {
            setTurn('yellow');
        } else if (turn === 'yellow') {
            setTurn('red');
        }
    }

    useEffect(() => {
        setWinnerFalse();
        setTurn('red');
    }, [winner])

    const markCellInBoard = (cellId, color) => {
        let baseCellId = cellId + 7

        if (cellId >= 36) {
            markedCells[cellId] = color
            changeTurn()
            return true;
        } else if (markedCells[baseCellId]) {
            markedCells[cellId] = color
            changeTurn()
            return true;
        } else {
            console.log("No se pudo agregar ficha ahi")
            return false;
        }
    }

    const evaluateBoard = (cellId) => {
        let colorOfEvaluatedCell = markedCells[cellId];
        let winHorizontally = evaluateHorizontally(cellId, colorOfEvaluatedCell);
        let winVertically = evaluateVertically(cellId, colorOfEvaluatedCell);
        let winDiagonallyRight = evaluateDiagonallyToTheRight(cellId, colorOfEvaluatedCell);
        let winDiagonallyLeft = evaluateDiagonallyToTheLeft(cellId, colorOfEvaluatedCell);

        showWinner(colorOfEvaluatedCell, winHorizontally, winVertically, winDiagonallyLeft, winDiagonallyRight);        
    }

    const evaluateHorizontally = (cellId, colorOfEvaluatedCell) => {
        let consecutiveCellsToTheRight = -1;
        let consecutiveCellsToTheLeft = -1;
        var auxCellId = cellId;

        if (cellId % 7 !== 0) {
            //Evaluate cells to the right of the marked cell
            while (markedCells[auxCellId] === colorOfEvaluatedCell) {
                if ((auxCellId - 1) % 7 === 0) {
                    break;
                }
                consecutiveCellsToTheRight += 1;
                auxCellId = auxCellId + 1;
                if (consecutiveCellsToTheRight === 3) {
                    return true;
                }
            }
        }

        auxCellId = cellId;

        // Evaluate cells to the left of the marked cell
        while (markedCells[auxCellId] === colorOfEvaluatedCell) {
            if ((auxCellId - 1) % 7 === 0) {
                break;
            }
            consecutiveCellsToTheLeft += 1;
            auxCellId = auxCellId - 1;
            if (consecutiveCellsToTheLeft === 3) {
                return true;
            }
        }

        let consecutiveCells = consecutiveCellsToTheRight + consecutiveCellsToTheLeft;

        if (consecutiveCells >= 3) {
            return true;
        } else {
            return false;
        }
    }

    const evaluateVertically = (cellId, colorOfEvaluatedCell) => {
        let consecutiveCells = 0;
        if (cellId < 36) {
            while (markedCells[cellId] === colorOfEvaluatedCell && cellId <= 42) {
                consecutiveCells += 1;
                cellId = cellId + 7;
            }
        }

        if (consecutiveCells >= 4) {
            return true;
        } else {
            return false;
        }
    }

    const evaluateDiagonallyToTheRight = (cellId, colorOfEvaluatedCell) => {
        let consecutiveCellsToTheRight = 0;
        let consecutiveCellsToTheLeft = 0;
        let auxCellId = cellId;

        //Execute loop if the cell isn't in the right limit of the board
        if ((cellId % 7) !== 0) {
            while (markedCells[auxCellId - 6] === colorOfEvaluatedCell) {
                if ((auxCellId - 6) % 7 === 0) {
                    consecutiveCellsToTheRight += 1;
                    break;
                } else {
                    consecutiveCellsToTheRight += 1;
                    auxCellId -= 6
                }
            }
        }

        auxCellId = cellId;

        //Execute loop if the cell isn't in the base of the board
        if (auxCellId < 36) {
            while (markedCells[auxCellId + 6] === colorOfEvaluatedCell) {
                if ((auxCellId + 6) % 7 === 0) {
                    break;
                } else {
                    consecutiveCellsToTheLeft += 1;
                    auxCellId += 6
                }
            }
        }

        if ((consecutiveCellsToTheRight + consecutiveCellsToTheLeft) >= 3) {
            return true;
        } else {
            return false;
        }
    }

    const evaluateDiagonallyToTheLeft = (cellId, colorOfEvaluatedCell) => {
        let consecutiveCellsToTheRight = 0;
        let consecutiveCellsToTheLeft = 0;
        let auxCellId = cellId;

        //Evaluate loop if the cell isn't in the left limit of the board
        if (auxCellId - 1 > 0 && (auxCellId - 1) % 7 !== 0) {
            while (markedCells[auxCellId - 8] === colorOfEvaluatedCell) {
                if (auxCellId - 8 <= 0 || (auxCellId - 8) % 7 === 0) {
                    break;
                } else {
                    consecutiveCellsToTheLeft += 1;
                    auxCellId -= 8;
                }
            }
        }

        auxCellId = cellId;

        //Evaluates if the cell isn't in the base of the board neither in the right limit of the second row. Also validates if cell isn't in the right
        //side of the board.
        if(auxCellId < 35 && auxCellId % 7 !== 0) {
            while(markedCells[auxCellId + 8] === colorOfEvaluatedCell) {
                if((auxCellId + 8) % 7 === 0){
                    consecutiveCellsToTheRight += 1;
                    break;
                } else {
                    consecutiveCellsToTheRight += 1;
                    auxCellId += 8;
                }
            }
        }

        if((consecutiveCellsToTheLeft + consecutiveCellsToTheRight) >= 3) {
            return true;
        } else {
            return false
        }
    }

    const showWinner = (winnerColor, ...arr) => {
        if(arr.find(element => element === true)){
            setWinnerTrue();
            alert(`FELICIDADES! HAS GANADO CON EL COLOR: ${winnerColor}!!`)
            setMarkedCells({});
            return true;
        }
    }

    return (
        <div>
            <PlayerContainer />
            <div className="board">
                {[...Array(42)].map((x, i) =>
                    <Cell
                        key={i + 1}
                        id={i + 1}
                        turn={turn}
                        evaluateBoard={evaluateBoard}
                        markCellInBoard={markCellInBoard} />
                )}
            </div>
        </div>
        
    )
}

export default Board;