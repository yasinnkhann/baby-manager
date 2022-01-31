import React, { useState } from 'react';
import BabyCard from '../components/BabyCard';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import ViewListIcon from '@mui/icons-material/ViewList';
import ViewModuleIcon from '@mui/icons-material/ViewModule';

const baby = {
  name: ['Ryne', 'Alisa', 'Jake', ' Ryan', 'Yasin', 'Edward', 'Hatha', 'Daniel', 'Derek'],
};

const babyCardInModule = {
  display: 'flex',
  flexDirection: 'row',
  flexWrap: 'wrap',
  alignItems: 'center',
  justifyContent: 'center',
  marginTop: '1px',
};

const babyCardInList = {
  display: 'flex',
  flexDirection: 'column',
  flexWrap: 'wrap',
  alignItems: 'center',
  justifyContent: 'center',
  marginTop: '1px',
};

export default function Overview() {
  const [view, setView] = useState('module');

  const handleChange = (event, nextView) => {
    setView(nextView);
  };

  return (
    <React.Fragment>
      <div
        className=' my-[19%]'
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <ToggleButtonGroup
          orientation='horizontal'
          value={view}
          exclusive
          onChange={handleChange}
        >
          <ToggleButton value='module' aria-label='module'>
            <ViewModuleIcon />
          </ToggleButton>
          <ToggleButton value='list' aria-label='list'>
            <ViewListIcon />
          </ToggleButton>
        </ToggleButtonGroup>
      </div>

      <div
        style={babyCardInModule}
        // style={babyCardInList}
      >
        <BabyCard babyName={baby.name[0]} />
        <BabyCard babyName={baby.name[1]} />
        <BabyCard babyName={baby.name[2]} />
        <BabyCard babyName={baby.name[3]} />
        <BabyCard babyName={baby.name[4]} />
        <BabyCard babyName={baby.name[5]} />
        <BabyCard babyName={baby.name[6]} />
        <BabyCard babyName={baby.name[7]} />
        <BabyCard babyName={baby.name[8]} />
      </div>
    </React.Fragment>
  );
}
