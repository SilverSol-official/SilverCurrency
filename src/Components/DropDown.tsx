import * as React from 'react';
import { FC } from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

const DropDownMenu:FC = () => {
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
          <MenuItem value={10}><img
            src="https://flagcdn.com/w20/al.png"
            width="20"
            alt="South Africa"
            />USD</MenuItem>
          <MenuItem value={20}>EU</MenuItem>
          <MenuItem value={30}>UAH</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}

export default DropDownMenu;