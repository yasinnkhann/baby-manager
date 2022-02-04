import { Paper } from '@mui/material';

const CouponItem = ({ coupon }) => {
  console.log(coupon);
  return (
    <Paper
      className='m-5 flex flex-col justify-center hover:cursor-pointer'
      elevation={6}
      onClick={() => window.open(coupon.deal.url)}
    >
      <img className='p-1' src={coupon.deal.image_url} />
      <p className='self-center'>
        {coupon.deal.price} - {parseFloat(Math.floor(coupon.deal.discount_percentage * 100))}%
        off
      </p>
      <p className='self-center'>{coupon.deal.title}</p>
      <p className='pl-2 mt-3'>Description:</p>
      <p className='text-justify pl-2 pr-2'>
        {coupon.deal.description.slice(0, 200)} . . . [Click for more info]
      </p>
    </Paper>
  );
};

export default CouponItem;
