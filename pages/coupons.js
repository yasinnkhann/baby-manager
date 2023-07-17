import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import axios from 'axios';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../firebaseConfig';
import { useRouter } from 'next/router';
import loadable from '@loadable/component';

const CouponItem = loadable(() => import('../components/CouponItem'));

const Coupons = () => {
  const router = useRouter();
  const [coupons, setCoupons] = useState(null);
  const [user, loading, error] = useAuthState(auth);

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
    <>
      <Head>
        <title>Baby Manager | Coupons</title>
      </Head>
      <div className='mt-[calc(var(--header-height)+1rem)] flex flex-col justify-center items-center'>
        <h1 className='!mb-4 text-center text-[3rem]'>Coupons</h1>
        <section className='!mb-16'>{renderCoupons()}</section>
      </div>
    </>
  );
};

export default Coupons;
