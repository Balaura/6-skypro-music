import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { createTestStore } from '../../utils/testUtils';
import Bar from '@/components/Bar/Bar';
import { RootState } from '@/utils/testUtils';
import { Track } from '@/hooks/useFetchTracks';
jest.mock('@/components/Player/Player');

describe('Bar component', () => {
  it('renders correctly when there is a current track', () => {
     const initialState: Partial<RootState> = {
          audioPlayer: {
            currentTrack: {
                 _id: '1',
                 name: 'Test Track',
                 author: 'Test Author',
            } as unknown as Track, // Приведение типа к Track
            isLoading: false,
            isPlaying: false,
            playlist: [],
            isShuffling: false,
            isLooping: false,
            volume: 0.5,
            currentTime: 0,
            duration: 0,
            favoriteTracks: [],
          },
          auth: {
            username: 'testUser',
            accessToken: null,
            refreshToken: null,
            status: 'idle',
            error: null,
          },
        };
    const store = createTestStore(initialState);

    render(
      <Provider store={store}>
        <Bar />
      </Provider>
    );

    expect(screen.getByText('Test Track')).toBeInTheDocument();
    expect(screen.getByText('Test Author')).toBeInTheDocument();
  });

  it('does not render TrackPlay when there is no current track', () => {
    const initialState: Partial<RootState> = {
      audioPlayer: {
        currentTrack: null as unknown as Track, // Приведение типа к Track
        isLoading: false,
        isPlaying: false,
        playlist: [],
        isShuffling: false,
        isLooping: false,
        volume: 0.5,
        currentTime: 0,
        duration: 0,
        favoriteTracks: [],
      },
      auth: {
        username: 'testUser',
        accessToken: null,
        refreshToken: null,
        status: 'idle',
        error: null,
      },
    };
  
    const store = createTestStore(initialState);
  
    render(
      <Provider store={store}>
        <Bar />
      </Provider>
    );
  
    expect(screen.queryByText('Test Track')).not.toBeInTheDocument();
    expect(screen.queryByText('Test Author')).not.toBeInTheDocument();
  }); 
})