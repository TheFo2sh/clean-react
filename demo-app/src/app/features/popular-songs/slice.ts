import {createSlice} from '@reduxjs/toolkit'
import {ViewPopularSongsThunk} from "./view-popular-songs/ViewPopularSongs.thunk.ts";


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
            .addCase(ViewPopularSongsThunk.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(ViewPopularSongsThunk.fulfilled, (state, action) => {
                state.loading = false
                state.songs = action.payload
            })
            .addCase(ViewPopularSongsThunk.rejected, (state, action) => {
                state.loading = false
                state.error = action.error?.message ?? 'Unknown error'
            })
    }
});
