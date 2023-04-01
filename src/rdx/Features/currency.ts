/* eslint-disable @typescript-eslint/no-unused-expressions */
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { CurrencyData, initialStateType } from "../../types";

export const fetchCurrencyList = createAsyncThunk(
  "currency/fetchCurrencyList",
  async (searchField: Array<string> = ["", ""], { rejectWithValue }) => {
    const base: string = searchField[0];
    const currency: string = searchField[1];

    const url: string = `https://api.currencyapi.com/v3/latest?apikey=mcavHYBcgdc21nIrFLs2aFnCiaeX6sjS5TuvVupO&currencies=${currency}&base_currency=${base}`;
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
  currencies: ["UAH", "UAH"],
  currChar: ["₴", "₴"],
  cours: "",
  values: [0, 0],
};

export const currencySlice = createSlice({
  name: "currency",
  initialState,
  reducers: {
    // setLeft: (state, action) => {
    //   state.currencies[0] = action.payload.currency;
    //   console.log("value written:", state.currencies[0]);
    //   if (state.currencies[1] !== "") {
    //     fetchCurrencyList(state.currencies);
    //   }
    // },
    // setRight: (state, action) => {
    //   state.currencies[1] = action.payload.currency;
    //   console.log("value written:", state.currencies[1]);
    //   if (state.currencies[0] !== "") {
    //     fetchCurrencyList(state.currencies);
    //   }
    // },
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
          //l
          break;
        case 1:
          state.currencies[1] = action.payload.val;
          state.currChar[1] = action.payload.char;
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
      console.log("action", action.payload);
      const resData: CurrencyData = action.payload;
      state.cours =
        resData.data.EUR?.value ||
        resData.data.UAH?.value ||
        resData.data.USD?.value;
      state.values = [0, 0];
    });
    builder.addCase(fetchCurrencyList.rejected, (state, action) => {
      state.status = "rejected";
      state.error = action.payload;
    });
  },
});

export const { enterAndCalc, setCurrencies } = currencySlice.actions;

export default currencySlice.reducer;
