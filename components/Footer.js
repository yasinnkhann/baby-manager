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
import { useRouter } from 'next/router';
import { signOut } from 'firebase/auth';
import { auth } from '../firebaseConfig.js';

export default function Footer() {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const [anchorElPer, setAnchorElPer] = useState(null);
  const openPer = Boolean(anchorElPer);
  const router = useRouter();

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      console.log('signed out!');
      router.push('/login');
    } catch (err) {
      console.error(err);
    }
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
              id='fade-button-person'
              aria-controls={openPer ? 'fade-menu-person' : undefined}
              aria-haspopup='true'
              aria-expanded={openPer ? 'true' : undefined}
              onClick={e => setAnchorElPer(e.currentTarget)}
            >
              <PersonIcon className='text-[28px]' />
            </IconButton>
            <Menu
              id='fade-menu-person'
              MenuListProps={{
                'aria-labelledby': 'fade-button-person',
              }}
              anchorEl={anchorElPer}
              open={openPer}
              onClose={() => setAnchorElPer(null)}
              TransitionComponent={Fade}
            >
              <MenuItem onClick={() => setAnchorElPer(null)}>Profile</MenuItem>
              <MenuItem
                onClick={() => {
                  setAnchorElPer(null);
                  handleSignOut();
                }}
              >
                Logout
              </MenuItem>
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
              onClick={e => setAnchorEl(e.currentTarget)}
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
              onClose={() => setAnchorEl(null)}
              TransitionComponent={Fade}
            >
              <MenuItem onClick={() => setAnchorEl(null)}>Baby Coupons</MenuItem>
              <MenuItem onClick={() => setAnchorEl(null)}>Notes</MenuItem>
            </Menu>
          </div>
        </div>
      </div>
    </footer>
  );
}
