import { useEffect, useState } from "react"
import { NavBar } from "../nav/NavBar"
import { Link } from "react-router-dom"

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

    const printId = (id) => {
        const swapDiv = document.querySelectorAll(".swap-div")
        const thisPlayerId = team.find((player) => player.id === id)
        const randomNumber = () => {
            let number = Math.floor((Math.random() * 186) + 1)
            if (number === 90) {
                number = Math.floor((Math.random() * 186) + 1)
            }
            return number
        }
        fetch(`http://localhost:8088/userTeam/${parseInt(id)}`, {
            method: 'PATCH',
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify({
              playerId: randomNumber(),
              swap: true
            })
        })
            .then(getUserTeam)
            .then(swapDiv[0].style.display = "none")
            .then(swapDiv[1].style.display = "none")
            .then(swapDiv[2].style.display = "none")
            .then(swapDiv[3].style.display = "none")
            .then(swapDiv[4].style.display = "none")
            .then(console.log(swapDiv[1]))
    }

    // const hideButton = () => {
    //     const swapDiv = document.querySelectorAll(".swap-btn")
    //     swapDiv.style.display = "none"
    // }
         
    return <>
            <NavBar />
    <div className="player-container">
        <h6>SWAP A PLAYER ON YOUR TEAM, OR KEEP THE SAME TEAM AND START ANOTHER BATTLE</h6>
    {
        team.map((baller) => {
            return <>
            {console.log(baller)}
            <section id={baller.id} className="player-section" key={baller?.player?.externalAPIId}>
        <strong className="name">{baller?.player?.name}</strong>
        <br />
        <div className="matchup-img-div">
        <img className="matchup-img" src={baller?.player?.img} />
        </div>
        {
            baller.swap === true   
            ? <div className="swap-div" style={{display: "none"}}><button onClick={(clickEvent) => printId(clickEvent.target.id)} className={`swap-btn swap-btn-${baller.id}`} id={baller.id}>SWAP?</button></div>
            : <div className="swap-div" style={{display: "inline"}}><button onClick={(clickEvent) => printId(clickEvent.target.id)} className={`swap-btn swap-btn-${baller.id}`} id={baller.id}>SWAP?</button></div>
        }
            </section>
            </>
        })
        
    }
    <Link to="/matchup"><div><button>CONTINUE</button></div></Link>
    </div>

    </>
}