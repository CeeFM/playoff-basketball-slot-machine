import { useEffect, useState } from "react"
import { NavBar } from "../nav/NavBar"
import { CPUPlayer } from "./CPUPlayer"
import { Link } from "react-router-dom"

export const CPUTeamRender = ({ userPoints }) => {
    const [cpuTeam, setCpuTeam] = useState([])
    const [game, setGame] = useState([])
    const [cpuTeamStats, setCpuTeamStats] = useState([])
    const localBballUser = localStorage.getItem("bball_user")
    const [users, setUsers] = useState([])
    const [match, setMatch] = useState([])
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
                        fetch(`http://localhost:8088/match`)
                            .then(response => response.json())
                            .then((matchArray) => {
                                setMatch(matchArray)
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

    const getMatch = () => {
        fetch(`http://localhost:8088/match`)
        .then(response => response.json())
        .then((matchArray) => {
            setMatch(matchArray)
        })
    }

    const statFinder = () => {
        getGames()
        getMatch()
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
        const cpuBtn = document.querySelector(".cpuStats")
        const continueBtn = document.querySelector(".continue-btn-container")
        cpuBtn.style.visibility = "hidden"
        continueBtn.style.display = "block"
    }

    const apiFetch = (url) => {
        fetch(`${url}`)
            .then(response => response.json())
            .then((statArray) => {
                setCpuTeamStats(statArray?.data)
        } )
    }

    let totalPoints = 0;

    const calculateScore = (baller) => {
        let foundPlayer = cpuTeamStats.find((stat) => stat?.player?.id === baller?.externalAPIId)
        totalPoints += foundPlayer?.pts
        }

    
    

    const findPlayer = (baller) => {
        let foundPlayer = cpuTeamStats.find((stat) => stat?.player?.id === baller?.externalAPIId)
        let dateString = foundPlayer?.game?.date
            if (cpuTeamStats.length > 1) {
                let dateStringCopy = dateString
                dateString = dateStringCopy.slice(0, 10)
                let [year, month, date] = dateString.split("-")
                return <p className="player-stats"><em className="date">{foundPlayer?.team?.full_name}
                <br />
                {month}/{date}/{year}
                </em>
                <br/ >
                <strong className="points">{foundPlayer?.pts} Points</strong></p>}
    
            }

    const bigW = () => {
        if (totalPoints > userPoints) {
            fetch(`http://localhost:8088/match/${match.length}`, {
                method: 'PATCH',
                headers: {'Content-type': 'application/json'},
                body: JSON.stringify({
                  losses: match[match.length - 1]?.losses + 1  
                }),

            })
                .then(response => response.json())
                .then(data => console.log(data))
            return <>
            <div className="the-score"><p> YOU: {match[match.length - 1]?.wins} - CPU: {match[match.length - 1]?.losses + 1}</p></div>
            <img className="result-img" src="https://www.casinopapa.co.uk/wp-content/uploads/2017/09/get-over.png" /></>
        }

        else if (userPoints > totalPoints) {
            fetch(`http://localhost:8088/match/${match.length}`, {
                method: 'PATCH',
                headers: {'Content-type': 'application/json'},
                body: JSON.stringify({
                  wins: match[match.length - 1]?.wins + 1  
                }),

            })
                .then(response => response.json())
                .then(data => console.log(data))
            return <>
            <div className="the-score"><p> YOU: {match[match.length - 1]?.wins + 1} - CPU: {match[match.length - 1]?.losses}</p></div>
            <img className="result-img" src="https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/i/593d544b-4815-4bbf-889f-773a0584c6ed/dcb2gic-8a431ea4-3ef3-426e-b6ff-dc925ca9ab06.jpg/v1/fill/w_1383,h_578,q_70,strp/bigwin_png_by_annguyen1089_dcb2gic-pre.jpg" /></>
        } else if (userPoints === totalPoints) {
            return <p>TIE</p>
        } else {
            return ""
    }
    }

    const windowReload = () => {
        window.location.reload()
    }

    return <>
    {getMatch}
    {windowReload}
    <div className="cpu-player-container">
        <div className="cpu-btn-container">
    <button type="button" className="cpuStats btn btn-primary btn-lg" data-toggle="modal" data-target="#exampleModalCenter" onClick={statFinder}>THEN GET YOUR OPPONENT'S SCORES</button>
        </div>
        <h4>CPU TEAM</h4>
    {   
        cpuTeam.map((player) => <>
        {calculateScore(player)}
        <CPUPlayer 
            key={`player--${player.id}`} 
            id={player.id} playerPic={player.img} playerName={player.name} playerExternalAPIId={player.externalAPIId} playerObject={player} findPlayer={findPlayer}/></>)
    }
        <div className="cpu-score">CPU Team Score: {totalPoints}</div>
    </div>
    <div className="winorloss container-fluid">
    {bigW()}
    </div>
    <div className="continue-btn-container"><Link to="/swap"><button className="continue-btn btn btn-primary btn-lg">CONTINUE</button></Link></div>
    </>
}
