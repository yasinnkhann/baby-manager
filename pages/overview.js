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
  marginBottom: '90px',
};

export default function Overview() {
  const [view, setView] = useState('module');
  const [isViewChange, setViewChange] = useState(babyCardInModule);

  const handleOrientationChange = (event, nextView) => {
    nextView === 'module' ? setViewChange(babyCardInModule) : setViewChange(babyCardInList);
    setView(nextView);
  };

  return (
    <React.Fragment>
      <div
        className=' mt-[21%]'
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
          onChange={handleOrientationChange}
        >
          <ToggleButton value='module' aria-label='module'>
            <ViewModuleIcon />
          </ToggleButton>
          <ToggleButton value='list' aria-label='list'>
            <ViewListIcon />
          </ToggleButton>
        </ToggleButtonGroup>
      </div>

      <div style={isViewChange}>
        <BabyCard babyName={baby.name[0]} />
        <div>{view === 'list' ? <div>Next Feed Time: 12:00pm</div> : null}</div>
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
