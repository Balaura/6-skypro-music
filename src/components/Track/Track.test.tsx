import React from 'react';
import { render, screen, fireEvent, act, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { createTestStore } from '../../utils/testUtils';
import Track from './Track';
import { Track as TrackType } from '@/hooks/useFetchTracks';

// Мок для api
jest.mock('../../api/api', () => ({
  ...jest.requireActual('../../api/api'),
  fetchWithAuth: jest.fn().mockImplementation(() => Promise.resolve({ ok: true, json: () => Promise.resolve({}) })),
  addTrackToFavorites: jest.fn().mockResolvedValue({}),
  removeTrackFromFavorites: jest.fn().mockResolvedValue({}),
}));

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

describe('Track component', () => {
  const createStore = (isPlaying = false, currentTrack: TrackType | null = null) => {
    const initialState = {
      audioPlayer: {
        isPlaying,
        currentTrack,
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
        username: 'testUser',
        accessToken: null,
        refreshToken: null,
        status: 'idle',
        error: null,
      },
    };
    return createTestStore(initialState);
  };

  it('renders track information correctly', async () => {
    const store = createStore();
    await act(async () => {
      render(
        <Provider store={store}>
          <Track {...mockTrack} isPlaying={false} isCurrentTrack={false} onPlay={() => {}} />
        </Provider>
      );
    });

    expect(screen.getByText('Test Track')).toBeInTheDocument();
    expect(screen.getByText('Test Author')).toBeInTheDocument();
    expect(screen.getByText('Test Album')).toBeInTheDocument();
    expect(screen.getByText('3:00')).toBeInTheDocument();
  });

  it('handles play button click', async () => {
    const store = createStore();
    const mockOnPlay = jest.fn();
    await act(async () => {
      render(
        <Provider store={store}>
          <Track {...mockTrack} isPlaying={false} isCurrentTrack={false} onPlay={mockOnPlay} />
        </Provider>
      );
    });

    const playButton = screen.getByTestId('play-button');
    await act(async () => {
      fireEvent.click(playButton);
    });

    expect(mockOnPlay).toHaveBeenCalled();
  });

  it('shows playing animation when track is current and playing', async () => {
    const store = createStore(true, mockTrack);
    await act(async () => {
      render(
        <Provider store={store}>
          <Track {...mockTrack} isPlaying={true} isCurrentTrack={true} onPlay={() => {}} />
        </Provider>
      );
    });

    expect(screen.getByTestId('playing-animation')).toBeInTheDocument();
  });

  it('does not show playing animation when track is not current', async () => {
    const store = createStore();
    await act(async () => {
      render(
        <Provider store={store}>
          <Track {...mockTrack} isPlaying={false} isCurrentTrack={false} onPlay={() => {}} />
        </Provider>
      );
    });

    expect(screen.queryByTestId('playing-animation')).not.toBeInTheDocument();
  });

  it('shows like button and handles like click', async () => {
    const store = createStore();
    await act(async () => {
      render(
        <Provider store={store}>
          <Track {...mockTrack} isPlaying={false} isCurrentTrack={false} onPlay={() => {}} />
        </Provider>
      );
    });

    const likeButton = screen.getByRole('button');
    expect(likeButton).toBeInTheDocument();

    await act(async () => {
      fireEvent.click(likeButton);
    });

    // Дожидаемся обновления состояния
    await waitFor(() => {
      expect(screen.queryByText('Войдите в аккаунт и попробуйте ещё раз')).not.toBeInTheDocument();
    });
  });
});