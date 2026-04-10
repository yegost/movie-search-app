# 🎬 Movie Search App

A dark, cinematic movie discovery app built with React and the TMDB API. Search for movies, explore details, discover cast members, and save your favourites.

---

## Features

- **Movie Search** — debounced search with live recommendations
- **Movie Detail** — backdrop hero, description, cast slider, streaming providers, recommendations
- **Person Detail** — actor/director profile with biography and filmography accordion
- **Favourites** — save movies with a heart button, persisted to localStorage via Zustand
- **Trending** — homepage shows trending movies of the day
- **Responsive** — mobile drawer nav, adaptive grid layouts

---

## 🌐 Live Demo

👉 https://yegost.github.io/movie-search-app/

---

## Tech Stack

| Tool | Purpose |
|---|---|
| React | UI framework |
| React Router | Client-side routing |
| Zustand | Global state + localStorage persistence |
| Tailwind CSS | Styling |
| TMDB API | Movie data, images, streaming providers |
| Vite | Build tool |

---

## Pages

| Route | Page |
|---|---|
| `/` | Home — hero search + trending movies |
| `/search?query=...` | Search Results |
| `/movie/:id` | Movie Detail |
| `/person/:id` | Person Detail |
| `/favorites` | Saved Favourites |

---

## Project Structure

```
src/
├── components/
│   ├── NavBar.jsx
│   ├── SearchBar.jsx
│   ├── MovieCard.jsx
│   ├── CastCard.jsx
│   └── CastSlider.jsx
├── pages/
│   ├── Home.jsx
│   ├── SearchResults.jsx
│   ├── MovieDetail.jsx
│   ├── PersonDetail.jsx
│   └── Favorites.jsx
├── hooks/
│   ├── useMovieSearch.js
│   ├── useMovieDetail.js
│   ├── usePersonDetail.js
│   ├── useRecommendations.js
│   └── useTrending.js
├── store/
│   └── useFavorites.js
├── App.jsx
└── index.css
```

---

## Getting Started

### Prerequisites
- Node.js
- A free [TMDB API key](https://www.themoviedb.org/settings/api)

### Installation

```bash
git clone https://github.com/yourusername/movie-app.git
cd movie-app
npm install
```

### Environment Variables

Create a `.env` file in the root:

```
VITE_TMDB_TOKEN=your_tmdb_read_access_token
```

> Use the **API Read Access Token** (long token), not the short API key.

### Run

```bash
npm run dev
```

App runs at `http://localhost:5173`

---

## Attribution

This product uses the TMDB API but is not endorsed or certified by TMDB.

![TMDB Logo](https://www.themoviedb.org/assets/2/v4/logos/v2/blue_short-8e7b30f73a4020692ccca9c88bafe5dcb6f8a62a4c6bc55cd9ba82bb2cd95f6c.svg)
```
