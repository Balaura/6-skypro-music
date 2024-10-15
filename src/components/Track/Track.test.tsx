import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import Track from './Track';
import { Track as TrackType } from '@/hooks/useFetchTracks';
import { createTestStore, RootState } from '../../utils/testUtils';

jest.mock('@/api/api', () => ({
  addTrackToFavorites: jest.fn(),
  removeTrackFromFavorites: jest.fn(),
}));

describe('Track component', () => {
  const mockTrack: TrackType = {
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
            isPlaying: false,
            currentTrack: null,
            playlist: [],
            isShuffling: false,
            isLooping: false,
            volume: 0.5,
            currentTime: 0,
            duration: 0,
            favoriteTracks: [],
            isLoading: false,
          },
          auth: {
            accessToken: null,
            refreshToken: null,
            username: 'testUser',
            status: 'idle',
            error: null,
          },
        };
    const store = createTestStore(initialState);

    render(
      <Provider store={store}>
        <Track {...mockTrack} isPlaying={false} isCurrentTrack={false} onPlay={() => {}} />
      </Provider>
    );

    expect(screen.getByText('Test Track')).toBeInTheDocument();
    expect(screen.getByText('Test Author')).toBeInTheDocument();
    expect(screen.getByText('Test Album')).toBeInTheDocument();
    expect(screen.getByText('3:00')).toBeInTheDocument();
  });

  it('handles play button click', () => {
     const initialState: Partial<RootState> = {
          audioPlayer: {
            isPlaying: false,
            currentTrack: null,
            playlist: [],
            isShuffling: false,
            isLooping: false,
            volume: 0.5,
            currentTime: 0,
            duration: 0,
            favoriteTracks: [],
            isLoading: false,
          },
          auth: {
            accessToken: null,
            refreshToken: null,
            username: 'testUser',
            status: 'idle',
            error: null,
          },
        };
    const store = createTestStore(initialState);

    const mockOnPlay = jest.fn();

    render(
      <Provider store={store}>
        <Track {...mockTrack} isPlaying={false} isCurrentTrack={false} onPlay={mockOnPlay} />
      </Provider>
    );

    const playButton = screen.getByRole('button', { name: /play/i });
    fireEvent.click(playButton);

    expect(mockOnPlay).toHaveBeenCalled();
  });

  it('shows playing animation when track is current and playing', () => {
     const initialState: Partial<RootState> = {
          audioPlayer: {
            isPlaying: false,
            currentTrack: null,
            playlist: [],
            isShuffling: false,
            isLooping: false,
            volume: 0.5,
            currentTime: 0,
            duration: 0,
            favoriteTracks: [],
            isLoading: false,
          },
          auth: {
            accessToken: null,
            refreshToken: null,
            username: 'testUser',
            status: 'idle',
            error: null,
          },
        };
    const store = createTestStore(initialState);

    render(
     <Provider store={store}>
       <Track {...mockTrack} isPlaying={false} isCurrentTrack={false} onPlay={() => {}} />
     </Provider>
   );

    expect(screen.getByTestId('playing-animation')).toBeInTheDocument();
  });
});