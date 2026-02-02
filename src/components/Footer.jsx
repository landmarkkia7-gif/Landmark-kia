import React from "react";
import { FiFacebook, FiInstagram, FiLinkedin, FiPhone } from "react-icons/fi";

export default function Footer() {
  return (
    <footer className="pb-8 text-gray-300 bg-gray-900 pt-14">
      <div className="grid gap-10 px-6 mx-auto max-w-7xl md:grid-cols-4">

        {/* LOGO + ABOUT */}
        <div>
          <img
            src="/images/Landmark_white_logo.webp"
            alt="Company Logo"
            className="w-34 "
          />
      
        </div>

        {/* SERVICE CENTERS */}
        <div>
          <h4 className="mb-4 font-semibold text-white">Service Centers</h4>

          <div className="space-y-3 text-sm">
            <p className="flex items-center gap-2">
              <FiPhone /> Raidurg – 7799906839
            </p>
            <p className="flex items-center gap-2">
              <FiPhone /> Kompally – 9123456789
            </p>
            <p className="flex items-center gap-2">
              <FiPhone /> Kukatpally – 9876543210
            </p>
          </div>
        </div>

        {/* QUICK LINKS */}
        <div>
          <h4 className="mb-4 font-semibold text-white">Quick Links</h4>

          <ul className="space-y-2 text-sm">
            <li><a href="/privacy-policy" className="hover:text-white">Privacy Policy</a></li>
            <li><a href="/terms" className="hover:text-white">Terms & Conditions</a></li>
            <li><a href="/contact" className="hover:text-white">Contact Us</a></li>
          </ul>
        </div>

        {/* SOCIAL */}
        <div>
          <h4 className="mb-4 font-semibold text-white">Follow Us</h4>

          <div className="flex gap-4 text-xl">
            <a href="/" className="hover:text-blue-500"><FiFacebook /></a>
            <a href="/" className="hover:text-pink-500"><FiInstagram /></a>
            <a href="/" className="hover:text-blue-400"><FiLinkedin /></a>
          </div>
        </div>

      </div>

      {/* BOTTOM BAR */}
      <div className="pt-6 mt-10 text-sm text-center text-gray-400 border-t border-gray-700">
        © {new Date().getFullYear()} Kia Service Center. All Rights Reserved.

        <div className="flex items-center justify-center gap-2 mt-2">
          <span>Developed by</span>

          <a
            href="https://www.broaddcast.com"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2"
          >
            <img
              src="https://www.broaddcast.com/assets/images/logo-white.svg"
              alt="Broaddcast Logo"
              className="object-contain h-10 w-100 hover:text-red-400"
            />
           
          </a>
        </div>
      </div>
    </footer>
  );
}
