import { CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import React, { useEffect } from "react";

const ThankYouPage = () => {

  useEffect(() => {
    let email = "";
    let tracked = false;

    const capture = (e) => {
      const input =
        e?.target?.closest('input[name="email"]') ||
        document.querySelector('input[name="email"]');

      if (input?.value) email = input.value.trim();
    };

    document.addEventListener("focusout", capture);

    document.addEventListener("click", (e) => {
      if (e.target?.closest('button[type="submit"]')) {
        capture(e);
      }
    });

    const checkConversion = () => {
      if (tracked) return;

      const el = document.querySelector(
        ".flex.flex-col.items-center.mt-12.text-center"
      );

      if (
        el?.innerText.includes("THANK YOU!") &&
        window.location.pathname.includes("/thank-you")
      ) {
        if (email && window.gtag) {
          window.gtag("set", "user_data", { email });
        }

        if (window.gtag) {
          window.gtag("event", "conversion", {
            send_to: "AW-17849610803/TtxuCMCiqvQbELPkrb9C",
          });
        }

        tracked = true;
      }
    };

    // Mutation Observer
    const observer = new MutationObserver(checkConversion);

    observer.observe(document.body, {
      childList: true,
      subtree: true,
    });

    // URL Change Observer (Safe Version)
    const originalPushState = window.history.pushState;

    window.history.pushState = function (...args) {
      originalPushState.apply(this, args);
      checkConversion();
    };

    window.addEventListener("popstate", checkConversion);

    // Initial check
    checkConversion();

    return () => {
      document.removeEventListener("focusout", capture);
      observer.disconnect();
      window.history.pushState = originalPushState;
      window.removeEventListener("popstate", checkConversion);
    };

  }, []);

  return (
    <div className='flex flex-col items-center justify-center min-h-screen bg-gray-50'>
      
      {/* Navigation Bar */}
      <nav className='fixed top-0 left-0 z-50 flex items-center justify-between w-full px-6 py-3 shadow-md md:px-12 lg:px-16 bg-white/30 backdrop-blur-lg'>
        <Link to='/'>
          <img
            src='/images/Landmark-kia-service-logo.svg'
            className='w-full h-20'
            alt='kia Logo'
          />
        </Link>

        <a
          className='text-lg font-semibold text-gray-900'
          href='tel:+919000152007'
        >
          📞 9000152007
        </a>
      </nav>

      <div className='w-full h-12'></div>

      {/* Main Content */}
      <div className='flex flex-col items-center mt-12 text-center'>
        <CheckCircle className='w-16 h-16 text-green-600' />

        <h1 className='mt-4 text-2xl font-bold text-black'>
          THANK YOU!
        </h1>

        <p className='max-w-lg mt-2 text-gray-600'>
          Your enquiry has been processed successfully. Our executive will get
          in touch with you shortly.
        </p>

        <Link
          to='/'
          className='flex items-center mt-4 font-medium text-blue-600'
        >
          <span>← Back to Home</span>
        </Link>
      </div>

    </div>
  );
};

export default ThankYouPage;