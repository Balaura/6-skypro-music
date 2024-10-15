import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import TrackPlay from './TrackPlay';
import { Track } from '@/hooks/useFetchTracks';
import { createTestStore, RootState } from '../../utils/testUtils';

jest.mock('@/api/api', () => ({
  addTrackToFavorites: jest.fn(),
  removeTrackFromFavorites: jest.fn(),
}));

describe('TrackPlay component', () => {
  const mockTrack: Track = {
    _id: 1,
    name: 'Test Track',
    author: 'Test Author',
    release_date: '2023-01-01',
    genre: 'Test Genre',
    duration_in_seconds: 180,
    album: 'Test Album',
    track_file: 'http://example.com/test.mp3',
    artist: 'Test Artist'
  };

  it('renders track information correctly', () => {
    const initialState: Partial<RootState> = {
      audioPlayer: {
        favoriteTracks: [],
        isPlaying: false,
        currentTrack: null,
        playlist: [],
        isShuffling: false,
        isLooping: false,
        volume: 0.5,
        currentTime: 0,
        duration: 0,
        isLoading: false,
      },
      auth: {
        username: 'testUser',
        accessToken: null,
        refreshToken: null,
        status: 'idle',
        error: null,
      },
    };
    const store = createTestStore(initialState);

    render(
      <Provider store={store}>
        <TrackPlay currentTrack={mockTrack} />
      </Provider>
    );

    expect(screen.getByText('Test Track')).toBeInTheDocument();
    expect(screen.getByText('Test Author')).toBeInTheDocument();
  });

  it('handles like button click', async () => {
    const initialState: Partial<RootState> = {
      audioPlayer: {
        favoriteTracks: [],
        isPlaying: false,
        currentTrack: null,
        playlist: [],
        isShuffling: false,
        isLooping: false,
        volume: 0.5,
        currentTime: 0,
        duration: 0,
        isLoading: false,
      },
      auth: {
        username: 'testUser',
        accessToken: null,
        refreshToken: null,
        status: 'idle',
        error: null,
      },
    };
    const store = createTestStore(initialState);

    render(
      <Provider store={store}>
        <TrackPlay currentTrack={mockTrack} />
      </Provider>
    );

    const likeButton = screen.getByRole('button');
    fireEvent.click(likeButton);

    const state = store.getState();
    expect(state.audioPlayer.favoriteTracks).toContain(1);
  });
});