/* eslint-disable @typescript-eslint/no-unused-expressions */
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { CurrencyData, initialStateType } from "../../types";

export const fetchCurrencyList = createAsyncThunk(
  "currency/fetchCurrencyList",
  async (searchField: Array<string> = ["", ""], { rejectWithValue }) => {
    const base: string = searchField[0];
    const currency: string = searchField[1];
    const apiKey: string = "DXUG0gLBMmNojToLZFtxv4AZsHecl0A7nwJORudX";
    const url: string = `https://api.currencyapi.com/v3/latest?apikey=${apiKey}&currencies=${currency}&base_currency=${base}`;
    const responce = await fetch(url);
    if (!responce.ok) {
      throw new Error("error");
    }
    const data = await responce.json();
    if (responce.status < 200 || responce.status >= 300) {
      return rejectWithValue(data);
    }
    return data;
  }
);

const initialState: initialStateType = {
  status: "loading",
  error: null,
  currencies: ["UAH", "UAH"],
  currChar: ["₴", "₴"],
  cours: "",
  values: [0, 0],
  dir: "l",
};

export const currencySlice = createSlice({
  name: "currency",
  initialState,
  reducers: {
    enterAndCalc: (state, action) => {
      switch (action.payload.pos) {
        case 0:
          state.values[0] = action.payload.val;
          if (typeof state.cours === "number")
            state.values[1] = +(action.payload.val * state.cours).toFixed(2);
          //l
          break;
        case 1:
          state.values[1] = action.payload.val;
          if (typeof state.cours === "number")
            state.values[0] = +(action.payload.val / state.cours).toFixed(2);
          //r
          break;
      }
    },
    setCurrencies: (state, action) => {
      switch (action.payload.pos) {
        case 0:
          state.currencies[0] = action.payload.val;
          state.currChar[0] = action.payload.char;
          state.dir = "l";
          //l
          break;
        case 1:
          state.currencies[1] = action.payload.val;
          state.currChar[1] = action.payload.char;
          state.dir = "r";
          //r
          break;
      }
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
      const resData: CurrencyData = action.payload;
      state.cours =
        resData.data.EUR?.value ||
        resData.data.UAH?.value ||
        resData.data.USD?.value;
      switch (state.dir) {
        case "l":
          state.values[1] = +(state.values[0] * state.cours).toFixed(2);
          break;
        case "r":
          state.values[0] = +(state.values[1] / state.cours).toFixed(2);
          break;
      }
      //state.values = [0, 0];
    });
    builder.addCase(fetchCurrencyList.rejected, (state, action) => {
      state.status = "rejected";
      state.error = action.payload;
    });
  },
});

export const { enterAndCalc, setCurrencies } = currencySlice.actions;

export default currencySlice.reducer;
