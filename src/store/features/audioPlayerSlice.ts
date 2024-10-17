import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Track } from '@/hooks/useFetchTracks';

export interface AudioPlayerState {
  isPlaying: boolean;
  currentTrack: Track | null;
  playlist: Track[];
  currentPlaylist: Track[];
  isShuffling: boolean;
  isLooping: boolean;
  volume: number;
  currentTime: number;
  duration: number;
  favoriteTracks: number[];
  isLoading: boolean;
  // Новые поля
  searchKeyword: string;
  selectedArtists: string[];
  selectedGenres: string[];
  selectedYear: string | null;
  sortOption: 'default' | 'new' | 'old';
}

export const initialState: AudioPlayerState = {
  isPlaying: false,
  currentTrack: null,
  playlist: [],
  currentPlaylist: [],
  isShuffling: false,
  isLooping: false,
  volume: 0.5,
  currentTime: 0,
  duration: 0,
  favoriteTracks: [],
  isLoading: true,
  // Инициализация новых полей
  searchKeyword: '',
  selectedArtists: [],
  selectedGenres: [],
  selectedYear: null,
  sortOption: 'default',
};

const audioPlayerSlice = createSlice({
  name: 'audioPlayer',
  initialState,
  reducers: {
    // Существующие редьюсеры
    setIsPlaying: (state, action: PayloadAction<boolean>) => {
      state.isPlaying = action.payload;
    },
    setCurrentTrack: (state, action: PayloadAction<Track | null>) => {
      state.currentTrack = action.payload;
    },
    setPlaylist: (state, action: PayloadAction<Track[]>) => {
      state.playlist = action.payload;
    },
    setCurrentPlaylist: (state, action: PayloadAction<Track[]>) => {
      state.currentPlaylist = action.payload;
    },
    setIsShuffling: (state, action: PayloadAction<boolean>) => {
      state.isShuffling = action.payload;
    },
    setIsLooping: (state, action: PayloadAction<boolean>) => {
      state.isLooping = action.payload;
    },
    setVolume: (state, action: PayloadAction<number>) => {
      state.volume = action.payload;
    },
    setCurrentTime: (state, action: PayloadAction<number>) => {
      state.currentTime = action.payload;
    },
    setDuration: (state, action: PayloadAction<number>) => {
      state.duration = action.payload;
    },
    initializePlaylist: (state, action: PayloadAction<Track[]>) => {
      state.playlist = action.payload;
    },
    addToFavorites: (state, action: PayloadAction<number>) => {
      if (!state.favoriteTracks.includes(action.payload)) {
        state.favoriteTracks.push(action.payload);
      }
    },
    removeFromFavorites: (state, action: PayloadAction<number>) => {
      state.favoriteTracks = state.favoriteTracks.filter(id => id !== action.payload);
    },
    setFavoriteTracks: (state, action: PayloadAction<number[]>) => {
      state.favoriteTracks = action.payload;
    },
    setIsLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    clearFavoriteTracks: (state) => {
      state.favoriteTracks = [];
    },
    // Новые редьюсеры
    setSearchKeyword: (state, action: PayloadAction<string>) => {
      state.searchKeyword = action.payload;
    },
    setSelectedArtists: (state, action: PayloadAction<string[]>) => {
      state.selectedArtists = action.payload;
    },
    setSelectedGenres: (state, action: PayloadAction<string[]>) => {
      state.selectedGenres = action.payload;
    },
    setSelectedYear: (state, action: PayloadAction<string | null>) => {
      state.selectedYear = action.payload;
    },
    setSortOption: (state, action: PayloadAction<'default' | 'new' | 'old'>) => {
      state.sortOption = action.payload;
    },
  },
});

export const {
  setIsPlaying,
  setCurrentTrack,
  setPlaylist,
  setCurrentPlaylist,
  setIsShuffling,
  setIsLooping,
  setVolume,
  setCurrentTime,
  setDuration,
  initializePlaylist,
  addToFavorites,
  removeFromFavorites,
  setFavoriteTracks,
  setIsLoading,
  clearFavoriteTracks,
  // Экспорт новых действий
  setSearchKeyword,
  setSelectedArtists,
  setSelectedGenres,
  setSelectedYear,
  setSortOption,
} = audioPlayerSlice.actions;

export default audioPlayerSlice.reducer;