import { useEffect, useState } from "react"
import { Link } from "react-router-dom"

export const RenameTeam = () => {
    const [user, setUser] = useState([])
    const localBballUser = localStorage.getItem("bball_user")
    const bballUserObject = JSON.parse(localBballUser)

    useEffect(
        () => {
                fetch(`http://localhost:8088/users/${bballUserObject.id}`)
                    .then(response => response.json())
                    .then((userArray) => {
                        setUser(userArray)
                    })
            }
            
        ,
        []
        ) 

    const updateTeamName = (name) => {
        fetch(`http://localhost:8088/users/${bballUserObject.id}`, {
            method: 'PATCH',
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify({
              teamName: name
            })
        })
        .then(response => response.json())
        .then(data => console.log(data)) 
    }

    return <>
    <div className="form-container">
        <h2>RENAME YOUR TEAM, MAKE IT SOMETHING GOOD</h2>
        <img src="https://images.prismic.io/coachtube%2F59dbabdf-2947-42d4-b9a2-bfbdb163f309_bosh-photo-bombed-1.gif?auto=compress,format" />
                    <form>
                    <fieldset>
                    <div className="form-group">
                    <label htmlFor="teamName">Team Name:</label>
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Enter a name for your team"
                        value={user.teamName}
                        onChange={
                            (event) => {
                                const copy = {...user}
                                copy.teamName = event.target.value
                                setUser(copy)
                            }
                        } />
                </div>
                </fieldset>
                <div className="btn">
                <Link to="/"><button className="btn btn-primary" onClick={() => updateTeamName(user.teamName)}>
                    Save Edits
                </button></Link>
                </div>
                </form>
            </div>
    </>
}