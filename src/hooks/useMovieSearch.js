import { useState, useEffect } from "react"

function useMovieSearch(query) {
    const [movies, setMovies] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    useEffect(() => {
        if (!query) {
            setMovies([])
            return
        }

        const timeout = setTimeout(async () => {
            setLoading(true)
            
            try {
                const response = await fetch(
                    `https://api.themoviedb.org/3/search/movie?query=${query}&language=en-US&page=1`,
                    {
                        headers: {
                            Authorization: `Bearer ${import.meta.env.VITE_TMDB_TOKEN}`
                        },
                    }
                )
                const data = await response.json()
                const filtered = (data.results || []).filter(
                    m => m.backdrop_path && m.poster_path
                )
                setMovies(filtered)
            } catch(error) {
                setError('Something went wrong')
            } finally {
                setLoading(false)
            }
        }, 500)

        return () => clearTimeout(timeout)
    }, [query])

    return { movies, loading, error}
}

export default useMovieSearch