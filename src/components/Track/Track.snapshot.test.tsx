import React from 'react';
import renderer from 'react-test-renderer';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import Track from './Track';

const mockStore = configureStore([]);

describe('Track component', () => {
  it('renders correctly', () => {
    const store = mockStore({
      audioPlayer: {
        isPlaying: false,
        currentTrack: null,
        favoriteTracks: [],
      },
      auth: {
        username: 'testUser',
      },
    });

    const track = {
      _id: 1,
      name: 'Test Track',
      author: 'Test Author',
      release_date: '2023-01-01',
      genre: 'Test Genre',
      duration_in_seconds: 180,
      album: 'Test Album',
      track_file: 'http://example.com/test.mp3',
      artist: 'Test Artist',
    };

    const tree = renderer.create(
      <Provider store={store}>
        <Track
          {...track}
          isPlaying={false}
          isCurrentTrack={false}
          onPlay={() => {}}
        />
      </Provider>
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });
});