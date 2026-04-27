import { create } from "zustand";

const useFavoritesStore = create((set, get) => ({
  favorites: [],
  addFavorite:    (id) => set((s) => ({ favorites: [...s.favorites, id] })),
  removeFavorite: (id) => set((s) => ({ favorites: s.favorites.filter((f) => f !== id) })),
  isFavorite:     (id) => get().favorites.includes(id),
  clearAll:       ()   => set({ favorites: [] }),
}));

export default useFavoritesStore;
