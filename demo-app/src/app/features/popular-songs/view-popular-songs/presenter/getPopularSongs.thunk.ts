import { createAsyncThunk } from "@reduxjs/toolkit";
import { ViewPopularSongsInteractor } from "../interactor/view-popular-Songs.interactor";
import { TYPES } from "../interactor/TYPES";

export const GetPopularSongs = createAsyncThunk(
  "view-popular-Songs/getPopularSongs",
  async (arg: { maxNumber: number }, { rejectWithValue }) => {
    try {
      const interactor = container.get<ViewPopularSongsInteractor>(
        TYPES.ViewPopularSongsInteractor,
      );
      return await interactor.getPopularSongs(arg.maxNumber);
    } catch (err) {
      return rejectWithValue("Failed to getPopularSongs");
    }
  },
);
