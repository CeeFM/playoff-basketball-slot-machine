import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"

export const ConfirmBtn = () => {
    const localBballUser = localStorage.getItem("bball_user")
    const bballUserObject = JSON.parse(localBballUser)
    const [match, setMatch] = useState([])
    const navigate = useNavigate

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

        const getMatch = () => {
            fetch('http://localhost:8088/match')
            .then(response => response.json())
            .then((matchArray) => {
                setMatch(matchArray)
            })
        }

        const createMatch = () => {
            getMatch()
            const localBballUser = localStorage.getItem("bball_user")
            const bballUserObject = JSON.parse(localBballUser)
                // TODO: Create the object to be saved to the API
                const playerToSendToAPI = {
                    userId: bballUserObject.id,
                    matchId: match.length + 1
                }

                fetch(`http://localhost:8088/match`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(playerToSendToAPI)
                })
                    .then(response => response.json())
            }    


    return <Link to="/matchup"><button onClick={createMatch}>CONFIRM YOUR TEAM</button></Link>
}