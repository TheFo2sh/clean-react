import {createSlice} from '@reduxjs/toolkit'
import {ViewPopularSongsThunk} from "./view-popular-songs/ViewPopularSongs.thunk.ts";
import {Future, Operational} from "../../base/Future.ts";


const initialState :Future<Operational<Song>[]>= {
    Value: [] ,
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
                state.Value = action.payload.map((item) => ({id: item.id, object: item, status: 'Idle'}))
            })
            .addCase(ViewPopularSongsThunk.rejected, (state, action) => {
                state.IsPending = false
                state.Error = new Error( action.error?.message ?? 'Unknown error');
            })
    }
});
