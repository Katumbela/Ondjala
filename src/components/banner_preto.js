import '../App.css';

import print from '../imgs/print.gif'

function BannerPreto({ children }) {
  return (
    <div style={{}} className="bg-dark  text-center w-100 py-4">
      <h1 className='text-white'>{children}</h1>
    </div>
  );
}

export default BannerPreto;
