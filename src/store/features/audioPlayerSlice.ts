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
} = audioPlayerSlice.actions;

export default audioPlayerSlice.reducer;