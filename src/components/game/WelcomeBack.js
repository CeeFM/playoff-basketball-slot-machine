import { Link } from "react-router-dom"
import logo from "../images/funnybball.jpg"
import { useEffect, useState } from "react"

export const WelcomeBack = ({currentUser}) => {
    const [users, setUsers] = useState([])
    const localBballUser = localStorage.getItem("bball_user")
    const bballUserObject = JSON.parse(localBballUser)

    useEffect(
        () => {
                fetch(`http://localhost:8088/users`)
                        .then(response => response.json())
                        .then((userArray) => {
                            setUsers(userArray)
                     })
             },
            []
            ) 



    return <>
    <img src="https://i.pinimg.com/originals/d2/79/7f/d2797fcae4e378255471064decdda88b.gif"></img>
    <h3 className="welcome-msg">Hey there, {users[bballUserObject.id - 1]?.username}. Back so soon for more L's from the CPU?</h3>
    <br />
    <div className="userRecord">{users[bballUserObject.id - 1]?.teamName}'s Record Against the CPU is {users[bballUserObject.id - 1]?.wins} wins and {users[bballUserObject.id - 1]?.losses} losses</div>
    <br />
    <h6>SERIOUSLY WHAT IS WRONG WITH YOU, THIS GAME IS BAD FOR YOUR BRAIN AND BODY. LET'S BE HONEST, THIS IS TORTURE.</h6>
    <br />
    <em>SO TRUE. LET'S BALL.</em>
    <br />
    <br />
    <Link to="/draft"><button className="btn btn-primary btn-lg"><strong>I'm Ready To Pick My Team</strong></button></Link>
    </>
}