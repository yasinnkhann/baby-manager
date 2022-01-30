import Image from 'next/image';
import baby from '../babyIcon.png';

export default function Navbar() {
  return (
    <nav className='bg-blue-100'>
      <div className='px-8 py-4 mx-auto'>
        <div className='flex justify-between'>
          <div>logo</div>

          <div>primary nav</div>

          <div>secondary nav</div>
        </div>
      </div>
    </nav>
  );
}

{
  /* <div className="flex flex">
      <Image className="" alt="baby icon" src={baby} width={145} height={100}/>
      <h1 className="text-xl md:text-4xl lg:text-8xl">nav goes here</h1>
      </div> */
}
