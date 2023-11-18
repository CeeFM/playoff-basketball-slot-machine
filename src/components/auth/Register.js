import { useState } from "react"
import { useNavigate } from "react-router-dom"
import "./Login.css"

export const Register = (props) => {
    const [customer, setCustomer] = useState({
        email: "",
        fullName: "",
        wins: 0,
        losses: 0,
        username: "",
        teamName: ""
    })
    let navigate = useNavigate()

    const registerNewUser = () => {
        return fetch("http://localhost:8088/users", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(customer)
        })
            .then(res => res.json())
            .then(createdUser => {
                if (createdUser.hasOwnProperty("id")) {
                    localStorage.setItem("bball_user", JSON.stringify({
                        id: createdUser.id,
                    }))

                    navigate("/")
                }
            })
    }

    const handleRegister = (e) => {
        e.preventDefault()
        return fetch(`http://localhost:8088/users?email=${customer.email}`)
            .then(res => res.json())
            .then(response => {
                if (response.length > 0) {
                    // Duplicate email. No good.
                    window.alert("Account with that email address already exists")
                }
                else {
                    // Good email, create user.
                    registerNewUser()
                }
            })
    }

    const updateCustomer = (evt) => {
        const copy = {...customer}
        copy[evt.target.id] = evt.target.value
        setCustomer(copy)
    }

    return (
        <main style={{ textAlign: "center" }}>
            <form className="form--login" onSubmit={handleRegister}>
                <img className="title login-img" src="https://image-cdn.hypb.st/https%3A%2F%2Fhypebeast.com%2Fimage%2F2016%2F12%2Fnba-jam-in-real-life-fire-basketball-video-0.jpg?w=960&cbr=1&q=90&fit=max" />
                <h1 className="h3 mb-3 font-weight-normal">Please Register If You Wanna BALL OUT</h1>
                <fieldset>
                    <label htmlFor="fullName"> Full Name </label>
                    <input onChange={updateCustomer}
                           type="text" id="fullName" className="form-control"
                           placeholder="Enter your name" required autoFocus />
                </fieldset>
                <fieldset>
                    <label htmlFor="username"> Username </label>
                    <input onChange={updateCustomer}
                           type="text" id="username" className="form-control"
                           placeholder="Enter a username" required autoFocus />
                </fieldset>
                <fieldset>
                    <label htmlFor="email"> Email address </label>
                    <input onChange={updateCustomer}
                        type="email" id="email" className="form-control"
                        placeholder="Email address" required />
                </fieldset>
                <fieldset>
                    <label htmlFor="teamName">Team Name</label>
                    <input onChange={updateCustomer}
                        type="text" id="teamName" className="form-control"
                        placeholder="Make up a name for your team" required />
                </fieldset>
                <fieldset>
                    <button type="submit" className="btn btn-primary"> Register </button>
                </fieldset>
            </form>
        </main>
    )
}

