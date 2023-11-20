import { useEffect, useState } from "react"
import { PlayerSwap } from "./PlayerSwap"
import { WinLoss } from "./WinLoss"

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


    if (match[match.length - 1]?.wins === 10 || match[match.length - 1]?.losses === 10) {
        return <WinLoss />
    } else { 
    
    return <PlayerSwap />
    }
}