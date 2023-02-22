import { useContext } from "react";
import { BoardContext } from "../../index";
import "./turnIndicator.css"

const TurnIndicator = () => {
    const {turn} = useContext(BoardContext);

    return (
        <div className="turnIndicator">
            <h2>Color turn</h2>
            <section className="token" style={{backgroundColor: turn}} />
        </div>
    )
}

export default TurnIndicator;