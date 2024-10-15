import React from 'react';
import { render, act } from '@testing-library/react';
import { useAudioPlayer } from './useAudioPlayer';
import { Track } from '@/hooks/useFetchTracks';

// Мок для react-redux
const mockDispatch = jest.fn();
jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useDispatch: () => mockDispatch,
  useSelector: jest.fn().mockImplementation((selector) => 
    selector({
      audioPlayer: {
        isPlaying: false,
        currentTrack: null,
        playlist: [],
        volume: 0.5,
      }
    })
  ),
}));

// Фабричная функция для создания мока аудио
const createMockAudio = () => ({
  play: jest.fn(),
  pause: jest.fn(),
  addEventListener: jest.fn(),
  removeEventListener: jest.fn(),
  volume: 0.5,
});

// Мок для audioPlayer
jest.mock('@/utils/audioPlayer', () => ({
  getInstance: jest.fn().mockReturnValue({
    getAudioElement: jest.fn().mockReturnValue(createMockAudio()),
  }),
}));

const TestComponent = () => {
  const audioPlayer = useAudioPlayer();
  return null;
};

describe('useAudioPlayer hook', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('handlePlay starts playing a new track', async () => {
    let result: ReturnType<typeof useAudioPlayer> | undefined;

    await act(async () => {
      render(<TestComponent />);
    });

    act(() => {
      result = useAudioPlayer();
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
      artist: 'Test Artist'
    };
    const newPlaylist = [newTrack];

    await act(async () => {
      result?.handlePlay(newTrack, newPlaylist);
    });

    expect(mockDispatch).toHaveBeenCalledWith(expect.objectContaining({
      type: 'audioPlayer/setCurrentTrack',
      payload: newTrack,
    }));
    expect(mockDispatch).toHaveBeenCalledWith(expect.objectContaining({
      type: 'audioPlayer/setIsPlaying',
      payload: true,
    }));
  });
});