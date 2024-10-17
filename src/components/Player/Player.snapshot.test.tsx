import React from 'react';
import renderer from 'react-test-renderer';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import Player from './Player';

const mockStore = configureStore([]);

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
  it('renders correctly', () => {
    const store = mockStore({
      audioPlayer: {
        isPlaying: false,
        isLooping: false,
        isShuffling: false,
      },
    });

    const tree = renderer.create(
      <Provider store={store}>
        <Player />
      </Provider>
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });
});