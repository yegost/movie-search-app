import NavBar from "../components/NavBar";
import SearchBar from "../components/SearchBar";
import { useNavigate } from "react-router-dom";

function Home() {
    const [query, setQuery] = useState('')

    return(
        <>
            <NavBar />
            <section>
                <p>discover cinema</p>
                <h1>What's on your mind?</h1>
                <SearchBar 
                    onSearch={setQuery}
                 />
            </section>
        </>
    )
}

export default Home