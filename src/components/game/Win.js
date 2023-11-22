import { Link } from "react-router-dom"
import { NavBar } from "../nav/NavBar"
import { useEffect, useState } from "react"

export const Win = () => {
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

    const winImages = ["https://media.tenor.com/Alah2Goh5NcAAAAC/kobe-bryant-kobe.gif", "https://media.tenor.com/uPJwpMp_ljcAAAAC/stephen-curry-thats-right-we-won.gif", "https://media.tenor.com/KhVsde5_uNoAAAAC/basketball-celebrate.gif", "https://media.tenor.com/7pJ9jtMUNB0AAAAC/jayhawks-basketball.gif", "https://media1.giphy.com/media/rVzvUgOpJlQkS06ZMO/giphy.gif?cid=ecf05e479r8y0o1par7jmnhqr0d3w5q6rgd9cb58vwjqlw67&ep=v1_gifs_search&rid=giphy.gif&ct=g", "https://media0.giphy.com/media/Pt2KTiAG2ZPwdc0tde/giphy.gif?cid=ecf05e47b36jwjoqpsjty79bsok2j5svwkr2rl77qlp7oua4&ep=v1_gifs_search&rid=giphy.gif&ct=g", "https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExcXV4MzQ2ajlnMG04b2R5b29lYWdoc21yOHJoaWttaGgxOHE1YWk4NyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/LNnWGuPSnjGZ7CqDfd/giphy.gif", "https://i.pinimg.com/originals/46/55/3a/46553a5ace7c54c22473800242af559c.gif", "https://media.tenor.com/cqLFS9f6xJMAAAAC/vince-carter-its-over.gif", "https://images.prismic.io/coachtube%2F4e2e7b4c-ade1-4781-a463-805fa3d490f3_antoine-walker-gif-1.gif?auto=compress,format" ]
    const winPhrases = ["OK you cooked. Absolutely respect that and must recognize how baller you truly are. But....can you friggin do it again??? I DARE YOU TO TRY!!!!", "Damn honestly I didn't think you could do it. No offense. You're just not great at this and didn't seem like you wanted to improve or win at all. But that's just me. It'd really show everybody what's up if you DO IT AGAIN!!!!!", "Wow great job!!!! You really beat this game!!! I would hug you if I wasn't a computer. Well maybe. Could be awkward. Hmmm maybe play again while I consider this, we'll circle back I promise.", "What the hell how did you do that??? PROVE IT DO IT AGAIN, I DON'T BELIEVE IT HAPPENED, I WAS LOOKING AT SOMETHING ELSE I MISSED IT. PROOOOOOOVEEEE ITTTTTTT!!!!", "good lord that CPU team was bad huh", "holy cow you drafted an awesome team. I mean let's be clear you got extremely lucky, and this game is extremely easy. But other than that yeah it was all skill. Can you repeat though?", "Dang I really thought the CPU was gonna get you there. Classic me, betting against the winning team. Hah, classic me again, making this all about myself. Good lord I have issues. Oh my god you're still here? Wow sorry about that. Do you uh...want to play again??"]
    const randomNumber = (num) => {
        let ranNum = Math.floor((Math.random()) * (num))
        return parseInt(ranNum)
    }

    let randomPhrase = winPhrases[randomNumber(winPhrases.length)]
    let randomImage = winImages[randomNumber(winImages.length)]
    console.log(randomImage)
    console.log(randomPhrase)

    return <>
    {getUsers}
    <NavBar />
    <h2>YOU WON!!</h2>
    <img src={randomImage} />
    <h4 className="userRecordW"><strong>{users[bballUserObject.id - 1]?.teamName}</strong>'s Record Against the CPU is: <br /><br /><strong>{users[bballUserObject.id - 1]?.wins}</strong> wins and <strong>{users[bballUserObject.id - 1]?.losses}</strong> losses</h4>
    <br /><br />
    <div className="random-phrase">{randomPhrase}</div>
    <div className="btn-container"><Link to="/draft"><button className="btn btn-primary restart-btn btn-lg">Let's goooooo againnnnnnn</button></Link></div>
    </>
}