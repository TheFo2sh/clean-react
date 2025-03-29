// src/store/songs/thunks.ts
import { createAsyncThunk } from '@reduxjs/toolkit'
import container from "../../../../core/di/container.ts";
import {ViewPopularSongsInteractor} from "../interactor/view-popular-Songs-interactor.ts";
import {Song} from "../../../../../ports/contoso/models/song.ts";
import {TYPES} from "../interactor/TYPES.ts";


export const fetchPopularSongs = createAsyncThunk<Song[], void, { rejectValue: string }>(
    'popularSongs',
    async (_, { rejectWithValue }) => {
        try {
            const interactor = container.get<ViewPopularSongsInteractor>(TYPES.ViewPopularSongsInteractor)
            return await interactor.getPopularSongs()
        } catch (err) {
            return rejectWithValue('Failed to fetch songs')
        }
    }
)