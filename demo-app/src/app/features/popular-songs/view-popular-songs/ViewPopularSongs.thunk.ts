import { createAsyncThunk } from "@reduxjs/toolkit";
import { ViewPopularSongsUseCase } from "./view-popular-Songs.usecase";

export const ViewPopularSongsThunk = createAsyncThunk(
  "view-popular-Songs/ViewPopularSongs",
  async (arg: { maxNumber: number }, { rejectWithValue }) => {
    try {
      const usecase = container.get(ViewPopularSongsUseCase);
      return await usecase.getPopularSongs(arg.maxNumber);
    } catch (err) {
      return rejectWithValue("Failed to ViewPopularSongs");
    }
  },
);
