import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

export const Player = ({ id, playerName, playerPic, playerExternalAPIId, playerObject }) => {
    
    const [userTeam, setUserTeam] = useState([])
    const [match, setMatch] = useState([])
    const navigate = useNavigate()


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

    const returnPlayerDetails = (event) => {
        event.preventDefault()
        const localBballUser = localStorage.getItem("bball_user")
        const bballUserObject = JSON.parse(localBballUser)
            // TODO: Create the object to be saved to the API
            const playerToSendToAPI = {
                playerId: playerObject.id,
                matchId: match.length + 1
            }
    
            // TODO: Perform the fetch() to POST the object to the API
            if (userTeam.length % 5 === 0 && userTeam.length > 0) {
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
                .then(console.log(userTeam))
                .then(getUserTeam())
                .then(console.log(userTeam))
                .then(console.log(match))
                .then(getMatch())
                .then(console.log(match))
            }



        }
    

    return <>
    <section className="player-section" id={playerExternalAPIId}>
<strong className="name">{playerName}</strong> 
<br />
<img className="player-img" src={playerPic} />
        <br />
        <button onClick={(clickEvent) => returnPlayerDetails(clickEvent)}>Select</button>
    </section>
    </>
}