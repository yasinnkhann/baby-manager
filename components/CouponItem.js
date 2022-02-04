const CouponItem = ({ coupon }) => {
  console.log(coupon);

  return (
    <article onClick={() => (window.location.href = coupon.deal.url)}>
      <img src={coupon.deal.image_url} />
      <p>{coupon.deal.title}</p>
      <p>{coupon.deal.description}</p>
    </article>
  );
};

export default CouponItem;
