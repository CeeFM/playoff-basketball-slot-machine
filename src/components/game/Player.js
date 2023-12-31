import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

export const Player = ({ id, playerName, playerPic, playerExternalAPIId, playerObject }) => {
    
    const [userTeam, setUserTeam] = useState([])
    const [match, setMatch] = useState([])
    const navigate = useNavigate()
    const team = userTeam.filter((player) => player.matchId === (match.length + 1))

    useEffect(
        () => {
            fetch('http://localhost:8088/userTeam')
                .then(response => response.json())
                .then((userTeamArray) => {
                    setUserTeam(userTeamArray)
                })
                .then(getMatch)
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
    
    return <>
    <section className="player-section" id={`player-${id}`}>
    <div className="player-pick-img">
    <img className="player-img" src={playerPic} />
    </div>
<strong className="name">{playerName}</strong> 
<br />
    </section>
    </>
}