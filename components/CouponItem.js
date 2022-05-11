import Image from 'next/image';
import { Paper } from '@mui/material';

const CouponItem = ({ coupon }) => {
  return (
    <Paper
      className='!m-8 !flex !flex-col !justify-center !items-center !hover:cursor-pointer w-[20rem] sm:w-[28rem] h-[35rem]'
      elevation={6}
      onClick={() => window.open(coupon.deal.url)}
    >
      <Image className='!p-4' src={coupon.deal.image_url} alt='' height={500} width={500} />
      <div className='!p-4'>
        <strong className=''>
          {coupon.deal.price} - {parseFloat(Math.floor(coupon.deal.discount_percentage * 100))}
          % off
        </strong>
        <br />
        <br />
        <strong>Product:</strong>
        <br />
        <p className=''>{coupon.deal.title}</p>
        <br />
        <strong className=''>Description:</strong>
        <p className='hover:cursor-pointer'>
          {coupon.deal.description.slice(0, 200)}. . .
          <p className='text-blue-500'>[Click for more info]</p>
        </p>
      </div>
    </Paper>
  );
};

export default CouponItem;
