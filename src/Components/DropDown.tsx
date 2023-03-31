import * as React from 'react';
import { FC } from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

interface DropPosition {position:'left' | 'right'}; 

const DropDownMenu:FC<DropPosition> = ({position}) => {

    console.log(position);
  const [currency, setCurrency] = React.useState('');

  const handleChange = (event: SelectChangeEvent) => {
    setCurrency(event.target.value as string);
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
          <MenuItem value={10}>
            <img
            src="https://flagcdn.com/w20/us.png"
            width="20"
            alt="South Africa"
            /> USD</MenuItem>
          <MenuItem value={20}>
          <img
            src="https://flagcdn.com/w20/eu.png"
            width="20"
            alt="South Africa"
            /> EU</MenuItem>
          <MenuItem value={30}>
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