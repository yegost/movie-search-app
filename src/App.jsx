import SearchBar from "./components/SearchBar"
import MovieCard from "./components/MovieCard"
import useMovieSearch from "./hooks/useMovieSearch"
import { useState } from "react"

function App() {
  const [query, setQuery] = useState('')

  const { movies, loading, error } = useMovieSearch(query)

  return (
    <div>
      <h1>Movie App</h1>
      <SearchBar
        onSearch={setQuery}
      />
      {movies.map((movie) => (
        <MovieCard key={movie.id} movie={movie} />
      ))}
    </div>
  )
}

export default App