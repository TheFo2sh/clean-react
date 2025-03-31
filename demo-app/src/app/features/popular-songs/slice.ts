import {createSlice} from '@reduxjs/toolkit'
import {ViewPopularSongsThunk} from "./view-popular-songs/ViewPopularSongs.thunk.ts";
import {Future} from "../../base/Future.ts";


const initialState :Future<Song[]>= {
    Value: [] as Song[],
    IsPending: false,
    Error: null,
}

export const songsSlice = createSlice({
    name: 'popularSongs',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(ViewPopularSongsThunk.pending, (state) => {
                state.IsPending = true
                state.Error = null
            })
            .addCase(ViewPopularSongsThunk.fulfilled, (state, action) => {
                state.IsPending = false
                state.Value = action.payload
            })
            .addCase(ViewPopularSongsThunk.rejected, (state, action) => {
                state.IsPending = false
                state.Error = new Error( action.error?.message ?? 'Unknown error');
            })
    }
});
