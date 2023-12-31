import { useEffect, useState } from "react"
import { Welcome } from "../game/Welcome"
import { NavBar } from "../nav/NavBar"
import { WelcomeBack } from "../game/WelcomeBack"
import { WelcomeContainer } from "../game/WelcomeContainer"

export const ApplicationViews = () => {

    const [users, setUsers] = useState([])
    const localBballUser = localStorage.getItem("bball_user")
    const bballUserObject = JSON.parse(localBballUser)


    useEffect(
      () => {
        fetch(`http://localhost:8088/users`)
          .then(r => r.json())
          .then((userArray) => {
            setUsers(userArray)
          })
      },
      []
    )

    const getUsers = () => {
      fetch(`http://localhost:8088/users`)
      .then(r => r.json())
      .then((userArray) => {
        setUsers(userArray)
      })
    }

  return  <>
  <WelcomeContainer />
  </>
}