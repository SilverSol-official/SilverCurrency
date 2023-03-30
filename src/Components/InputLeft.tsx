import * as React from 'react';
import { FC } from 'react';
import { OutlinedInput,InputLabel,InputAdornment } from '@mui/material';
import FormControl from '@mui/material/FormControl';


const LeftInput:FC = () => {

  return (
    <FormControl fullWidth sx={{ mt: 1 }}>
          <InputLabel htmlFor="outlined-adornment-amount">Amount</InputLabel>
          <OutlinedInput
            id="outlined-adornment-amount"
            startAdornment={<InputAdornment position="start">$</InputAdornment>}
            label="Amount"
          />
        </FormControl>
  );
}

export default LeftInput;