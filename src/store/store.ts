import { combineReducers, configureStore } from "@reduxjs/toolkit";
import authReducer from "./features/authSlice";
import { TypedUseSelectorHook, useDispatch, useSelector, useStore } from "react-redux";
import audioPlayerReducer from './features/audioPlayerSlice';

export const makeStore = () => {
  return configureStore({
    reducer: {
      auth: authReducer,
      audioPlayer: audioPlayerReducer,
    },
  });
};
// Тип AppStore представляет собой тип нашего хранилища Redux, который возвращает функция makeStore.
export type AppStore = ReturnType<typeof makeStore>;

// Тип RootState представляет собой тип состояния нашего приложения, который возвращает функция getState хранилища Redux.
export type RootState = ReturnType<AppStore["getState"]>;

// Тип AppDispatch представляет собой тип функции диспетчера, который возвращает функция dispatch хранилища Redux.
export type AppDispatch = AppStore["dispatch"];

// Хуки useAppDispatch, useAppSelector и useAppStore позволяют использовать функции useDispatch, useSelector и useStore из библиотеки react-redux с типизацией.
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export const useAppStore: () => AppStore = useStore;       