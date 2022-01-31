import React, { useState } from 'react';
import BabyCard from '../components/BabyCard';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import ViewListIcon from '@mui/icons-material/ViewList';
import ViewModuleIcon from '@mui/icons-material/ViewModule';

const babyAsleepImage =
  'https://cdn0.iconfinder.com/data/icons/family-babies-kids/24/kid-infant-baby-child-children-family-512.png';
const babyAwakeImage =
  'https://toppng.com/uploads/preview/babys-room-icon-baby-icon-11553449311dwd4ky7lpi.png';

export default function Overview() {
  const [view, setView] = useState('module');

  const [isAsleepToggled, setIsAsleepToggled] = useState('asleep');
  const [isBabyImageAsleep, setIsBabyImageAsleep] = useState(babyAsleepImage);

  const handleChange = (event, nextView) => {
    setView(nextView);
  };

  const babyStatusToggler = () => {
    isAsleepToggled = 'asleep' ? setIsAsleepToggled('awake') : setIsAsleepToggled('asleep');
  };

  const babyImageStatusChange = () => {};

  return (
    <React.Fragment>
      <div
        className=' my-[10%]'
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
        style={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          marginTop: '20px',
        }}
      >
        <BabyCard
          isAsleepToggled={isAsleepToggled}
          onToggle={() => {
            babyStatusToggler(!isAsleepToggled);
          }}
        />
        <BabyCard />
        <BabyCard />
        {/* <BabyCard/> */}
      </div>
    </React.Fragment>
  );
}
