import { useEffect, useState } from "react"
import { NavBar } from "../nav/NavBar"
import { Welcome } from "./Welcome"
import { WelcomeBack } from "./WelcomeBack"
import { Link } from "react-router-dom"

export const WelcomeContainer = () => {
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

    if (users[bballUserObject.id - 1]?.wins > 0 || users[bballUserObject.id - 1]?.wins > 0) {
      return <>
      <NavBar />
      <WelcomeBack />
      </>
    } 
      else {
        return <>
        <NavBar />
        <Welcome />
        </>
      }
  }