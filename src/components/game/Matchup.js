import { useEffect, useState } from "react"
import { NavBar } from "../nav/NavBar"
import { CPUTeamRender } from "./CPUTeamRender"

export const Matchup = () => {
    const [userTeam, setUserTeam] = useState([])
    const [cpuTeam, setCpuTeam] = useState([])
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
        // useEffect(
        //     () => {
        //         fetch('http://localhost:8088/match')
        //             .then(response => response.json())
        //             .then((matchArray) => {
        //                 setMatch(matchArray)
        //             })
        //     },
        //     []
        //     ) 
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
        

    return <>
    <NavBar />
    <div className="player-container">
        <h6>YOUR TEAM</h6>
    {
        team.map((baller) => {
            return <>

            <section className="player-section" id={baller?.player?.externalAPIId}>
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