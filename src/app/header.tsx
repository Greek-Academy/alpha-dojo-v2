import { HeaderButtons } from './header-actions';
import Link from 'next/link';
import { MyAccount } from '@/components/my-account';

export const Header = () => {
  return (
    <div className='w-full px-6 py-2'>
      <div className='w-full flex justify-between items-center'>
        <Link className='items-center' href='/'>
          Alpha Dojo
        </Link>
        <HeaderButtons />
        <div className='items-center'>
          <MyAccount />
        </div>
      </div>
    </div>
  );
};
