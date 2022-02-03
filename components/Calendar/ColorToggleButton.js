import * as React from 'react';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';

export default function ColorToggleButton(props) {
  const [alignment, setAlignment] = React.useState('upcoming');

  const handleChange = (event, newAlignment) => {
    // console.log(event)
    // console.log(newAlignment)
    if (alignment === event.target.value) {
      return;
    }
    setAlignment(newAlignment);
    props.handleToggleChange(newAlignment);
  };

  return (
    <ToggleButtonGroup
      size='small'
      color='primary'
      value={alignment}
      exclusive
      onChange={handleChange}
    >
      <ToggleButton value='upcoming'>Upcoming</ToggleButton>
      <ToggleButton value='completed'>Past</ToggleButton>
    </ToggleButtonGroup>
  );
}
