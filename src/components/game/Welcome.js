//Welcome Page Content - First Time Users (Returning User Welcome Page TBD)

import { Link } from "react-router-dom"
import logo from "../images/funnybball.jpg"

export const Welcome = () => {
    return <>
    <img src={logo}></img>
    <h2 className="welcome-top">GET READY, YOU'RE STEPPING INTO A FAST-PACED, HIGH STAKES, FANTASY BASKETBALL GAME</h2>
    <br />
    <h5 className="another-welcome">Oh what, you were expecting some walk in the park, relaxing, enjoyable experience? Privileged much? This game will literally ruin you. You should consider running as far away as possible, as fast as you possibly can. Before it eats you alive.</h5>

    <em> C8 rules, every other cohort drools. It's ok, I'm just getting into the smack talk energy because of how FRIGGIN INTENSE this whole GAME IS</em>
    <br />
    <br />
    <Link to="/draft"><button className="btn btn-primary btn-lg"><strong>I'm Ready To Pick My Team</strong></button></Link>
    </>
}