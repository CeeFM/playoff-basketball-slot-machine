import { useEffect, useState } from "react"
import { NavBar } from "../nav/NavBar"
import { CPUTeamRender } from "./CPUTeamRender"

export const Matchup = () => {
    const [userTeam, setUserTeam] = useState([])
    const [userStats, setUserStats] = useState([])
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

        const getGames = () => {
            fetch('http://localhost:8088/games?_expand=player')
            .then(response => response.json())
            .then((gameArray) => {
                setGame(gameArray)
            })
        }
    
    const statFinder = () => {
        getUserTeam()
        let i = 0
        let url = "https://www.balldontlie.io/api/v1/stats?player_ids[]="
        let playerurl = ``
        let gameurl = ``
        while (i < team.length){
            let thisPlayerGames = game.filter((gm) => gm.playerId === team[i]?.player.id)
            let thisRandomNumber = Math.floor((Math.random() * thisPlayerGames.length))
            let playerGame = thisPlayerGames[thisRandomNumber]
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
        url += playerurl + gameurl
        console.log(url)
        apiFetch(url)
        const userBtn = document.querySelector('.btn-container')
        const cpuDiv = document.querySelector(".cpu-player-container")
        const cpuBtn = document.querySelector(".cpu-btn-container")
        cpuDiv.style.display = "block";
        userBtn.style.display = "none"
    }

    const apiFetch = (url) => {
        fetch(`${url}`)
            .then(response => response.json())
            .then((statArray) => {
                setUserStats(statArray?.data)
        } )
            .then(getUserTeam)
    }

    let totalPoints = 0;

    const findPlayer = (baller) => {
        let foundPlayer = userStats.find((stat) => stat?.player?.id === baller?.player?.externalAPIId)
        let dateString = foundPlayer?.game?.date
            if (userStats.length > 1) {
                let dateStringCopy = dateString
                dateString = dateStringCopy.slice(0, 10)
                totalPoints += parseInt(foundPlayer?.pts)
                return <p className="player-stats">{dateString}
                <br/ >
                {foundPlayer?.pts} Points</p>}
    }

    return <>
        <NavBar />
    <div className="player-container">
        <div className="btn-container">
            <button className="userStats btn btn-primary" onClick={statFinder}>FIRST, GENERATE YOUR TEAM'S SCORES</button>
        </div>
        <h6>YOUR TEAM</h6>
    {
        team.map((baller) => {
            return <>
            <section id={baller.id} className="player-section" key={baller?.player?.externalAPIId}>
        <strong className="name">{baller?.player?.name}</strong>
        {findPlayer(baller)}
        <br />
        <div className="matchup-img-div">
        <img className="matchup-img" src={baller?.player?.img} />
        </div>
            </section>
            </>
        })
        
    }
    <div className="user-score">User Team Points: {totalPoints}</div>
    <CPUTeamRender userPoints={totalPoints} />
    </div>

    </>
}