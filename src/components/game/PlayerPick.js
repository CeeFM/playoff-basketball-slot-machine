//main page where User will pick their team of 5 players from a list of 10 randomly rendered players

import { useEffect, useState } from "react"
import { NavBar } from "../nav/NavBar"
import { useNavigate } from "react-router-dom"
import { Player } from "./Player"
import { ConfirmBtn } from "../nav/ConfirmBtn"

export const PlayerPick = () => {   
    const randomNumber = () => {
        let number = Math.floor((Math.random() * 186) + 1)
        return number
    }

    const tenRandomNumbers = () => {
        let numArray = []
        while (numArray.length < 10) {
            let ranNum = randomNumber()
            if(ranNum === 90) {
                ranNum = randomNumber()
            } else if (numArray.includes(ranNum)) {
                ranNum = randomNumber()
            }
            else {
            numArray.push(ranNum)
            }
        }

        return numArray
    }

    const getUserTeam = () => {
        fetch('http://localhost:8088/userTeam')
        .then(response => response.json())
        .then((userTeamArray) => {
            setUserTeam(userTeamArray)
        })
    }

    const getMatch = () => {
        fetch('http://localhost:8088/match')
        .then(response => response.json())
        .then((matchArray) => {
            setMatch(matchArray)
        })
    }

    const [players, setPlayers] = useState([])
    const [match, setMatch] = useState([])
    const [userTeam, setUserTeam] = useState([])
    const navigate = useNavigate()
    const localBballUser = localStorage.getItem("bball_user")
    const bballUserObject = JSON.parse(localBballUser)
    const tenRanNums = tenRandomNumbers()
    const team = userTeam.filter((player) => player.matchId === (match.length + 1))

   const tenRandomPlayers = () => {
        let i = 0
        let ranPlayerArray = []
        while (i < tenRanNums.length) {
            fetch(`http://localhost:8088/players/${tenRanNums[i]}`)
                .then(response => response.json())
                .then((playerObject) => {
                    ranPlayerArray.push(playerObject)
                })
            i++
        }
        return ranPlayerArray

   }

   const tenRanPlayers = tenRandomPlayers()

    useEffect(
    () => {
        tenRandomPlayers()
        fetch('http://localhost:8088/match')
            .then(() => {
                setPlayers(tenRanPlayers)
            })
    },
    []
    )

    useEffect(
        () => {
            fetch('http://localhost:8088/match')
                .then(response => response.json())
                .then((matchArray) => {
                    setMatch(matchArray)
                })
        },
        []
        )
    
        useEffect(
        () => {
            fetch('http://localhost:8088/userTeam')
                .then(response => response.json())
                .then((userTeamArray) => {
                    setUserTeam(userTeamArray)
                })
        },
        []
        ) 


    const draftPlayer = (player) => {
        console.log(player)
        getUserTeam()
        getMatch()
        const localBballUser = localStorage.getItem("bball_user")
        const bballUserObject = JSON.parse(localBballUser)
        const parentDiv = document.querySelector(`.draft-btn-${player}`)
        const removeDiv = document.querySelector(`.remove-btn-${player}`)
            // TODO: Create the object to be saved to the API
            const playerToSendToAPI = {
                playerId: parseInt(player),
                matchId: match.length + 1
            }
        getUserTeam()
            // TODO: Perform the fetch() to POST the object to the API
            if (team.length % 5 === 0 && team.length > 0) {
                window.alert("No I'm sorry, you must remove a player from your team to add another one. You already have five!")
                getUserTeam()
                getMatch()
            }
              else {
            return fetch(`http://localhost:8088/userTeam`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(playerToSendToAPI)
            })
    
                .then(response => response.json())
                .then(getUserTeam())
                .then(getMatch())
                .then(parentDiv.style.display = "none")
                .then(removeDiv.style.display = "inline")
            }
        }

        const removePlayer = (id) => {
            getUserTeam()
            const parentDiv = document.querySelector(`.draft-btn-${parseInt(id)}`)
            const removeDiv = document.querySelector(`.remove-btn-${parseInt(id)}`)
            const removePlayer = team.filter((baller) => baller.playerId === parseInt(id))
            console.log(removePlayer)
            fetch(`http://localhost:8088/userTeam/${removePlayer[0].id}`, {
                    method: "DELETE"
                })
                .then(() => {
                    getUserTeam()
                })
                .then(parentDiv.style.display = "inline")
                .then(removeDiv.style.display = "none")
        }

    
    return <>
    {
        team.length % 5 === 0 && team.length > 0
        ? <ConfirmBtn />
        : <NavBar />
    }
    <div className="player-container">
    {
        players.map((player) => <>
        <Player 
            key={`player--${player.id}`} 
            id={player.id} playerPic={player.img} playerName={player.name} playerExternalAPIId={player.externalAPIId} playerObject={player}/> 
        <div className={`draft-div`}><button className={`draft-btn draft-btn-${player.id}`} key={`player-pick-${player.id}`} id={player.id} onClick={(clickEvent) => draftPlayer(clickEvent.target.id)}>Draft</button></div> 
        <div className={`remove-div`}><button onClick={(clickEvent) => removePlayer(clickEvent.target.id)} className={`remove-btn remove-btn-${player.id}`} id={player.id}>Remove</button></div>
            </>)
    }
    </div>
    </>
}