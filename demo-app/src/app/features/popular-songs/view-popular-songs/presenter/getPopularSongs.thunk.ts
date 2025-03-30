
import { createAsyncThunk } from '@reduxjs/toolkit'
import { ViewPopularSongsInteractor } from '../interactor/view-popular-Songs.interactor'
import { TYPES } from '../interactor/TYPES'


export const fetchGetPopularSongs = createAsyncThunk<Song[], void, { rejectValue: string }>(
  'view-popular-Songs/getPopularSongs',
  async (_, { rejectWithValue }) => {
    try {
      const interactor = container.get<ViewPopularSongsInteractor>(TYPES.ViewPopularSongsInteractor)
      return await interactor.getPopularSongs()
    } catch (err) {
      return rejectWithValue('Failed to getPopularSongs')
    }
  }
)
