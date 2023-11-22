//Welcome Page Content - First Time Users (Returning User Welcome Page TBD)

import { Link } from "react-router-dom"
import logo from "../images/funnybball.jpg"

export const Welcome = () => {
    return <>
    
    <img src="https://media1.giphy.com/media/3o6YglDndxKdCNw7q8/giphy.gif?cid=ecf05e47ind53kmcbw0d1l5kju0aj6a88t5yh6lzg1o0722g&ep=v1_gifs_search&rid=giphy.gif&ct=g"></img>
    <h2 className="welcome-top">GET READY, YOU'RE STEPPING INTO A FAST-PACED, HIGH STAKES, FANTASY BASKETBALL GAME</h2>
    <br />
    <h5 className="another-welcome"><strong>Pick a team of 5 current and/or historic NBA players, and see if you can get more points than the CPU in a best of 7 series!</strong></h5>
    <br />
    <h6>Oh what, you were expecting some walk in the park, relaxing, enjoyable experience? Privileged much? This game will literally ruin you. You should consider running as far away as possible, as fast as you possibly can. Before it eats you alive.</h6>
    <em> JK it's fun please play it. C'mon I worked really hard on this. Seriously. It takes like 5 mins.</em>
    <br />
    <br />
    <Link to="/draft"><button className="btn btn-primary btn-lg"><strong>I'm Ready To Pick My Team</strong></button></Link>
    </>
}