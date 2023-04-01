/* eslint-disable @typescript-eslint/no-unused-expressions */
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { CurrencyData } from "../../types";

export const fetchDollar = createAsyncThunk(
  "header/fetchDollarList",
  async (n: boolean, { rejectWithValue }) => {
    const base: string = "USD";
    const currency: string = "UAH";
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

export const fetchEuro = createAsyncThunk(
  "header/fetchCurrencyList",
  async (n: boolean, { rejectWithValue }) => {
    const base: string = "EUR";
    const currency: string = "UAH";
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

interface initialHeaderStateType {
  values: number[];
  status: "loading" | "resolved" | "rejected";
  error: string | null | unknown;
}

const initialState: initialHeaderStateType = {
  values: [0, 0],
  status: "loading",
  error: null,
};

export const headerSlice = createSlice({
  name: "headerHandl",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchDollar.pending, (state) => {
      state.status = "loading";
      state.error = null;
      console.log("pending");
    });
    builder.addCase(fetchDollar.fulfilled, (state, action) => {
      state.status = "resolved";
      const resData: CurrencyData = action.payload;
      state.values[0] = +(resData.data.UAH?.value).toFixed(2);
    });
    builder.addCase(fetchDollar.rejected, (state, action) => {
      state.status = "rejected";
      state.error = action.payload;
    });
    builder.addCase(fetchEuro.pending, (state) => {
      state.status = "loading";
      state.error = null;
      console.log("pending");
    });
    builder.addCase(fetchEuro.fulfilled, (state, action) => {
      state.status = "resolved";
      const resData: CurrencyData = action.payload;
      state.values[1] = +(resData.data.UAH?.value).toFixed(2);
    });
    builder.addCase(fetchEuro.rejected, (state, action) => {
      state.status = "rejected";
      state.error = action.payload;
    });
  },
});

export default headerSlice.reducer;
