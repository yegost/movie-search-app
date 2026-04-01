import NavBar from "../components/NavBar";
import SearchBar from "../components/SearchBar";
import { useNavigate } from "react-router-dom";
import { useState } from "react"

function Home() {
    const [query, setQuery] = useState('')
    const navigate = useNavigate()

    const handleSearch = () => {
        if (query) navigate(`/search?query=${query}`)
    }

    return(
        <>
            <NavBar />
            <section>
                <p>discover cinema</p>
                <h1>What's on your mind?</h1>
                <SearchBar 
                    onSearch={setQuery}
                    onKeyDown={handleSearch}
                />
            </section>
        </>
    )
}

export default Home