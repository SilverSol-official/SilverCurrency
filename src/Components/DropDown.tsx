import * as React from 'react';
import { FC,useState } from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { AppDispatch } from '../rdx/Store';
import { useDispatch } from 'react-redux';
import { setLeft, setRight } from '../rdx/Features/currency';

interface DropPosition {position:'left' | 'right'}; 

const DropDownMenu:FC<DropPosition> = ({position}) => {
  const dispatch:AppDispatch = useDispatch();

  const [currency, setCurrency] = useState<string>();

  const handleChange = (event: SelectChangeEvent) => {
    const cur:string = event.target.value;
    if (position==='left'){
      dispatch(setLeft({currency:cur}));
    } else if (position==='right'){
      dispatch(setRight({currency:cur}));
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
          <MenuItem value={'EU'}>
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