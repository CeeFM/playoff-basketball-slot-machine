//Welcome Page Content - First Time Users (Returning User Welcome Page TBD)

import { Link } from "react-router-dom"
import logo from "../images/funnybball.jpg"

export const Welcome = () => {
    return <>
    <img src={logo}></img>
    <h2>GET READY, YOU'RE STEPPING INTO A FAST-PACED, HIGH STAKES, FANTASY BASKETBALL GAME</h2>
    <h4>Oh what, you were expecting some walk in the park, relaxing, enjoyable experience? Priveleged much? This game will literally ruin you. You should consider running as far away as possible, as fast as you possibly can. Before it eats you alive.</h4>
    <div>Doesn't seem like you've been here before. We love basketball, and stats, and we're learning to love React. So we're combining all of them into this wildly specific and utterly ludicrous game, to showcase the front end skills learned and developed in the first half of the NewForce curriculum.</div>
    <br />
    <em> C8 rules, every other cohort drools. It's ok, I'm just getting into the smack talk energy because of how FRIGGIN INTENSE this whole GAME IS</em>
    <br />
    <br />
    <Link to="/draft"><button className="btn btn-primary">I'm Ready To Pick My Team</button></Link>
    </>
}