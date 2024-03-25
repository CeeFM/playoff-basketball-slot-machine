import { useEffect, useState } from "react"
import { NavBar } from "../nav/NavBar"
import { CPUTeamRender } from "./CPUTeamRender"

export const Matchup = () => {
    const [userTeam, setUserTeam] = useState([])
    const [userStats, setUserStats] = useState([])
    const [match, setMatch] = useState([])
    const [game, setGame] = useState([])
    const [users, setUsers] = useState([])
    const team = userTeam.filter((player) => player.matchId === match.length)
    const localBballUser = localStorage.getItem("bball_user")
    const bballUserObject = JSON.parse(localBballUser)

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

            useEffect(
                () => {
                    fetch('http://localhost:8088/match')
                        .then(response => response.json())
                        .then((matchArray) => {
                            setMatch(matchArray)
                        })
                },
                []
                ) 

            useEffect(
                () => {
                    fetch('http://localhost:8088/users/')
                        .then(response => response.json())
                        .then((userArray) => {
                            setUsers(userArray)
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
        let i = 0;
        let playerGames = [];
        while (i < team.length){
            let thisPlayerGames = game.filter((gm) => gm.playerId === team[i]?.player.id)
            let thisRandomNumber = Math.floor((Math.random() * thisPlayerGames.length))
            let playerGame = thisPlayerGames[thisRandomNumber]
            playerGames.push(playerGame);
            i++
        }
        console.log(playerGames);
        setUserStats(playerGames);

        const userBtn = document.querySelector('.btn-container')
        const cpuDiv = document.querySelector(".cpu-player-container")
        //const imgDiv = document.querySelectorAll(".matchup-img")
        cpuDiv.style.display = "block";
        userBtn.style.visibility = "hidden";
        //imgDiv.style.display = "none";
    }

    let totalPoints = 0;

    const findPlayer = (baller) => {
        let foundPlayer = userStats.find((stat) => stat?.playerId === baller?.player?.id)
        let dateString = foundPlayer?.date
            if (userStats.length > 1) {
                let dateStringCopy = dateString
                dateString = dateStringCopy.slice(0, 10)
                let [year, month, date] = dateString.split("-")
                if (foundPlayer?.points > 0){
                    totalPoints += parseInt(foundPlayer?.points)
                }
                return <p className="player-stats"><em className="date">{foundPlayer?.teamName}
                <br />
                {month}/{date}/{year}
                </em>
                <br />
                <strong className="points">{
                foundPlayer?.points > 0 
                    ? foundPlayer?.points
                    : "0"
                } Points</strong></p>}
    }


    const windowReload = () => {
        window.location.reload()
    }
    return <>
    {getMatch}
    {windowReload}
    <div className="player-container container matchup-container">
        <div className="btn-container">
            <button className="userStats btn btn-primary btn-lg" onClick={statFinder}>FIRST, GENERATE YOUR TEAM'S SCORES</button>
        </div>
        <h5 className="userTeamName"><strong>{users[bballUserObject.id - 1]?.teamName}</strong></h5>
    {
        team.map((baller) => {
            return <>
            <section id={baller.id} className="player-section" key={baller?.player?.externalAPIId}>
        <div className="userScores">
        <div className="matchup-img-div">
        <img className="matchup-img" src={baller?.player?.img} />
        </div>
        <strong className="name">{baller?.player?.name}</strong>
        {findPlayer(baller)}
        </div>
        <br />


            </section>
            </>
        })
        
    }
    <div className="user-score">User Team Points: {totalPoints}</div>
    <CPUTeamRender userPoints={totalPoints} />
    </div>

    </>
}