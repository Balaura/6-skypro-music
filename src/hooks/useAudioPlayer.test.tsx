import React from 'react';
import { render, act } from '@testing-library/react';
import { useDispatch, useSelector } from 'react-redux';
import { useAudioPlayer } from './useAudioPlayer';
import { Track } from '@/hooks/useFetchTracks';

jest.mock('react-redux', () => ({
  useDispatch: jest.fn(),
  useSelector: jest.fn(),
}));

const TestComponent = () => {
  const audioPlayer = useAudioPlayer();
  return null;
};

describe('useAudioPlayer hook', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('handlePlay starts playing a new track', () => {
    const mockDispatch = jest.fn();
    (useDispatch as unknown as jest.Mock).mockReturnValue(mockDispatch);
    (useSelector as unknown as jest.Mock).mockReturnValue({
      isPlaying: false,
      currentTrack: null,
      playlist: [],
    });

    let result: ReturnType<typeof useAudioPlayer> | undefined;

    render(<TestComponent />);

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

    act(() => {
      return result?.handlePlay(newTrack, newPlaylist);
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