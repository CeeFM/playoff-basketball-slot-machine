import { Welcome } from "../game/Welcome"
import { NavBar } from "../nav/NavBar"

export const ApplicationViews = () => {
	
    const localBballUser = localStorage.getItem("bball_user")
    const bballUserObject = JSON.parse(localBballUser)

  return  <>
  <NavBar />
  <Welcome />
  </>
}