import {createSlice} from '@reduxjs/toolkit'
import {GetPopularSongs} from "./getPopularSongs.thunk.ts";


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
            .addCase(GetPopularSongs.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(GetPopularSongs.fulfilled, (state, action) => {
                state.loading = false
                state.songs = action.payload
            })
            .addCase(GetPopularSongs.rejected, (state, action) => {
                state.loading = false
                state.error = action.error?.message ?? 'Unknown error'
            })
    }
});
