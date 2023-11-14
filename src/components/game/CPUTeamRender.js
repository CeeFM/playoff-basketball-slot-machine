import { useEffect, useState } from "react"
import { NavBar } from "../nav/NavBar"
import { CPUPlayer } from "./CPUPlayer"

export const CPUTeamRender = ({ userPoints }) => {
    const [cpuTeam, setCpuTeam] = useState([])
    const [game, setGame] = useState([])
    const [cpuTeamStats, setCpuTeamStats] = useState([])
    const localBballUser = localStorage.getItem("bball_user")
    const [users, setUsers] = useState([])
    const bballUserObject = JSON.parse(localBballUser)


    useEffect(
        () => {
            let i = 0
            let ranPlayerArray = []
            while (i < fiveRanNums.length) {
                fetch(`http://localhost:8088/players/${fiveRanNums[i]}`)
                    .then(response => response.json())
                    .then((playerObject) => {
                        ranPlayerArray.push(playerObject)
                    })
                i++
            }
            setCpuTeam(fiveRanPlays)
        },
        []
        ) 

        useEffect(
            () => {
                    fetch(`http://localhost:8088/games`)
                        .then(response => response.json())
                        .then((gameArray) => {
                            setGame(gameArray)
                        })
                }
                
            ,
            []
            ) 

        useEffect(
            () => {
                    fetch(`http://localhost:8088/users`)
                            .then(response => response.json())
                            .then((userArray) => {
                                setUsers(userArray)
                            })
                    }
                    
                ,
                []
                ) 

        const randomNumber = () => {
            let number = Math.floor((Math.random() * 186) + 1)
            return number
        }
    
        const fiveRandomNumbers = () => {
            let numArray = []
            while (numArray.length < 5) {
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
    
        const fiveRanNums = fiveRandomNumbers()
    
        const fiveRandomPlayers = () => {
            let i = 0
            let ranPlayerArray = []
            while (i < fiveRanNums.length) {
                fetch(`http://localhost:8088/players/${fiveRanNums[i]}`)
                    .then(response => response.json())
                    .then((playerObject) => {
                        ranPlayerArray.push(playerObject)
                    })
                i++
            }
            return ranPlayerArray
    
       }
    const fiveRanPlays = fiveRandomPlayers()

    const getGames = () => {
        fetch('http://localhost:8088/games?_expand=player')
        .then(response => response.json())
        .then((gameArray) => {
            setGame(gameArray)
        })
    }

    const statFinder = () => {
        getGames()
        let i = 0
        let url = "https://www.balldontlie.io/api/v1/stats?player_ids[]="
        let playerurl = ``
        let gameurl = ``
        while (i < cpuTeam.length){
            let thisPlayerGames = game.filter((gm) => gm.playerId === cpuTeam[i]?.id)
            let thisRandomNumber = Math.floor((Math.random() * thisPlayerGames.length))
            let playerGame = thisPlayerGames[thisRandomNumber]
                if (i === cpuTeam.length - 1){
                playerurl += `${cpuTeam[i]?.externalAPIId}`
                gameurl += `&game_ids[]=${playerGame?.externalAPIId}`
            } 
                else  {
                playerurl += `${cpuTeam[i]?.externalAPIId}&player_ids[]=`
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
        cpuBtn.style.display = "none"
    }

    // useEffect(
    //     () => {
    //         statFinder()
    //     },
    //     []
    //     )

    const apiFetch = (url) => {
        fetch(`${url}`)
            .then(response => response.json())
            .then((statArray) => {
                setCpuTeamStats(statArray?.data)
        } )
    }



    const calculateScore = (baller) => {
        let foundPlayer = cpuTeamStats.find((stat) => stat?.player?.id === baller?.externalAPIId)
        totalPoints += foundPlayer?.pts
        }

    
    
        let totalPoints = 0;
    const findPlayer = (baller) => {
        let foundPlayer = cpuTeamStats.find((stat) => stat?.player?.id === baller?.externalAPIId)
        let dateString = foundPlayer?.game?.date
            if (cpuTeamStats.length > 1) {
                let dateStringCopy = dateString
                dateString = dateStringCopy.slice(0, 10)
                return <p className="player-stats">{dateString}
                <br/ >
                {foundPlayer?.pts} Points</p>}
    
            }

    const bigW = () => {
        if (totalPoints > userPoints) {
            fetch(`http://localhost:8088/users/${bballUserObject.id}`, {
                method: 'PATCH',
                headers: {'Content-type': 'application/json'},
                body: JSON.stringify({
                  losses: users[bballUserObject.id - 1].losses + 1  
                }),

            })
                .then(response => response.json())
                .then(data => console.log(data))
            return <h2>BIG L</h2>
        }

        else if (userPoints > totalPoints) {
            fetch(`http://localhost:8088/users/${bballUserObject.id}`, {
                method: 'PATCH',
                headers: {'Content-type': 'application/json'},
                body: JSON.stringify({
                  wins: users[bballUserObject.id - 1].wins + 1  
                }),

            })
                .then(response => response.json())
                .then(data => console.log(data))
            return <h2>BIG W</h2>
        } else if (userPoints === totalPoints) {
            return <p>TIE - NO POINTS</p>
        } else {
            return ""
    }
    }
    return <>
    <div className="cpu-player-container">
        <div className="cpu-btn-container">
    <button className="cpuStats" onClick={statFinder}>THEN GET YOUR OPPONENT'S SCORES</button>
        </div>
        <h6>CPU TEAM</h6>
    {   
        cpuTeam.map((player) => <>
        {calculateScore(player)}
        <CPUPlayer 
            key={`player--${player.id}`} 
            id={player.id} playerPic={player.img} playerName={player.name} playerExternalAPIId={player.externalAPIId} playerObject={player} findPlayer={findPlayer}/></>)
    }
        <div className="cpu-score">CPU Team Score: {totalPoints}</div>
    </div>
    <div className="winorloss">
    {bigW()}
    </div>
    </>
}
