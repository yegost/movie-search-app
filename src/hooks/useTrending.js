import { useState, useEffect } from "react"

function useTrending() {
    const [movies, setMovies] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    useEffect(() => {
        const fetchMovies = async () => {
            setLoading(true)

            try {
                const response = await fetch(
                    `https://api.themoviedb.org/3/trending/movie/day`,
                    {
                        headers: { 
                            Authorization: `Bearer ${import.meta.env.VITE_TMDB_TOKEN}`
                        }
                    }
                )
                const data = await response.json()
                setMovies(data.results.slice(0, 12))
            } catch (error) {
                setError(error)
            } finally {
                setLoading(false)
            }
        }
        fetchMovies()
    }, [])

    return {  movies, loading, error }
}

export default useTrending