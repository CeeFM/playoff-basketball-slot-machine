import { useEffect, useState } from "react"
import { NavBar } from "../nav/NavBar"
import { Player } from "./Player"

export const Matchup = () => {
    const [userTeam, setUserTeam] = useState([])
    const [match, setMatch] = useState([])
    const team = userTeam.filter((player) => player.matchId === (match.length + 1))


    useEffect(
        () => {
            fetch('http://localhost:8088/userTeam?_expand=player')
                .then(response => response.json())
                .then((userTeamArray) => {
                    setUserTeam(userTeamArray)
                })
        },
        []
        ) 

    console.log(team)
    return <>
    <NavBar />
    {
        team.map((baller) => {
            return <>
            <section className="player-section" id={baller?.player?.externalAPIId}>
        <strong className="name">{baller?.player?.name}</strong> 
        <br />
        <img className="player-img" src={baller?.player?.img} />
            </section>
            </>
        })
    }
    
    </>
}