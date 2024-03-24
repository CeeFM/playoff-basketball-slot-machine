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
        let playerGames = [];
        while (i < cpuTeam.length){
            let thisPlayerGames = game.filter((gm) => gm.playerId === cpuTeam[i]?.id)
            let thisRandomNumber = Math.floor((Math.random() * thisPlayerGames.length))
            let playerGame = thisPlayerGames[thisRandomNumber]
            playerGames.push(playerGame);
            i++
        }
        console.log(playerGames);
        setCpuTeamStats(playerGames);

        const cpuBtn = document.querySelector(".cpuStats")
        const continueBtn = document.querySelector(".continue-btn-container")
        cpuBtn.style.visibility = "hidden"
        continueBtn.style.display = "block"
    }

    let totalPoints = 0;

    const calculateScore = (baller) => {
        let foundPlayer = cpuTeamStats.find((stat) => stat?.playerId === baller?.id)
        let foundPlayerPts = foundPlayer?.points
        totalPoints += foundPlayerPts
    }
    
    

    const findPlayer = (baller) => {
        let foundPlayer = cpuTeamStats.find((stat) => stat?.playerId === baller?.id)
        let dateString = foundPlayer?.date
            if (cpuTeamStats.length > 1) {
                let dateStringCopy = dateString
                dateString = dateStringCopy.slice(0, 10)
                let [year, month, date] = dateString.split("-")
                return <p className="player-stats"><em className="date">{foundPlayer?.teamName}
                <br />
                {month}/{date}/{year}
                </em>
                <br/ >
                <strong className="points">{foundPlayer?.points} Points</strong></p>}
    
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
            <img className="result-img" src="https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExZHY5YnRrc3RmMTdubW4zNGV6b3l2eWU3Zmx4bWUxYWNyb3I0aTFhcCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/tuODzgsktwtsYtvqDX/giphy.gif" /></>
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
            <img className="result-img" src="https://media1.giphy.com/media/t3sZxY5zS5B0z5zMIz/giphy.gif?cid=ecf05e47p7r5g4unjlrxjs82rnnyhmq4hg0bib0yv9gpu7uu&ep=v1_gifs_search&rid=giphy.gif&ct=g" /></>
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
        <h5>CPU TEAM</h5>
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
    {   userPoints === totalPoints
        ? <div className="continue-btn-container"><Link to="/swap"><button className="continue-btn btn btn-primary btn-lg">TIE GAME - TRY AGAIN</button></Link></div>
        : <div className="continue-btn-container"><Link to="/swap"><button className="continue-btn btn btn-primary btn-lg">CONTINUE</button></Link></div>
    }
    
    </>
}
