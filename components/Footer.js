import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import PersonIcon from '@mui/icons-material/Person';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBaby } from '@fortawesome/free-solid-svg-icons';

import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Fade from '@mui/material/Fade';
import IconButton from '@mui/material/IconButton';
import { useState } from 'react';

export default function Footer() {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <footer className='fixed inset-x-0 bottom-0  bg-blue-100 pb:16 bottom sm:hidden md:hidden lg:hidden xl:hidden '>
      <div className='px-8 py-4 mx-auto'>
        <div className='flex justify-between items-center'>
          <IconButton className='text-neutral-900'>
            <CalendarTodayIcon />
          </IconButton>

          <div>
            <IconButton
              className='text-neutral-900'
              id='fade-button'
              aria-controls={open ? 'fade-menu' : undefined}
              aria-haspopup='true'
              aria-expanded={open ? 'true' : undefined}
              onClick={handleClick}
            >
              <PersonIcon className='text-[28px]' />
            </IconButton>
            <Menu
              id='fade-menu'
              MenuListProps={{
                'aria-labelledby': 'fade-button',
              }}
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              TransitionComponent={Fade}
            >
              <MenuItem onClick={handleClose}>Profile</MenuItem>
              <MenuItem onClick={handleClose}>Logout</MenuItem>
            </Menu>
          </div>

          <IconButton>
            <FontAwesomeIcon className='text-[24px] text-neutral-900' icon={faBaby} />
          </IconButton>

          <div>
            <IconButton
              className='text-neutral-900'
              id='fade-button'
              aria-controls={open ? 'fade-menu' : undefined}
              aria-haspopup='true'
              aria-expanded={open ? 'true' : undefined}
              onClick={handleClick}
            >
              <MoreHorizIcon />
            </IconButton>
            <Menu
              id='fade-menu'
              MenuListProps={{
                'aria-labelledby': 'fade-button',
              }}
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              TransitionComponent={Fade}
            >
              <MenuItem onClick={handleClose}>Baby Coupons</MenuItem>
              <MenuItem onClick={handleClose}>Notes</MenuItem>
            </Menu>
          </div>
        </div>
      </div>
    </footer>
  );
}
