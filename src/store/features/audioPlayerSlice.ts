import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Track } from '@/hooks/useFetchTracks';

interface AudioPlayerState {
  isPlaying: boolean;
  currentTrack: Track | null;
  playlist: Track[];
  isShuffling: boolean;
  isLooping: boolean;
  volume: number;
  currentTime: number;
  duration: number;
  favoriteTracks: number[];
  isLoading: boolean;
}

const initialState: AudioPlayerState = {
  isPlaying: false,
  currentTrack: null,
  playlist: [],
  isShuffling: false,
  isLooping: false,
  volume: 0.5,
  currentTime: 0,
  duration: 0,
  favoriteTracks: [],
  isLoading: true,
};

const audioPlayerSlice = createSlice({
  name: 'audioPlayer',
  initialState,
  reducers: {
    setIsPlaying: (state, action: PayloadAction<boolean>) => {
      state.isPlaying = action.payload;
    },
    setCurrentTrack: (state, action: PayloadAction<Track | null>) => {
      state.currentTrack = action.payload;
    },
    setPlaylist: (state, action: PayloadAction<Track[]>) => {
      state.playlist = action.payload;
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
  },
});

export const {
  setIsPlaying,
  setCurrentTrack,
  setPlaylist,
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
} = audioPlayerSlice.actions;

export default audioPlayerSlice.reducer;