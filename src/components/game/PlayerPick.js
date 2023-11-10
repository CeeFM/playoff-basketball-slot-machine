import { useEffect, useState } from "react"
import { NavBar } from "../nav/NavBar"
import { useNavigate } from "react-router-dom"
import { Player } from "./Player"

export const PlayerPick = () => {   
    const randomNumber = () => {
        let number = Math.floor((Math.random() * 186) + 1)
        return number
    }

    const tenRandomNumbers = () => {
        let numArray = []
        while (numArray.length < 10) {
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

    const [players, setPlayers] = useState([])
    const [tenPlayers, setTenPlayers] = useState({})
    const navigate = useNavigate()
    const localBballUser = localStorage.getItem("bball_user")
    const bballUserObject = JSON.parse(localBballUser)
    const tenRanNums = tenRandomNumbers()

   const tenRandomPlayers = () => {
        let i = 0
        let ranPlayerArray = []
        while (i < tenRanNums.length) {
            fetch(`http://localhost:8088/players/${tenRanNums[i]}`)
                .then(response => response.json())
                .then((playerObject) => {
                    ranPlayerArray.push(playerObject)
                })
            i++
        }
        return ranPlayerArray

   }

   const tenRanPlayers = tenRandomPlayers()

    // useEffect(
    //     () => {
    //         let ranNums = tenRandomNumbers()
    //         let i = 0
    //         let ranPlayers = []
    //         while (i < 10) {
    //             fetch(`http://localhost:8088/players/${ranNums[i]}`)
    //                 .then(response =>  response.json())
    //                 .then((playerArray) => {
    //                     ranPlayers.push(playerArray)
    //                 })
    //                 .then(i++)
    //                 .then(setPlayers(ranPlayers))
    //         }
    //     },
    //     []
    // )


    useEffect(
    () => {
        fetch('http://localhost:8088/players')
            .then(response => response.json())
            .then((playerArray) => {
                setPlayers(tenRanPlayers)
            })
    },
    []
    )

    return <>
    <NavBar />
    <div className="player-container">
    {
        players.map(player => <Player key={`player--${player.id}`} id={player.id} playerPic={player.img} playerName={player.name} playerExternalAPIId={player.externalAPIId} playerObject={player}/>)
    }
    </div>
    </>
}