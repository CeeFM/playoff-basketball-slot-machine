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
        let foundPlayerPts = foundPlayer?.pts
        totalPoints += foundPlayerPts
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
    
            const winImages = ["https://media1.giphy.com/media/t3sZxY5zS5B0z5zMIz/giphy.gif?cid=ecf05e47p7r5g4unjlrxjs82rnnyhmq4hg0bib0yv9gpu7uu&ep=v1_gifs_search&rid=giphy.gif&ct=g", "https://media.tenor.com/W15V4QzQcvsAAAAd/winning-celebrate.gif", "https://leveleleven.com/wp-content/uploads/sites/2/2014/12/giphy-5.gif", "https://usagif.com/wp-content/uploads/funny-celebrate-12.gif", "https://chicagostylesports.com/wp-content/uploads/2016/02/Stephen-colbert-celebration-gif.gif", "https://nypost.com/wp-content/uploads/sites/2/2023/06/chrome-capture-2023-5-13-1-1.gif?w=1200", "https://media0.giphy.com/media/EHGl0TPOGxHhvWiata/200w.gif?cid=6c09b9529yaeyyk7n4feaklcv8o1hpz8awp8hqcgcifruwcr&ep=v1_gifs_search&rid=200w.gif&ct=g", "https://www.businessinsider.in/thumb/msid-21132537,width-700,height-525,imgsize-3376144/nate-robinson-screams-at-the-heavens.jpg", "https://cdn3.sbnation.com/imported_assets/2057873/LeBronStaresDownGSWCrowd.gif", "https://giffiles.alphacoders.com/219/219240.gif" ]
            const lossImages = ["https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExZHY5YnRrc3RmMTdubW4zNGV6b3l2eWU3Zmx4bWUxYWNyb3I0aTFhcCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/tuODzgsktwtsYtvqDX/giphy.gif", "https://media3.giphy.com/media/eJ4j2VnYOZU8qJU3Py/giphy.gif", "https://media.tenor.com/jV2GPp9jld8AAAAC/thinking-lost.gif", "https://media3.giphy.com/media/sEqfAygnULZbMrMdFh/giphy.gif", "https://media.tenor.com/WvotbqtvuRUAAAAC/reasonsimbroke-kramer.gif", "https://i0.wp.com/roomescapeartist.com/wp-content/uploads/2018/04/tenor.gif?ssl=1", "https://media.tenor.com/0pVViMWxwgoAAAAC/you-will-lose-mean.gif"]
            const newRandomNumber = (num) => {
                let ranNum = Math.floor((Math.random()) * (num))
                return parseInt(ranNum)
            }
            let randomWinImage = winImages[newRandomNumber(winImages.length)]
            let randomLossImage = lossImages[newRandomNumber(lossImages.length)]

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
            <img className="result-img" src={randomLossImage} /></>
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
            <img className="result-img" src={randomWinImage} /></>
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
