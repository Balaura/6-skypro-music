import React from 'react';
import { render, act } from '@testing-library/react';
import { useAudioPlayer } from './useAudioPlayer';
import { Provider } from 'react-redux';
import { createTestStore } from '../utils/testUtils';
import '@testing-library/jest-dom';
import { Track } from '@/hooks/useFetchTracks';

jest.mock('@/utils/audioPlayer', () => ({
  getAudioElement: jest.fn(() => ({
    play: jest.fn().mockResolvedValue(undefined),
    pause: jest.fn(),
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    volume: 0.5,
    currentTime: 0,
    duration: 180,
  })),
}));

const TestComponent: React.FC<{ onRender: (handlePlay: any) => void }> = ({ onRender }) => {
  const { handlePlay } = useAudioPlayer();
  React.useEffect(() => {
    onRender(handlePlay);
  }, [handlePlay, onRender]);
  return null;
};

describe('useAudioPlayer', () => {
  it('handlePlay starts playing a new track', async () => {
    const store = createTestStore();
    let handlePlayFunction: any;

    await act(async () => {
      render(
        <Provider store={store}>
          <TestComponent onRender={(handlePlay) => { handlePlayFunction = handlePlay; }} />
        </Provider>
      );
    });

    const newTrack: Track = {
      _id: 1,
      name: 'Test Track',
      author: 'Test Author',
      release_date: '2023-01-01',
      genre: 'Test Genre',
      duration_in_seconds: 180,
      album: 'Test Album',
      track_file: 'test.mp3',
      artist: 'Test Artist',
    };

    await act(async () => {
      handlePlayFunction(newTrack, [newTrack]);
    });

    // Добавьте небольшую задержку, чтобы дать время для обновления состояния
    await new Promise(resolve => setTimeout(resolve, 0));

    const state = store.getState().audioPlayer;
    expect(state.currentTrack).toEqual(expect.objectContaining({
      _id: 1,
      name: 'Test Track',
    }));
    expect(state.isPlaying).toBe(true);
  });
});