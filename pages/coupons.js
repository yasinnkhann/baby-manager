import axios from 'axios';
import Head from 'next/head';
import { useEffect, useState } from 'react';

const Coupons = () => {
  const [coupons, setCoupons] = useState(null);

  useEffect(() => {}, []);

  const fetchCoupons = async () => {
    const stuff = await axios.get('https://api.discountapi.com/v2/deals', {});
  };

  return (
    <>
      <Head>
        <title>Baby Manager | Coupons</title>
      </Head>
      <h1>Coupons</h1>
      <section>
        <p>Coupons</p>
      </section>
    </>
  );
};
