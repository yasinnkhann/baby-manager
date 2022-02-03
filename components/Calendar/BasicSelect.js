import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export default function BasicSelect(props) {
  const [view, setView] = React.useState('');

  const handleChange = event => {
    setView(event.target.value);
  };

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id='demo-simple-select-label'>View</InputLabel>
        <Select
          labelId='demo-simple-select-label'
          id='demo-simple-select'
          value={view}
          label='View'
          onChange={props.handleViewChange}
        >
          <MenuItem value={10}>Upcoming</MenuItem>
          <MenuItem value={20}>Completed</MenuItem>
          <MenuItem value={30}>View All</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}
