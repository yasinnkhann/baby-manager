import Link from 'next/Link';

fetch('https://jsonplaceholder.typicode.com/users').then(res => res.json());

export const getServerSideProps = async () => {
  const res = await fetch('https://jsonplaceholder.typicode.com/users');
  const data = await res.json();

  return {
    props: { baby: data },
  };
};

const BabyIndex = ({ baby }) => {
  return (
    <>
      {baby.map((baby, index) => {
        return (
          <Link href={`/baby/${baby.id}`} key={baby.id}>
            <a>
              <h4>{baby.name}</h4>
            </a>
          </Link>
        );
      })}
    </>
  );
};

export default BabyIndex;
