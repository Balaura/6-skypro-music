import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { createTestStore, RootState } from '../../utils/testUtils';
import Player from './Player';

jest.mock('@/hooks/useAudioPlayer', () => ({
     useAudioPlayer: () => ({
       togglePlayPause: jest.fn(),
       toggleLooping: jest.fn(),
       playNextTrack: jest.fn(),
       playPreviousTrack: jest.fn(),
       toggleShuffle: jest.fn(),
       isPlaying: false,
       isLooping: false,
       isShuffling: false,
     }),
   }));

describe('Player component', () => {
  it('renders correctly and responds to button clicks', () => {
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
        <Player />
      </Provider>
    );

    const playButton = screen.getByTestId('play-button');
    const nextButton = screen.getByTestId('next-button');
    const prevButton = screen.getByTestId('prev-button');
    const repeatButton = screen.getByTestId('repeat-button');
    const shuffleButton = screen.getByTestId('shuffle-button');

    fireEvent.click(playButton);
    fireEvent.click(nextButton);
    fireEvent.click(prevButton);
    fireEvent.click(repeatButton);
    fireEvent.click(shuffleButton);

  });
});