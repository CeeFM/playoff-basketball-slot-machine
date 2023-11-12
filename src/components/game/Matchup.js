import { useEffect, useState } from "react"
import { NavBar } from "../nav/NavBar"
import { CPUTeamRender } from "./CPUTeamRender"

export const Matchup = () => {
    const [userTeam, setUserTeam] = useState([])
    const [cpuTeam, setCpuTeam] = useState([])
    const [match, setMatch] = useState([])
    const [game, setGame] = useState([])
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

        useEffect(
            () => {
                fetch('http://localhost:8088/games')
                    .then(response => response.json())
                    .then((gameArray) => {
                        setGame(gameArray)
                    })
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
    
    const statFinder = () => {
        let i = 0
        let url = "https://www.balldontlie.io/api/v1/stats?player_ids[]="
        while (i < team.length){
            let thisPlayerGames = game.filter((gm) => gm.playerId === team[i].id)
            let thisRandomNumber = Math.floor((Math.random() * thisPlayerGames.length) + 1)
            let playerGame = thisPlayerGames[thisRandomNumber]
            console.log(playerGame)
            console.log(playerGame.externalAPIId)
                if (i === team.length - 1){
                    url += `${team[i]?.player?.externalAPIId}&game_ids[]=${playerGame.externalAPIId}`
                } 
                    else  {
                    url += `${team[i]?.player?.externalAPIId}&game_ids[]=${playerGame.externalAPIId}&player_ids[]=`  
                }
            i++
        }

        return url
    }
//uncomment the console.log below to successfully print the dynamic api URL to the console, but throw an error the breaks everything else because it thinks "playerGame is not defined"?
 //console.log(statFinder())

    return <>
    <NavBar />
    <div className="player-container">
        <h6>YOUR TEAM</h6>
    {
        team.map((baller) => {
            return <>

            <section id={baller.id} className="player-section" key={baller?.player?.externalAPIId}>
        <strong className="name">{baller?.player?.name}</strong> 
        <br />
        <img className="player-img" src={baller?.player?.img} />
            </section>
            </>
        })
        
    }

    <CPUTeamRender />
    </div>
    </>
}