interface Currency {
  symbol: string;
  name: string;
  symbol_native: string;
  decimal_digits: number;
  rounding: number;
  code: string;
  name_plural: string;
}

interface CurrencyData {
  [key: string]: Currency;
}

export interface initialStateType {
  data: CurrencyData;
  status: "loading" | "resolved" | "rejected";
  error: object | null | unknown;
  currencies: Array<string>;
  courses: number;
  values: Array<number>;
}
