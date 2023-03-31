/* eslint-disable @typescript-eslint/no-unused-expressions */
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { initialStateType } from "../../types";

export const fetchCurrencyList = createAsyncThunk(
  "currency/fetchCurrencyList",
  async (searchField: string = "", { rejectWithValue }) => {
    const url: string =
      "https://api.currencyapi.com/v3/currencies?apikey=mcavHYBcgdc21nIrFLs2aFnCiaeX6sjS5TuvVupO&currencies=";
    console.log("getting currency list");
    const responce = await fetch(url);
    if (!responce.ok) {
      throw new Error("error");
    }
    const data = await responce.json();
    if (responce.status < 200 || responce.status >= 300) {
      return rejectWithValue(data);
    }
    console.log("data:", data);
    return data;
  }
);

const initialState: initialStateType = {
  status: "loading",
  error: null,
  data: {},
  currencies: [],
  courses: 2,
  values: [0, 0],
};

export const currencySlice = createSlice({
  name: "currency",
  initialState,
  reducers: {
    setLeft: (state, action) => {
      state.values[0] = +action.payload.value;
      console.log("value written:", state.values[0]);
      console.log("value converting");
      state.values[1] = +state.values[0] * +state.courses;
      console.log("value written:", state.values[1]);
    },
    setRight: (state, action) => {
      state.values[1] = +action.payload.value;
      console.log("value written:", state.values[1]);
      console.log("value converting");
      state.values[0] = +state.values[1] * +state.courses;
      console.log("value written:", state.values[0]);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchCurrencyList.pending, (state) => {
      state.status = "loading";
      state.error = null;
      console.log("pending");
    });
    builder.addCase(fetchCurrencyList.fulfilled, (state, action) => {
      state.status = "resolved";
      console.log("action", action.payload);
      state.data = action.payload;
      console.log("state w info", state.data);
    });
    builder.addCase(fetchCurrencyList.rejected, (state, action) => {
      state.status = "rejected";
      state.error = action.payload;
    });
  },
});

export const { setLeft, setRight } = currencySlice.actions;

export default currencySlice.reducer;
