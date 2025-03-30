import {createSlice} from '@reduxjs/toolkit'
import { fetchPopularSongs } from './thunk'
import {Song} from "../../../../entities/song.ts";


const initialState = {
    songs: [] as Song[],
    loading: false,
    error: null as string | null,
}

export const songsSlice = createSlice({
    name: 'popularSongs',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchPopularSongs.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(fetchPopularSongs.fulfilled, (state, action) => {
                state.loading = false
                state.songs = action.payload
            })
            .addCase(fetchPopularSongs.rejected, (state, action) => {
                state.loading = false
                state.error = action.error?.message ?? 'Unknown error'
            })
    }
});
