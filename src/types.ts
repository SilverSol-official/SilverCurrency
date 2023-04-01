export interface initialStateType {
  status: "loading" | "resolved" | "rejected";
  error: object | null | unknown;
  currencies: Array<string>;
  cours: number | "";
  values: Array<number>;
  currChar: string[];
  dir: "l" | "r";
}

export interface metaType {
  last_updated_at: string;
}
export interface dataType {
  [key: string]: {
    code: string;
    value: number;
  };
}
export interface CurrencyData {
  meta: metaType;
  data: dataType;
}

export type Header = number[];
