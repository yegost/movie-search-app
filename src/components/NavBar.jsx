import { Link, useLocation, useNavigate } from "react-router-dom"
import { useState } from "react"
import SearchBar from "./SearchBar"

function NavBar() {
    const location = useLocation()
    const navigate = useNavigate()
    const [query, setQuery] = useState('')

    const handleSearch = () => {
        if (query) navigate(`/search?query=${query}`)
    }

    const linkClass = (path) => 
        location.pathname === path
            ? "text-red-500 border-b-2 border-red-500 pb-1 hover:text-red-800" 
            : "text-zinc-400 hover:text-red-800"

    return(
        <header className="bg-zinc-950 border-b border-zinc-800 flex items-center px-8 py-6">
            <div className="mr-10">
                <Link to="/"><h2 className="italic text-red-500 tracking-tight">MOVIE SEARCH</h2></Link>
            </div>
            <div className="space-x-6 text-xs tracking-widest font-semibold">
                <Link to="/" className={linkClass("/")}>HOME</Link>
                <Link to="/favorites" className={linkClass("/favorites")}>FAVORITES</Link>
            </div>
            {location.pathname !== "/" && (
                <div className="ml-auto">
                    <SearchBar 
                        onSearch={setQuery} 
                        onKeyDown={handleSearch} 
                        className="text-sm px-4 py-2 bg-zinc-800 text-white rounded-lg w-72 border border-zinc-600 focus:outline-none focus:border-red-500 focus:shadow-[0_0_10px_rgba(239,68,68,0.4)] transition-al duration-200"
                        placeholder="Search movies..."
                    />
                </div>

            )}
        </header>
    )
}

export default NavBar