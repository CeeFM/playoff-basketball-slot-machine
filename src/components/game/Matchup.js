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
                fetch('http://localhost:8088/games?_expand=player')
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

        const getUserTeam = () => {
            fetch('http://localhost:8088/userTeam?_expand=player')
            .then(response => response.json())
            .then((userTeamArray) => {
                setUserTeam(userTeamArray)
            })
        }
    
    const statFinder = () => {

        let i = 0
        let url = "https://www.balldontlie.io/api/v1/stats?player_ids[]="
        let playerurl = ``
        let gameurl = ``
        while (i < team.length){
            let thisPlayerGames = game.filter((gm) => gm.playerId === team[i]?.player.id)
            let thisRandomNumber = Math.floor((Math.random() * thisPlayerGames.length) + 1)
            let playerGame = thisPlayerGames[thisRandomNumber]
            console.log(team)
            console.log(thisPlayerGames)
            console.log(playerGame?.externalAPIId)
                if (i === team.length - 1){
                playerurl += `${team[i]?.player?.externalAPIId}`
                gameurl += `&game_ids[]=${playerGame?.externalAPIId}`
            } 
                else  {
                playerurl += `${team[i]?.player?.externalAPIId}&player_ids[]=`
                gameurl += `&game_ids[]=${playerGame?.externalAPIId}`  
            }
            i++
        }
        console.log(playerurl)
        console.log(gameurl)
        url += playerurl + gameurl
        return url
    }
//uncomment the console.log below to successfully print the dynamic api URL to the console, but throw an error the breaks everything else because it thinks "playerGame is not defined"?
 console.log(statFinder())

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