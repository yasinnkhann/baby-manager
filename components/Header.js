import React, { useState } from 'react';
import Link from 'next/link';
import { Menu, MenuItem, Fade, IconButton } from '@mui/material';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import PersonIcon from '@mui/icons-material/Person';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import { faBaby } from '@fortawesome/free-solid-svg-icons';
import { useRouter } from 'next/router';
import { signOut } from 'firebase/auth';
import { auth } from '../firebaseConfig.js';

export default function Header() {
  const [anchorElPer, setAnchorElPer] = useState(null);
  const openPer = Boolean(anchorElPer);
  const router = useRouter();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

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
    <header className='fixed bg-blue-100 font-["Rubik"] top-0 w-full h-[var(--header-height)] z-[300]'>
      <nav className='flex justify-between items-center'>
        <Link href='/overview' passHref>
          <section className='ml-4 sm:ml-12 flex flex-row content-center hover:text-pink-500 hover:cursor-pointer'>
            <div className='bg-[url("/baby3.svg")] w-16 h-[var(--header-height)] bg-center bg-cover bg-no-repeat'></div>
            <div className='font-["Pacifico"] text-xl self-center '>Bambino</div>
          </section>
        </Link>
        <section className='flex flex-row justify-self-end items-center justify-around'>
          <Link href='/otherBabies' passHref>
            <IconButton className='hidden sm:block text-neutral-900 text-2xl'>
              <PeopleAltIcon className='!mx-1 sm:!mx-3 !text-black' />
            </IconButton>
          </Link>
          <Link href='/overview' passHref>
            <IconButton className='hidden sm:block text-neutral-900 text-2xl'>
              <FontAwesomeIcon icon={faBaby} className='!mx-1 sm:!mx-3 !text-black' />
            </IconButton>
          </Link>
          <Link href='/calendar' passHref>
            <IconButton className='text-neutral-900'>
              <CalendarTodayIcon className='!mx-1 sm:!mx-3 !text-black' />
            </IconButton>
          </Link>

          <div className='hidden sm:block'>
            <IconButton
              className='text-neutral-900'
              id='fade-button-person'
              aria-controls={openPer ? 'fade-menu-person' : undefined}
              aria-haspopup='true'
              aria-expanded={openPer ? 'true' : undefined}
              onClick={e => setAnchorElPer(e.currentTarget)}
            >
              <PersonIcon className='text-3xl sm:!mx-3 !text-black' />
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
              <Link href='/user' passHref>
                <MenuItem onClick={() => setAnchorElPer(null)}>Profile</MenuItem>
              </Link>
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
          <div className='hidden sm:block'>
            <IconButton
              className='text-neutral-900'
              id='fade-button'
              aria-controls={open ? 'fade-menu' : undefined}
              aria-haspopup='true'
              aria-expanded={open ? 'true' : undefined}
              onClick={e => setAnchorEl(e.currentTarget)}
            >
              <MoreHorizIcon className='sm:!mx-3 !text-black' />
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
              <Link href='/notes' passHref>
                <MenuItem onClick={() => setAnchorEl(null)}>Notes</MenuItem>
              </Link>
              <Link href='/changingRooms' passHref>
                <MenuItem onClick={() => setAnchorEl(null)}>Changing Stations</MenuItem>
              </Link>
              <Link href='/coupons' passHref>
                <MenuItem onClick={() => setAnchorEl(null)}>Coupons</MenuItem>
              </Link>
            </Menu>
          </div>
        </section>
      </nav>
    </header>
  );
}
