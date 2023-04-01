import * as react from 'react';
import { FormControl, InputAdornment, InputLabel, OutlinedInput } from '@mui/material';
import {FC, useState, ChangeEvent, useEffect} from 'react';
import {  useDispatch, useSelector } from 'react-redux';
import { enterAndCalc } from '../rdx/Features/currency';

import {  AppDispatch, RootState } from '../rdx/Store';


interface InputPosition {position:'left' | 'right'}; 
type status = "loading" | "resolved" | "rejected";
type error = object | null | unknown;


const InputForm:FC<InputPosition> = ({position}) => {
    const pos:number = position==='left'?0:1; 

    const stateValues:number = useSelector((state:RootState)=>state.currency.values[pos]);

    const currChar:string = useSelector((state:RootState)=>state.currency.currChar[pos]);
  
    const dispatch:AppDispatch = useDispatch();

    const { status:status, error:error } = useSelector((state:RootState) => state.currency);

    const [amount,setAmount] = useState<number | undefined>(stateValues);
 

  useEffect(()=>{
    setAmount(stateValues);

  },[stateValues])

  const ChangeHandle = (event:ChangeEvent<HTMLInputElement>): void=>{
    const In:number = +event.target.value;
    switch(pos){
        case 1:
        dispatch(enterAndCalc({pos:1,val:In}));
        break;
        case 0:
        dispatch(enterAndCalc({pos:0,val:In})); 
        break;
    }
  }

  const checkoutConnection:Function = () => {
    if (status === "loading" && error === null) {
      return ('Loading...');
    } else if (error != null) {
      return ('An error occured');
    } else {
      return(amount);
    };
  }

  const checkoutError:Function = () => {
    if (status === "loading" && error === null) {
      return ('text');
    } else if (error != null) {
      return ('text');
    } else {
      return('number');
    };
  }

    return(
        <FormControl fullWidth sx={{ mt: 1 }}>
          <InputLabel htmlFor="outlined-adornment-amount" >Amount</InputLabel>
          <OutlinedInput
            id="outlined-adornment-amount"
            startAdornment={<InputAdornment position="start">{currChar[0]}</InputAdornment>}
            label="Amount"
            onChange={ChangeHandle} 
            value={checkoutConnection()}
            type={checkoutError()}
            placeholder='Enter amount'
          />          
        </FormControl>
    )
}

export default InputForm;