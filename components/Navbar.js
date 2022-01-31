import { Button } from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import PersonIcon from '@mui/icons-material/Person';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBaby } from '@fortawesome/free-solid-svg-icons';

export default function Navbar() {
  return (
    <nav className='fixed bg-blue-100 font-["Rubik"] top-0 w-full'>
      <div className='flex justify-between items-center pl-[3%] pr-[8%] mr-[20px]'>
        <div className='flex flex-row content-center'>
          <div className='bg-[url("/baby3.svg")] w-[65px] h-[70px] bg-center bg-cover bg-no-repeat'></div>
          <div className='font-["Pacifico"] text-xl self-center'>Baby Manager</div>
        </div>
        <div className='justify-self-end flex flex-row items-center justify-around'>
          <FontAwesomeIcon className='text-[24px] hidden sm:block mx-[15%]' icon={faBaby} />

          <CalendarTodayIcon className='hidden sm:block mr-[10%] ml-[5%]' />

          <PersonIcon className='text-[28px] hidden sm:block ml-[10%] mr-[15%]' />

          <div className='hidden sm:block '>
            <Button
              className=' min-w-[125px] max-w-[20%] text-stone-900 bg-emerald-50  hover:bg-cyan-200  '
              variant='contained'
              startIcon={<LogoutIcon />}
            >
              Log Out
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
}
