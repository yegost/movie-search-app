import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useFavorites = create(
    persist(
        (set, get) => ({
            favorites: [],
            addFavorite: (movie) => set((state) => ({
                favorites: [...state.favorites, movie]
            })), 
            removeFavorite: (id) => set((state) => ({
                favorites: state.favorites.filter((m) => m.id !== id)
            })),
            isFavorite: (id) => get().favorites.some((m) => m.id === id),
        }),
        { name: 'movie-favorites'}
    )
)

export default useFavorites