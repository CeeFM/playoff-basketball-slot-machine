import { useEffect, useState } from "react"
import { NavBar } from "../nav/NavBar"

export const PlayerSwap = () => {
    const [userTeam, setUserTeam] = useState([])
    const [match, setMatch] = useState([])
    const team = userTeam.filter((player) => player.matchId === match.length)

    useEffect(
        () => {
            fetch('http://localhost:8088/userTeam?_expand=player')
                .then(response => response.json())
                .then((userTeamArray) => {
                    setUserTeam(userTeamArray)
                })
                .then(getMatch())
        },
        []
        )

        
    const getMatch = () => {
        fetch('http://localhost:8088/match')
            .then(response => response.json())
            .then((matchArray) => {
                setMatch(matchArray)
                    })
        }
    
    const getUserTeam = () => {
        fetch('http://localhost:8088/userTeam?_expand=player')
            .then(response => response.json())
            .then((userTeamArray) => {
                setUserTeam(userTeamArray)
            })
        }
    
    return <>
            <NavBar />
    <div className="player-container">
        <h6>SWAP A PLAYER ON YOUR TEAM, OR KEEP THE SAME TEAM AND START ANOTHER BATTLE</h6>
    {
        team.map((baller) => {
            return <>
            <section id={baller.id} className="player-section" key={baller?.player?.externalAPIId}>
        <strong className="name">{baller?.player?.name}</strong>
        <br />
        <div className="matchup-img-div">
        <img className="matchup-img" src={baller?.player?.img} />
        </div>
            </section>
            </>
        })
        
    }
    </div>

    </>
}