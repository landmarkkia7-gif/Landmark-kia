import React, { useEffect, useState } from 'react';
import { FaHome, FaMapMarkerAlt } from 'react-icons/fa';
import { Link } from 'react-router-dom';

function Sidebar({ active }) {
  const [activeScreen, setActiveScreen] = useState();
  const location = window.location.pathname;

  useEffect(() => {
    setActiveScreen(location);
  }, [location]);

  return (
    <div
      className={`${active ? 'w-72' : 'w-16'
        } bg-white border-r duration-300 border-gray-100`}
    >
      <img
        src='/images/Landmark-kia-service-logo.svg'
        className='w-auto h-16 mx-auto mt-3'
        alt='Logo'
      />

      <div className='flex flex-col mt-12 space-y-1'>
        {/* Dashboard */}
        <Link
          to='/admin/Analytics'
          className={`${activeScreen === '/admin/Analytics'
              ? 'text-white bg-black'
              : 'text-gray-500'
            } flex items-center p-4`}
        >
          <FaMapMarkerAlt className='mr-3' size={22} />
          <span className={`font-semibold ${active ? 'block' : 'hidden'}`}>
            Dashboard
          </span>
        </Link>
        {/* Home */}
        <Link
          to='/admin/dashboard'
          className={`${activeScreen === '/admin/dashboard'
            ? 'text-white bg-black'
            : 'text-gray-500'
            } flex items-center p-4 `}
        >
          <FaHome className='mr-3' size={22} />
          <span className={`font-semibold ${active ? 'block' : 'hidden'}`}>
           Leads
          </span>
        </Link>



      </div>
    </div>
  );
}

export default Sidebar;
