import { configureStore, combineReducers } from '@reduxjs/toolkit';
import audioPlayerReducer from '../store/features/audioPlayerSlice';
import authReducer from '../store/features/authSlice';
import { AudioPlayerState } from '../store/features/audioPlayerSlice';
import { AuthState } from '../store/features/authSlice';

// Определяем тип для корневого состояния
export type RootState = {
  audioPlayer: AudioPlayerState;
  auth: AuthState;
};

// Создаем корневой reducer
const rootReducer = combineReducers({
  audioPlayer: audioPlayerReducer,
  auth: authReducer,
});

// Функция для создания тестового store
export const createTestStore = (preloadedState?: Partial<RootState>) => {
  return configureStore({
    reducer: rootReducer,
    preloadedState: preloadedState as RootState,
  });
};