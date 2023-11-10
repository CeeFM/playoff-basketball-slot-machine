import { useEffect, useState } from "react"
import { NavBar } from "../nav/NavBar"
import { useNavigate } from "react-router-dom"

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

    const tenRandomPlayers = () => {
        let ranNums = tenRandomNumbers()
        let i = 0
        let randomPlayers = []
        while (i < 10) {
            fetch(`http://localhost:8088/players/${ranNums[i]}`)
                .then(response =>  response.json())
                .then((playerArray) => {
                    randomPlayers.push(playerArray)
                })
                .then(i++)
        }
        return randomPlayers
    }

    const initialPlayers = tenRandomPlayers()

    const [players, setPlayers] = useState(initialPlayers)
    const navigate = useNavigate()
    const localBballUser = localStorage.getItem("bball_user")
    const bballUserObject = JSON.parse(localBballUser)


    // useEffect(
    // () => {
    //     fetch('http://localhost:8088/players')
    //         .then(response => response.json())
    //         .then((playerArray) => {
    //             setPlayers(playerArray)
    //         })
    // },
    // []
    // )

    return <>
    <NavBar />
   <button onClick={tenRandomPlayers}>Test That Shit Dude</button>
   <button onClick={() => console.log(players)}>Test State</button>
    </>
}