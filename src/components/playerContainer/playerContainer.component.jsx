import './playerContainer.css'
import PlayerImage from '../playerImage/playerImage.component';

const PlayerContainer = (props) => {
    return (
        <div className={`playerContainer ${props.className}`} >
            {props.children}
            <PlayerImage animation={props.animate}/>
        </div>
    )
}

export default PlayerContainer;