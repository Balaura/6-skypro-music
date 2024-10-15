// src/store/features/authSlice.ts

import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit'
import { TokenResponse, loginUser, refreshToken, registerUser } from '../../api/api'
import { clearFavoriteTracks } from './audioPlayerSlice'

interface AuthState {
  accessToken: string | null
  refreshToken: string | null
  username: string | null
  status: 'idle' | 'loading' | 'failed'
  error: string | null
}

const loadState = (): AuthState => {
  if (typeof window !== 'undefined') {
    return {
      accessToken: localStorage.getItem('accessToken'),
      refreshToken: localStorage.getItem('refreshToken'),
      username: localStorage.getItem('username'),
      status: 'idle',
      error: null,
    }
  }
  return {
    accessToken: null,
    refreshToken: null,
    username: null,
    status: 'idle',
    error: null,
  }
}

const initialState: AuthState = loadState()

export const login = createAsyncThunk(
  'auth/signin',
  async ({ email, password }: { email: string; password: string }) => {
    const response = await loginUser(email, password)
    return response
  }
)

export const register = createAsyncThunk(
  'auth/signup',
  async ({
    email,
    password,
    username,
  }: {
    email: string
    password: string
    username: string
  }) => {
    const response = await registerUser(email, password, username)
    return { ...response, username }
  }
)

export const refreshAuthToken = createAsyncThunk(
  'auth/refreshToken',
  async () => {
    const response = await refreshToken()
    return response
  }
)

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<string>) {
      state.username = action.payload
      if (typeof window !== 'undefined') {
        localStorage.setItem('username', action.payload)
      }
    },
    logout(state) {
      state.accessToken = null
      state.refreshToken = null
      state.username = null
      state.status = 'idle'
      state.error = null
      if (typeof window !== 'undefined') {
        localStorage.removeItem('accessToken')
        localStorage.removeItem('refreshToken')
        localStorage.removeItem('username')
      }
      clearFavoriteTracks()
    },
    initializeAuth(state) {
      if (typeof window !== 'undefined') {
        state.accessToken = localStorage.getItem('accessToken')
        state.refreshToken = localStorage.getItem('refreshToken')
        state.username = localStorage.getItem('username')
      }
    },
  },
  extraReducers: builder => {
    builder
      .addCase(login.pending, state => {
        state.status = 'loading'
      })
      .addCase(
        login.fulfilled,
        (
          state,
          action: PayloadAction<TokenResponse & { username: string }>
        ) => {
          state.status = 'idle'
          state.accessToken = action.payload.access
          state.refreshToken = action.payload.refresh
          state.username = action.payload.username
          if (typeof window !== 'undefined') {
            localStorage.setItem('accessToken', action.payload.access)
            localStorage.setItem('refreshToken', action.payload.refresh)
            localStorage.setItem('username', action.payload.username)
          }
        }
      )
      .addCase(login.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message || 'Failed to login'
      })
      .addCase(register.pending, state => {
        state.status = 'loading'
      })
      .addCase(
        register.fulfilled,
        (state, action: PayloadAction<{ username: string }>) => {
          state.status = 'idle'
          state.username = action.payload.username
          if (typeof window !== 'undefined') {
            localStorage.setItem('username', action.payload.username)
          }
        }
      )
      .addCase(register.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message || 'Failed to register'
      })
      .addCase(
        refreshAuthToken.fulfilled,
        (state, action: PayloadAction<TokenResponse>) => {
          state.accessToken = action.payload.access
          if (typeof window !== 'undefined') {
            localStorage.setItem('accessToken', action.payload.access)
          }
        }
      )
      .addCase(refreshAuthToken.rejected, (state, action) => {
        state.error = action.error.message || 'Failed to refresh token'
      })
  },
})

export const { logout, setUser, initializeAuth } = authSlice.actions

export default authSlice.reducer