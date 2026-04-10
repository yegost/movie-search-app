import { Link, useLocation, useNavigate } from "react-router-dom"
import { useState, useRef, useEffect } from "react"
import SearchBar from "./SearchBar"

function NavBar() {
    const location = useLocation()
    const navigate = useNavigate()
    const [query, setQuery] = useState('')
    const [searchOpen, setSearchOpen] = useState(false)
    const [navOpen, setNavOpen] = useState(false)
    const searchRef = useRef(null)
    const navRef = useRef(null)

    const handleSearch = () => {
        if (query) {
            navigate(`/search?query=${query}`)
            setSearchOpen(false)
            setQuery('')
        }
    }

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (searchRef.current && !searchRef.current.contains(e.target)) {
                setSearchOpen(false)
            }
            if (navRef.current && !navRef.current.contains(e.target)) {
                setNavOpen(false)
            }
        }

        document.addEventListener('mousedown', handleClickOutside)
        return () => document.removeEventListener('mousedown', handleClickOutside)
    }, [])

    const linkClass = (path) => 
        location.pathname === path
            ? "text-red-500 border-b-2 border-red-500 pb-1 hover:text-red-800" 
            : "text-zinc-400 hover:text-red-800"

    return(
        <header className="sticky top-0 z-50 bg-zinc-950 border-b border-zinc-800 flex items-center justify-between px-8 py-6">
            <div>
                <Link to="/"><h2 className="italic text-red-500 tracking-tight">MOVIE SEARCH</h2></Link>
            </div>
            <div className="block sm:hidden">
                <button 
                    className="cursor-pointer"
                    onClick={() => setNavOpen(!navOpen)}
                >
                    <img className="pt-2 pb-2" src={`${import.meta.env.BASE_URL}nav.png`} alt="Nav button" />
                </button>
                {navOpen && (
                    <div 
                        className="fixed inset-0 bg-black/50 z-40"
                        onClick={() => setNavOpen(false)}
                    />
                )}
                <div className={`fixed bg-black top-0 right-0 bottom-0 transition-all duration-300 z-50 border-l border-zinc-800 ${navOpen ? "w-80" : "w-0"}`} ref={navRef}>
                    <div className="p-5 border-b border-zinc-800 flex justify-between">
                        <button
                            className="cursor-pointer"
                            onClick={() => setNavOpen(false)}
                        >
                            <img src={`${import.meta.env.BASE_URL}close.png`} alt="Close button" />
                        </button>
                        <h3 className="text-white">MENU</h3>
                    </div>
                    <div className="flex flex-col p-5 gap-3">
                        <div className="text-2xl">
                            <Link 
                                to="/" 
                                onClick={() => setNavOpen(false)} 
                                className={linkClass("/")}>HOME</Link>
                        </div>
                        <div className="text-2xl">
                            <Link 
                                to="/favorites" 
                                onClick={() => setNavOpen(false)}
                                className={linkClass("/favorites")}>FAVORITES</Link>
                        </div>
                    </div>
                </div>
            </div>
            <div className="hidden sm:flex flex-row items-center">
                {location.pathname !== "/" && (
                    <div className="flex items-center gap-2" ref={searchRef}>
                        <div className={`overflow-hidden transition-all duration-300 ${searchOpen ? 'w-64' : 'w-0'}`}>
                            <SearchBar 
                                onSearch={setQuery} 
                                onKeyDown={handleSearch} 
                                className="text-sm px-4 py-2 bg-zinc-800 text-white rounded-lg w-64 border-zinc-600 focus:outline-none border focus:border-red-500 transition-all duration-250"
                                placeholder="Search movies..."
                            />
                        </div>
                        <button 
                            onClick={() => setSearchOpen(!searchOpen)}
                            className="text-zinc-400 hover:text-red-500 transition-colors cursor-pointer duration-200"
                        >
                            {!searchOpen && (
                                <img src={`${import.meta.env.BASE_URL}search.png`} alt="Search button" className="w-6 text-white" />
                            )}
                        </button>    
                    </div>
                )}
                <div className="m-4 mb-5 space-x-6 text-xs tracking-widest font-semibold">
                    <Link to="/" className={linkClass("/")}>HOME</Link>
                    <Link to="/favorites" className={linkClass("/favorites")}>FAVORITES</Link>
                </div>
            </div>
        </header>
    )
}

export default NavBar