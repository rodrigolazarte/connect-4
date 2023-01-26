import { useContext, useEffect, useState } from 'react'
import { BoardContext } from '../../App';
import './cell.css'

const Cell = ({ turn, evaluateBoard, id, markCellInBoard }) => {
    const {winner} = useContext(BoardContext);
    const [color, setColor] = useState('white');
    const handleClick = () => {
        if(color === 'white'){
            if(markCellInBoard(id, turn)){
                setColor(turn);
                evaluateBoard(id);
            }
        }  
    }
    useEffect(() => {
        setColor('white')
    }, [winner])

    return (
        <div className="cell" id={id} style={{ backgroundColor: color }} onClick={handleClick}></div>
    )
}

export default Cell;