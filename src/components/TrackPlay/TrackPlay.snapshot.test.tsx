import React from 'react';
import renderer from 'react-test-renderer';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import TrackPlay from './TrackPlay';

const mockStore = configureStore([]);

describe('TrackPlay component', () => {
  it('renders correctly', () => {
    const store = mockStore({
      audioPlayer: {
        favoriteTracks: [],
      },
      auth: {
        username: 'testUser',
      },
    });

    const currentTrack = {
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
        <TrackPlay currentTrack={currentTrack} />
      </Provider>
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });
});