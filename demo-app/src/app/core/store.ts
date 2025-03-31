import {configureStore} from '@reduxjs/toolkit'
import { songsSlice } from '../features/popular-songs/slice.ts'


export const store = configureStore({
    reducer: {
        popularSongs: songsSlice.reducer
    },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
