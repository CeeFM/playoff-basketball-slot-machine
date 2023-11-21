import { Link, useNavigate } from "react-router-dom"
import "./NavBar.css"



export const NavBar = () => {
    const navigate = useNavigate()

 return <ul className="navbar">
    {
        localStorage.getItem("bball_user")
            ? <li className="navbar__item navbar__logout">
                <Link className="navbar__link" to="/" onClick={() => {
                    localStorage.removeItem("bball_user")
                    navigate("/login", {replace: true})
                }}><button className="btn btn-primary logout-btn btn-lg">Logout</button></Link>
            </li>
            : ""
    }
</ul>
}