import { Button, Menu, MenuItem, Fade, IconButton } from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import PersonIcon from '@mui/icons-material/Person';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import { faBaby } from '@fortawesome/free-solid-svg-icons';
import BabyChangingStationIcon from '@mui/icons-material/BabyChangingStation';
import { useState } from 'react';
import { useRouter } from 'next/router';
import { signOut } from 'firebase/auth';
import { auth } from '../firebaseConfig.js';
import Link from 'next/link';

export default function Navbar() {
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
    <nav className='fixed bg-blue-100 font-["Rubik"] top-0 w-full z-[300]'>
      <div className='flex justify-between items-center pl-[3%] sm:pr-[12%] md:pr-[10%] lg:pr-[7%] '>
        <Link href='/overview' passHref>
          <div className='flex flex-row content-center hover:text-pink-500 hover:cursor-pointer'>
            <div className='bg-[url("/baby3.svg")] w-[65px] h-[70px] bg-center bg-cover bg-no-repeat'></div>
            <div className='font-["Pacifico"] text-xl self-center '>Bambino</div>
          </div>
        </Link>
        <div className='justify-self-end flex flex-row items-center justify-around'>
          <Link href='/otherBabies' passHref>
            <IconButton className='hidden sm:block text-neutral-900 text-[24px]'>
              <PeopleAltIcon className='hidden sm:block' />
            </IconButton>
          </Link>
          <Link href='/overview' passHref>
            <IconButton className='hidden sm:block mx-[25%] text-neutral-900 text-[24px]'>
              <FontAwesomeIcon icon={faBaby} />
            </IconButton>
          </Link>
          <Link href='/calendar' passHref>
            <IconButton className='text-neutral-900'>
              <CalendarTodayIcon className='hidden sm:block mx-[25%]' />
            </IconButton>
          </Link>

          <div className='hidden sm:block mx-[15%]'>
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
        </div>
      </div>
    </nav>
  );
}
