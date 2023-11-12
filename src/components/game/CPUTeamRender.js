import { useEffect, useState } from "react"
import { NavBar } from "../nav/NavBar"
import { CPUPlayer } from "./CPUPlayer"

export const CPUTeamRender = () => {
    const [cpuTeam, setCpuTeam] = useState([])


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
    return <>
    <div className="player-container">
        <h6>CPU TEAM</h6>
    {
        cpuTeam.map((player) => <>
        <CPUPlayer 
            key={`player--${player.id}`} 
            id={player.id} playerPic={player.img} playerName={player.name} playerExternalAPIId={player.externalAPIId} playerObject={player}/></>)
    }
    </div>
    </>
}