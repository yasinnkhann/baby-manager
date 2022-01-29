import WbSunnyIcon from '@mui/icons-material/WbSunny';

const Baby = () => {
  return (
    <div
      className='container mx-auto md:grid md:place-content-center'
      style={{ padding: '2rem' }}
    >
      <div className='md:sb-container md:grid-cols-1'>
        <div style={{ display: 'grid' }} className='grid-cols-2 text-center'>
          <div className='place-self-center'>
            <div style={{ backgroundColor: 'lightgreen', width: '150px', height: '150px' }}>
              Baby Picture
            </div>
          </div>
          <div>
            <b>Baby Name</b>
            <div className='sb-buffer'></div>
            <b>Baby Asleep</b>
          </div>
        </div>
        <div style={{ display: 'grid' }} className='grid-cols-2 text-center sb-buffer'>
          <div>
            <b>Last Feed</b>
          </div>
          <div>
            <b>12.35 PM</b>
          </div>
        </div>
        <div style={{ display: 'grid' }} className='grid-cols-2 text-center sb-buffer'>
          <div>
            <b>Next Feed</b>
          </div>
          <div>
            <b>2.35 PM</b>
          </div>
        </div>
        <div style={{ display: 'grid' }} className='grid-cols-2 text-center sb-buffer'>
          <div>
            <b>Last Nap</b>
          </div>
          <div>
            <b>11:30 AM</b>
          </div>
        </div>
        <div style={{ display: 'grid' }} className='grid-cols-2 text-center sb-buffer'>
          <div>
            <b>Next Nap</b>
          </div>
          <div>
            <b>4:30 PM</b>
          </div>
        </div>
        <div style={{ display: 'grid' }} className='grid-cols-1 text-center'>
          <div className='sb-buffer'>
            <button
              style={{ width: '300px' }}
              className='rounded-md border-2  border-emerald-400'
            >
              Add New Feed
            </button>
          </div>
        </div>
        <div style={{ display: 'grid' }} className='grid-cols-1 text-center'>
          <div className='sb-buffer'>
            <button
              style={{ width: '300px' }}
              className='rounded-md border-2 border-emerald-400'
            >
              Add New Nap
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Baby;
