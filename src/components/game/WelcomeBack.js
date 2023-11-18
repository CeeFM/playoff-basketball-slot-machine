import { Link } from "react-router-dom"
import logo from "../images/funnybball.jpg"

export const WelcomeBack = ({currentUser}) => {
    return <>
    <img src={logo}></img>
    <h2>OH YOU WANT MORE HUH SUCKA????</h2>
    <h4>DIDN'T GET ENOUGH LAST TIME, YOU FREAK??? REALLY HAVE A THING FOR TAKING L'S, HUH PARTNER????</h4>
    <div>SERIOUSLY WHAT IS WRONG WITH YOU, THIS GAME IS BAD FOR YOUR BRAIN AND BODY. LET'S BE HONEST, THIS IS TORTURE.</div>
    <br />
    <em>SO TRUE. LET'S BALL.</em>
    <br />
    <br />
    <Link to="/draft"><button className="btn btn-primary btn-lg"><strong>I'm Ready To Pick My Team</strong></button></Link>
    </>
}