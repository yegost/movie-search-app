import { BrowserRouter, Routes, Route } from "react-router-dom"
import Home from './pages/Home'
import SearchResults from "./pages/SearchResults"
import MovieDetail from "./pages/MovieDetail"
import Favorites from "./pages/Favorites"
import PersonDetail from "./pages/PersonDetail"

function App() {
  return(
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/search" element={<SearchResults />} />
        <Route path="/movie/:id" element={<MovieDetail />} />
        <Route path="/favorites" element={<Favorites />} />
        <Route path="/person/:id" element={<PersonDetail />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App