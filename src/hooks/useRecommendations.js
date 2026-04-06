import { useState, useEffect } from "react"

function Recommendations({ id }) {
    const [movies, setMovies] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    useEffect(() => {
        const fetchMovies = async () => {
            setLoading(true)

            try {
                const response = await fetch(
                    `https://api.themoviedb.org/3/movie/${id}/recommendations`,
                    {
                        headers: {
                            Authorization: `Bearer ${import.meta.env.VITE_TMDB_TOKEN}`
                        }
                    }
                )
                const data = await response.json()
                setMovies(data.results || [])
            } catch (error) {
                setError(error)
            } finally {
                setLoading(false)
            }
        }
        fetchMovies()
    }, [id])
    return { movies, loading, error}
}

export default Recommendations