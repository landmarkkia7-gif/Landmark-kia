import { FaPhoneAlt } from "react-icons/fa";
import React from 'react'
import { Link } from 'react-router-dom';
function Navbar() {
  return (
    <nav className="fixed top-0 left-0 z-50 flex items-center justify-between w-full px-6 py-3 space-x-2 bg-white shadow-md backdrop-blur-lg md:px-12 lg:px-16">

      <Link to="/">
        <img
          src='/images/Landmark-kia-service-logo.svg'
          className="w-full h-20 "
          alt="kia Logo"
        />
      </Link>

      <div className="flex items-center text-base font-semibold md:text-xl">
        <a
          href="tel:+919100075700"
          className="flex items-center gap-2 font-bold transition hover:text-yellow-400"
          aria-label="Call us at 9100075700"
        >
          <FaPhoneAlt className="text-sm text-red-500 md:text-lg" />
          <span className="">9100075700</span>
        </a>
      </div>


    </nav>

  )
}

export default Navbar