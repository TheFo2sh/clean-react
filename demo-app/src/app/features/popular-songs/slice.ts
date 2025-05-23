import {createSlice} from '@reduxjs/toolkit'
import {createViewPopularSongsThunkReducer} from "./view-popular-songs/ViewPopularSongs.thunk.ts";
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
        createViewPopularSongsThunkReducer()(builder);
    }
});
