import { useEffect, useState } from "react"
import { PlayerSwap } from "./PlayerSwap"
import { Win } from "./Win"
import { Loss } from "./Loss"

export const MatchEndContainer = () => {
    const localBballUser = localStorage.getItem("bball_user")
    const bballUserObject = JSON.parse(localBballUser)
    const [match, setMatch] = useState([])
    const [users, setUsers] = useState([])

    useEffect(
            () => {
                    fetch(`http://localhost:8088/match`)
                        .then(response => response.json())
                        .then((matchArray) => {
                            setMatch(matchArray)
                        })
                },
            []
            ) 

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

            const loss = () => {
                fetch(`http://localhost:8088/users/${bballUserObject.id}`, {
                     method: 'PATCH',
                     headers: {'Content-type': 'application/json'},
                     body: JSON.stringify({
                       losses: users[bballUserObject.id - 1]?.losses + 1  
                     })
                 })
                 .then(response => response.json())
                 .then(data => console.log(data))
             }
             const win = () => {
                fetch(`http://localhost:8088/users/${bballUserObject.id}`, {
                     method: 'PATCH',
                     headers: {'Content-type': 'application/json'},
                     body: JSON.stringify({
                       wins: users[bballUserObject.id - 1]?.wins + 1  
                     })
                 })
                 .then(response => response.json())
                 .then(data => console.log(data))
             }

    if (match[match.length - 1]?.wins === 4) {
        fetch(`http://localhost:8088/users/${bballUserObject.id}`, {
            method: 'PATCH',
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify({
              wins: users[bballUserObject.id - 1]?.wins + 1  
            })
        })
        return <>
        <Win />
        </>
    } else if (match[match.length - 1]?.losses === 4) {
        fetch(`http://localhost:8088/users/${bballUserObject.id}`, {
            method: 'PATCH',
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify({
              losses: users[bballUserObject.id - 1]?.losses + 1  
            })
        })
        return <>
        <Loss />
        </>
    }
     else { 
    
    return <PlayerSwap />
    }
}