import { useEffect, useState } from "react"
import { NavBar } from "../nav/NavBar"
import { useNavigate } from "react-router-dom"
import { Player } from "./Player"
import { ConfirmBtn } from "../nav/ConfirmBtn"

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

    const getUserTeam = () => {
        fetch('http://localhost:8088/userTeam')
        .then(response => response.json())
        .then((userTeamArray) => {
            setUserTeam(userTeamArray)
        })
    }

    const getMatch = () => {
        fetch('http://localhost:8088/match')
        .then(response => response.json())
        .then((matchArray) => {
            setMatch(matchArray)
        })
    }

    const [players, setPlayers] = useState([])
    const [match, setMatch] = useState([])
    const [userTeam, setUserTeam] = useState([])
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
            fetch('http://localhost:8088/userTeam')
                .then(response => response.json())
                .then((userTeamArray) => {
                    setUserTeam(userTeamArray)
                })
        },
        []
        ) 


    const returnPlayerDetails = (player) => {
        const localBballUser = localStorage.getItem("bball_user")
        const bballUserObject = JSON.parse(localBballUser)
            // TODO: Create the object to be saved to the API
            const playerToSendToAPI = {
                playerId: parseInt(player),
                matchId: match.length + 1
            }
    
            // TODO: Perform the fetch() to POST the object to the API
            if (userTeam.length % 5 === 0 && userTeam.length > 0) {
                window.alert("No I'm sorry, you must remove a player from your team to add another one. You already have five!")
                getUserTeam()
                getMatch()
            }
              else {
            return fetch(`http://localhost:8088/userTeam`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(playerToSendToAPI)
            })
    
                .then(response => response.json())
                .then(console.log(userTeam))
                .then(getUserTeam())
                .then(console.log(userTeam))
                .then(console.log(match))
                .then(getMatch())
                .then(console.log(match))
            }
        }

    return <>
    {
        userTeam.length % 5 === 0 && userTeam.length > 0
        ? <ConfirmBtn />
        : <NavBar />
    }
    <div className="player-container">
    {
        players.map((player) => <>
        <Player 
            key={`player--${player.id}`} 
            id={player.id} playerPic={player.img} playerName={player.name} playerExternalAPIId={player.externalAPIId} playerObject={player}/> <button key={`player-pick-${player.id}`} id={player.id} onClick={(clickEvent) => returnPlayerDetails(clickEvent.target.id)}>Draft</button></>)
    }
    </div>
    </>
}