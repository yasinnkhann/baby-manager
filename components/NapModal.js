import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import React, { useEffect } from 'react';
import TextField from '@mui/material/TextField';
import Slider from '@mui/material/Slider';
import Select from '@mui/material/Select';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import StaticTimePicker from '@mui/lab/StaticTimePicker';
import MobileTimePicker from '@mui/lab/MobileTimePicker';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import TimePicker from '@mui/lab/TimePicker';
import DatePicker from '@mui/lab/DatePicker';
import DateTimePicker from '@mui/lab/DateTimePicker';
import Button from '@mui/material/Button';
import Icon from '@mui/material/Icon';
import NotificationsOffIcon from '@mui/icons-material/NotificationsOff';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';

const popupStyle = {
  position: 'absolute',
  borderRadius: '15px',
  top: '50%',
  left: '50%',
  maxHeight: '100%',
  overflow: 'auto',
  transform: 'translate(-50%, -50%)',
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

//--------------------------------------------------------//
//------------------Modal Window Section------------------//
//--------------------------------------------------------//

const NapModal = () => {
  const [open, setOpen] = React.useState(false);
  const [food, setFood] = React.useState(['Formula', 'Milk', 'Mushy Peas']);
  const [foodValue, setFoodValue] = React.useState('');
  const [foodAmount, setFoodAmount] = React.useState(0);
  const [date, setDate] = React.useState(null);
  const [napTime, setNapTime] = React.useState(new Date());
  const [napDate, setNapDate] = React.useState(new Date().toString());
  const [reminderIcon, setReminderIcon] = React.useState(
    <NotificationsOffIcon color='disabled' />
  );
  const [reminderState, setReminderState] = React.useState(false);
  const [displayReminderTime, setDisplayReminderTime] = React.useState(true);
  const [reminderTime, setReminderTime] = React.useState(new Date());

  //------------------------------------------//
  //----To handle open and close Modal--------//
  //------------------------------------------//
  const toOpen = () => {
    setOpen(true);
  };
  const toClose = () => {
    setOpen(false);
  };
  //------------------------------------------//
  //------------------------------------------//
  //------------------------------------------//

  //------------------------------------------//
  //----To Get Pretty Date--------------------//
  //------------------------------------------//
  const getPrettyDate = () => {
    const uglyDate = new Date().toString();
    const splitDate = uglyDate.split(' ');
    const prettyDate = `${splitDate[0]} ${splitDate[1]} ${splitDate[2]}, ${splitDate[3]}`;
    setDate(prettyDate);
  };
  //------------------------------------------//
  //------------------------------------------//
  //------------------------------------------//

  //------------------------------------------//
  //----Use Effect to Render/Log--------------//
  //------------------------------------------//
  // useEffect(() => {
  //   console.log('Type of Food', foodValue);
  //   console.log('How much Food', foodAmount);
  // console.log('Time', napTime);
  // console.log('Date', napDate);
  // console.log('ReminderTime', reminderTime);
  // }, [foodValue, foodAmount, feedTime, feedDate]);

  useEffect(() => {
    getPrettyDate();
  }, []);
  //------------------------------------------//
  //------------------------------------------//
  //------------------------------------------//

  //------------------------------------------//
  //----Render Component----------------------//
  //------------------------------------------//
  return (
    <div>
      <Button
        onClick={toOpen}
        style={{ width: '300px', backgroundColor: 'lightgreen' }}
        className='rounded-md border-2 border-emerald-400'
        variant='contained'
        color='success'
      >
        Add New Nap
      </Button>
      <Modal open={open} onClose={toClose}>
        <Box sx={popupStyle} className='sm:w-5/5 md:w-3/5'>
          <div style={{ width: '300px' }}></div>
          <b>{date}</b>
          <hr />
          <div className='sb-buffer'></div>
          <FormControl fullWidth noValidate>
            <div style={{ display: 'flex' }} className='flex-col'>
              <div className='place-self-center'>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <DateTimePicker
                    label='Date of Nap'
                    value={napDate}
                    onChange={newValue => {
                      setNapDate(newValue);
                    }}
                    renderInput={params => <TextField {...params} />}
                  />
                </LocalizationProvider>
                <div className='sb-buffer'></div>
              </div>
            </div>
            <div style={{ display: 'flex' }} className='flex-col'>
              <p className='text-center'>Send a Text Reminder?</p>
              <Button
                style={{ backgroundColor: 'lightgreen' }}
                className='w-[25px] place-self-center'
                onClick={() => {
                  if (reminderState) {
                    setReminderIcon(<NotificationsOffIcon color='disabled' />);
                    setReminderState(false);
                    setDisplayReminderTime(true);
                  }
                  if (!reminderState) {
                    setReminderIcon(<NotificationsActiveIcon sx={{ color: 'green' }} />);
                    setReminderState(true);
                    setDisplayReminderTime(false);
                  }
                }}
                variant='contained'
              >
                {reminderIcon}
              </Button>
              <div className='sb-buffer'></div>
              <div className='place-self-center' hidden={displayReminderTime}>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <MobileTimePicker
                    label='Reminder Time'
                    value={reminderTime}
                    onChange={time => setReminderTime(time)}
                    renderInput={params => <TextField {...params} />}
                  />
                </LocalizationProvider>
                <div className='sb-buffer'></div>
                <sub>Please Input Phone Number</sub>
                <br />
                <br />
                <TextField id='telNumber' label='Mobile Number' variant='outlined' />
              </div>
            </div>
          </FormControl>
          <div className='sb-buffer'></div>
          <div style={{ display: 'flex' }} className='flex-col'>
            <Button
              style={{ backgroundColor: 'lightgreen', width: '50%' }}
              className='rounded-md border-2 border-emerald-400 place-self-center'
              variant='contained'
            >
              Save
            </Button>
            <div className='sb-buffer'></div>
            <Button
              style={{ backgroundColor: 'lightgreen', width: '50%' }}
              className='rounded-md border-2 border-emerald-400 place-self-center'
              variant='contained'
              onClick={toClose}
            >
              Cancel
            </Button>
          </div>
        </Box>
      </Modal>
    </div>
  );
};
//--------------------------------------------------------//
//--------------------------------------------------------//
//--------------------------------------------------------//

export default NapModal;
