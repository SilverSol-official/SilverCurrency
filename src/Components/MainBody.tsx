import { FormControl, InputAdornment, InputLabel, OutlinedInput } from '@mui/material';
import * as react from 'react';
import {FC, useState, ChangeEvent} from 'react';
import {  useSelector } from 'react-redux';

import {  RootState } from '../rdx/Store';
import DropDownMenu from './DropDown';



const MainBody:FC = () => {


  const stateCource:number = useSelector((state:RootState)=>state.currency.courses);
  const [amountl,setAmountl] = useState<number>();
  const [amountr,setAmountr] = useState<number>();

  const RightChangeHandle = (event:ChangeEvent<HTMLInputElement>): void=>{
        const leftIn:number = +event.target.value;
        setAmountr( leftIn );
        setAmountl( leftIn/stateCource);
        console.log('amountl',amountl);
        console.log('amountr',amountr);
  }

  const leftChangeHandle = (event:ChangeEvent<HTMLInputElement>): void=>{
        const rightIn:number = +event.target.value
        setAmountl(rightIn);
        setAmountr(rightIn*stateCource);
        console.log('amountl',amountl);
        console.log('amountr',amountr);
  }

    return(
        <div className="mainBody">
            <div className="bodyWrapper">
                <DropDownMenu position='left'/> 
                <FormControl fullWidth sx={{ mt: 1 }}>
          <InputLabel htmlFor="outlined-adornment-amount" >Amount</InputLabel>
          <OutlinedInput
            id="outlined-adornment-amount"
            startAdornment={<InputAdornment position="start">$</InputAdornment>}
            label="Amount"
            onChange={leftChangeHandle} 
            value={amountl}
            type='number'
            placeholder='Enter amount'
          />          
        </FormControl>
            </div>
            <div className="bodyWrapper">
                <DropDownMenu position='right'/>
                <FormControl fullWidth sx={{ mt: 1 }}>
          <InputLabel htmlFor="outlined-adornment-amount" >Amount</InputLabel>
          <OutlinedInput
            id="outlined-adornment-amount"
            startAdornment={<InputAdornment position="start">$</InputAdornment>}
            label="Amount"
            onChange={RightChangeHandle} 
            value={amountr}
            type='number'
            placeholder='Enter amount'
          />
        </FormControl>
            </div>    
        </div>
    )
}

export default MainBody;