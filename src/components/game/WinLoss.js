import { Link } from "react-router-dom"
import { NavBar } from "../nav/NavBar"

export const WinLoss = () => {
    return <>
    <NavBar />
    <h2>You either won or lost! Haven't gotten much further than that for the moment.</h2>
    <div className="btn-container"><Link to="/draft"><button className="btn btn-primary">Let's goooooo againnnnnnn</button></Link></div>
    </>
}