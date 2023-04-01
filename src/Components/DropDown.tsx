import * as React from 'react';
import { FC,useState,useEffect } from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { AppDispatch, RootState } from '../rdx/Store';
import { useDispatch, useSelector } from 'react-redux';
import { enterAndCalc, fetchCurrencyList, setCurrencies } from '../rdx/Features/currency';
// import { setLeft, setRight } from '../rdx/Features/currency';

interface DropPosition {position:'left' | 'right'}; 


const DropDownMenu:FC<DropPosition> = ({position}) => {

  const stateCurrencies:string[]|undefined[] = useSelector((state:RootState)=>state.currency.currencies);
  const values:number[] = useSelector((state:RootState)=>state.currency.values);
  const dispatch:AppDispatch =useDispatch();
  const [currency, setCurrency] = useState<string>('UAH');

  useEffect(()=>{
    if ((stateCurrencies[0]!=='')&&(stateCurrencies[1]!=='')){
      dispatch(fetchCurrencyList([...stateCurrencies]));
    }
  },[stateCurrencies,dispatch])

  const charGen = (name:string):string => {
    switch(name){
      case 'UAH':
        return '₴';
      case 'USD':
        return '$';
      case 'EUR':
        return '€';
      default:
        return'';
    }
    
  }

  const handleChange = (event: SelectChangeEvent) => {
    const cur:string = event.target.value;
    switch (position){
      case 'left':
          dispatch(setCurrencies({pos:0,val:cur,char:charGen(cur)}));
          dispatch(enterAndCalc({pos:0,val:values[0]}));
        break;
        case 'right':
          dispatch(setCurrencies({pos:1,val:cur,char:charGen(cur)}));
          dispatch(enterAndCalc({pos:1,val:values[1]}));
        break;
    }
    setCurrency(cur);
  };

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Currency</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={currency}
          label="Age"
          onChange={handleChange}
        >
          <MenuItem value={'USD'}>
            <img
            src="https://flagcdn.com/w20/us.png"
            width="20"
            alt="South Africa"
            /> USD</MenuItem>
          <MenuItem value={'EUR'}>
          <img
            src="https://flagcdn.com/w20/eu.png"
            width="20"
            alt="South Africa"
            /> EU</MenuItem>
          <MenuItem value={'UAH'}>
          <img
            src="https://flagcdn.com/w20/ua.png"
            width="20"
            alt="South Africa"
            /> UAH</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}

export default DropDownMenu;