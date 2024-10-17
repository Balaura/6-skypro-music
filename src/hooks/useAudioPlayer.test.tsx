import React from 'react';
import { render, act } from '@testing-library/react';
import { useAudioPlayer } from './useAudioPlayer';
import { Track } from '@/hooks/useFetchTracks';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';

const mockStore = configureStore([]);

jest.mock('@/utils/audioPlayer', () => ({
  getAudioElement: jest.fn(() => ({
    play: jest.fn(),
    pause: jest.fn(),
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    volume: 0.5,
  })),
}));

// Создаем тестовый компонент, который использует хук
const TestComponent: React.FC = () => {
  const { handlePlay } = useAudioPlayer();
  
  React.useEffect(() => {
    const newTrack: Track = {
      _id: 1,
      name: 'Test Track',
      author: 'Test Author',
      release_date: '2023-01-01',
      genre: 'Test Genre',
      duration_in_seconds: 180,
      album: 'Test Album',
      track_file: 'test.mp3',
      artist: 'Test Artist'
    };
    const newPlaylist = [newTrack];
    handlePlay(newTrack, newPlaylist);
  }, []);

  return null;
};

describe('useAudioPlayer hook', () => {
  let store: any;

  beforeEach(() => {
    store = mockStore({
      audioPlayer: {
        isPlaying: false,
        currentTrack: null,
        playlist: [],
        volume: 0.5,
      }
    });
  });

  it('handlePlay starts playing a new track', async () => {
    await act(async () => {
      render(
        <Provider store={store}>
          <TestComponent />
        </Provider>
      );
    });

    const actions = store.getActions();
    
    expect(actions).toContainEqual(expect.objectContaining({
      type: 'audioPlayer/setCurrentTrack',
      payload: expect.any(Object),
    }));

    expect(actions).toContainEqual(expect.objectContaining({
      type: 'audioPlayer/setIsPlaying',
      payload: true,
    }));
  });
});