import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

export const CPUPlayer = ({ id, playerName, playerPic, playerExternalAPIId, playerObject }) => {
    
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
    
    return <>
    <section className="player-section" id={playerExternalAPIId}>
<strong className="name">{playerName}</strong> 
<br />
<img className="player-img" src={playerPic} />
    </section>
    </>
}