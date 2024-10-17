import React from 'react';
import renderer from 'react-test-renderer';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import Bar from './Bar';

const mockStore = configureStore([]);

// Мокируем все компоненты, которые использует Bar
jest.mock('@/components/Player/Player', () => 'Player');
jest.mock('@/components/TrackPlay/TrackPlay', () => 'TrackPlay');
jest.mock('@/components/Volume/Volume', () => 'Volume');
jest.mock('@/components/ProgressBar/ProgressBar', () => ({
  ProgressBar: () => 'ProgressBar'
}));
jest.mock('@/components/TimeTrack/TimeTrack', () => 'TimeTrack');
jest.mock('@/components/Skeleton/Skeleton', () => 'Skeleton');

describe('Bar component', () => {
  it('renders correctly', () => {
    const store = mockStore({
      audioPlayer: {
        currentTrack: {
          _id: 1,
          name: 'Test Track',
          author: 'Test Author',
        },
        isLoading: false,
      },
    });

    const tree = renderer.create(
      <Provider store={store}>
        <Bar />
      </Provider>
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });
});