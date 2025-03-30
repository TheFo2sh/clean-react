import { createAsyncThunk } from "@reduxjs/toolkit";
import { ViewPopularSongsUseCase } from "../use-case/view-popular-Songs.usecase";
import { TYPES } from "../use-case/TYPES";

export const GetPopularSongs = createAsyncThunk(
  "view-popular-Songs/getPopularSongs",
  async (arg: { maxNumber: number }, { rejectWithValue }) => {
    try {
      const usecase = container.get<ViewPopularSongsUseCase>(
        TYPES.ViewPopularSongsUseCase,
      );
      return await usecase.getPopularSongs(arg.maxNumber);
    } catch (err) {
      return rejectWithValue("Failed to getPopularSongs");
    }
  },
);
