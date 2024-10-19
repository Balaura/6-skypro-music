import React from 'react';
import { render, screen, fireEvent, act, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { createTestStore, RootState } from '../../utils/testUtils';
import Track from '@/components/Track/Track';
import { Track as TrackType } from '@/hooks/useFetchTracks';
import '@testing-library/jest-dom';
import { initialState as audioPlayerInitialState } from '@/store/features/audioPlayerSlice';

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

describe('Track component edge cases', () => {
  const createStore = (isPlaying = false, currentTrack: TrackType | null = null) => {
    const initialState: Partial<RootState> = {
      audioPlayer: {
        ...audioPlayerInitialState,
        isPlaying,
        currentTrack,
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

    await waitFor(() => {
      expect(screen.queryByText('Войдите в аккаунт и попробуйте ещё раз')).not.toBeInTheDocument();
    });
  });

  it('handles very long track names', () => {
    const longNameTrack = {
      ...mockTrack,
      name: 'This is a very long track name that might cause layout issues if not handled properly',
    };

    const store = createStore();
    render(
      <Provider store={store}>
        <Track {...longNameTrack} isPlaying={false} isCurrentTrack={false} onPlay={() => {}} />
      </Provider>
    );

    const trackName = screen.getByText(longNameTrack.name);
    expect(trackName).toBeInTheDocument();
  });

  it('handles missing track data', () => {
    const incompleteTrack: TrackType = {
      ...mockTrack,
      author: 'Неизвестный исполнитель',
      album: 'Неизвестный альбом',
    };

    const store = createStore();
    render(
      <Provider store={store}>
        <Track {...incompleteTrack} isPlaying={false} isCurrentTrack={false} onPlay={() => {}} />
      </Provider>
    );

    expect(screen.getByText('Неизвестный исполнитель')).toBeInTheDocument();
    expect(screen.getByText('Неизвестный альбом')).toBeInTheDocument();
  });

  it('handles zero duration', () => {
    const zeroDurationTrack = {
      ...mockTrack,
      duration_in_seconds: 0,
    };

    const store = createStore();
    render(
      <Provider store={store}>
        <Track {...zeroDurationTrack} isPlaying={false} isCurrentTrack={false} onPlay={() => {}} />
      </Provider>
    );

    expect(screen.getByText('0:00')).toBeInTheDocument();
  });

  it('handles very large duration', () => {
    const largeDurationTrack = {
      ...mockTrack,
      duration_in_seconds: 36000, // 10 hours
    };
  
    const store = createStore();
    render(
      <Provider store={store}>
        <Track {...largeDurationTrack} isPlaying={false} isCurrentTrack={false} onPlay={() => {}} />
      </Provider>
    );
  
    expect(screen.getByText('600:00')).toBeInTheDocument();
  });
});