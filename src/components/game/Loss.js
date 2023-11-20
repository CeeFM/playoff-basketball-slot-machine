import { Link } from "react-router-dom"
import { NavBar } from "../nav/NavBar"
import { useEffect, useState } from "react"

export const Loss = () => {
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
    
    const getUsers = () => {
        fetch(`http://localhost:8088/users`)
        .then(response => response.json())
        .then((userArray) => {
            setUsers(userArray)
     })
    }

    return <>
    {getUsers}
    <NavBar />
    <h2>YOU LOST</h2>
    <h4><strong>{users[bballUserObject.id - 1]?.teamName}</strong>'s Record Against the CPU is: <br /><br /><strong>{users[bballUserObject.id - 1]?.wins}</strong> wins and <strong>{users[bballUserObject.id - 1]?.losses}</strong> losses</h4>
    <br /><br />
    <div>Absolutely devastating L you just took. Truly a tough look for you. I wouldn't blame you if you never wanted to think about basketball again tbh. Or you could jump back in and HOOP!!!</div>
    <div className="btn-container"><Link to="/draft"><button className="btn btn-primary restart-btn">Let's goooooo againnnnnnn</button></Link></div>
    </>
}