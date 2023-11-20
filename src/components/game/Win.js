import { Link } from "react-router-dom"
import { NavBar } from "../nav/NavBar"
import { useEffect, useState } from "react"

export const Win = () => {
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
    <NavBar />
    <h2>YOU WON!!</h2>
    <h4><strong>{users[bballUserObject.id - 1]?.teamName}</strong>'s Record Against the CPU is: <br /><br /><strong>{users[bballUserObject.id - 1]?.wins}</strong> wins and <strong>{users[bballUserObject.id - 1]?.losses}</strong> losses</h4>
    <br /><br />
    <div>OK you cooked. Absolutely respect that and must recognize how baller you truly are. But....can you friggin do it again??? I DARE YOU TO TRY!!!!</div>
    <div className="btn-container"><Link to="/draft"><button className="btn btn-primary">Let's goooooo againnnnnnn</button></Link></div>
    </>
}