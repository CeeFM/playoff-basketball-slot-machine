import { Link } from "react-router-dom"
import { NavBar } from "../nav/NavBar"

export const Loss = () => {
    return <>
    <NavBar />
    <h2>YOU LOST</h2>
    <h4>Your Record Against the CPU is</h4>
    <div className="btn-container"><Link to="/draft"><button className="btn btn-primary">Let's goooooo againnnnnnn</button></Link></div>
    </>
}