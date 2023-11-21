import { Link } from "react-router-dom"
import { NavBar } from "../nav/NavBar"
import { useEffect, useState } from "react"

export const Loss = () => {
    const [users, setUsers] = useState([])
    const localBballUser = localStorage.getItem("bball_user")
    const bballUserObject = JSON.parse(localBballUser)

    useEffect(
        () => {
                fetch(`http://localhost:8088/users`)
                        .then(response => response.json())
                        .then((userArray) => {
                            setUsers(userArray)
                     })
             },
            []
            ) 
    
    const getUsers = () => {
        fetch(`http://localhost:8088/users`)
        .then(response => response.json())
        .then((userArray) => {
            setUsers(userArray)
     })
    }

    const lossImages = ["https://media0.giphy.com/media/CBjzDODIuRcNvKcHNT/giphy.gif?cid=ecf05e47rgnuntdc5th3kqtv6npkcg0gl7ljs48fm2b7hjda&ep=v1_gifs_search&rid=giphy.gif&ct=g", "https://images.prismic.io/coachtube%2Fbe349b52-78c4-4155-81b2-5c640b1372f3_raptor-gif-1.gif?auto=compress,format", "https://media3.giphy.com/media/3oEjHIPW937PZ7zzLq/giphy.gif", "https://i.chzbgr.com/full/8584285440/hEC1E4B2D/funny-memes-exasperated-basketball-player-gif", "https://media4.giphy.com/media/TizHAKYviTw6rDWSNV/giphy.gif", "https://media.tenor.com/zjNV6zTOC8MAAAAC/basketball-deep.gif", "https://media.tenor.com/nASbDxbXTRQAAAAC/loss-loser.gif", "https://media3.giphy.com/media/l41YmZCIFDTJqdvQk/giphy.gif"]
    const lossPhrases = ["Absolutely devastating L you just took. Truly a tough look for you. I wouldn't blame you if you never wanted to think about basketball again tbh. Or you could jump back in and HOOP!!!", "Wow god dang ouch that one really stung huh", "Wowwwww that CPU ain't messing around!!! It took you to school and back and even packed you a lunch!!!", "Ruthless. Devastating. You must be in shambles. Gotta play again tho right. RIGHT????!!!?!", "Ball is truly life in that ball can be extremely weird and cruel even when you think you're about to be so victorious. Anyway what are you doing now do you want to try again or something?", "Do or do not. There is no try. You know who said that? Friggin Yoda. How does it apply here? I dunno, but it was Yoda so you can probably make something up that will motivate and inspire you. You need me to do EVERYTHING for you??? UGHHHHHHH"]
    const randomNumber = (num) => {
        let ranNum = Math.floor((Math.random()) * (num))
        return parseInt(ranNum)
    }

    let randomPhrase = lossPhrases[randomNumber(lossPhrases.length)]
    let randomImage = lossImages[randomNumber(lossImages.length)]

    return <>
    {getUsers}
    <NavBar />
    <h2>YOU LOST</h2>
    <img src={randomImage} />
    <h4><strong>{users[bballUserObject.id - 1]?.teamName}</strong>'s Record Against the CPU is: <br /><br /><strong>{users[bballUserObject.id - 1]?.wins}</strong> wins and <strong>{users[bballUserObject.id - 1]?.losses}</strong> losses</h4>
    <br /><br />
    <div className="random-phrase">{randomPhrase}</div>
    <div className="btn-container"><Link to="/draft"><button className="btn btn-primary restart-btn btn-lg">Let's goooooo againnnnnnn</button></Link></div>
    </>
}