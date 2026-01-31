
import React from 'react'
import { Link } from 'react-router-dom';
function Navbar() {
  return (
    <nav className="fixed top-0 left-0 z-50 flex items-center justify-between w-full px-6 py-3 bg-white shadow-md backdrop-blur-lg md:px-12 lg:px-16">

      <Link to="/">
        <img
          src='/images/Landmark-kia-service-logo.svg'
          className="w-full h-20 "
          alt="kia Logo"
        />
      </Link>

      <h1 className="flex items-center text-base font-semibold text-white md:text-xl">
        Booking for
        <a
          href="tel:+917995088847"
          className="pl-3 text-lg font-bold text-black md:text-xl"
        >
          📞7995088847
        </a>
      </h1>

    </nav>

  )
}

export default Navbar