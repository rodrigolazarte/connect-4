import { useContext } from 'react';
import { BoardContext } from '../../App';
import './playerImage.css'

const PlayerImage = (props) => {
    return(
        <div>
            <img src="/assets/player.png" className={`playerImage ${props.animation}`} />
        </div>
    )
}

export default PlayerImage;