import axios from 'axios';
import Head from 'next/head';
import { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../firebaseConfig';
import { useRouter } from 'next/router';
import CouponItem from '../components/CouponItem';

const Coupons = () => {
  const [coupons, setCoupons] = useState(null);
  const [user, loading, error] = useAuthState(auth);
  const router = useRouter();

  useEffect(() => {
    if (!user && !loading) {
      router.push('/login');
    } else if (user) {
      fetchCoupons();
    }
  }, [user, loading]); //eslint-disable-line

  const fetchCoupons = async () => {
    try {
      const { data: online } = await axios.get('https://api.discountapi.com/v2/deals', {
        params: {
          api_key: process.env.NEXT_PUBLIC_DISCOUNTS_API,
          category_slugs: 'baby',
          online: true,
        },
      });
      setCoupons(online.deals);
    } catch (err) {
      console.log(err);
    }
  };

  const renderCoupons = () =>
    coupons?.map(coupon => <CouponItem key={coupon.deal.id} coupon={coupon} />);

  return (
    <div className='h-screen'>
      <Head>
        <title>Baby Manager | Coupons</title>
      </Head>
      <div className='mx-[5%] sm:mx-[15%] my-[10%] sm:my-[20%] md:my-[10%] flex flex-col justify-center'>
        <h1 className='lg:text-[58px] md:text-[38px] text-center'>Coupons</h1>
        <section>{renderCoupons()}</section>
      </div>
    </div>
  );
};

export default Coupons;
