import { Link } from "react-router-dom"

function NavBar() {
    return(
        <header>
            <div className="title">
                <h1>Movie Search</h1>
            </div>
            <div>
                <Link to="/">Home</Link>
                <Link to="/favorites">Favorites</Link>
            </div>
            <div className="nav-search-bar"></div>
        </header>
    )
}

export default NavBar