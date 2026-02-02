import { CheckCircle } from 'lucide-react';
import React from 'react';
import { Link } from 'react-router-dom';

const ThankYouPage = () => {
  //   useEffect(() => {
  //     // Google Ads Conversion Tracking
  //     window.gtag && window.gtag("event", "conversion", {
  //       send_to: "AW-16918294850/KWoeCI6b2asaEMLiooM_",
  //       value: 1.0,
  //       currency: "INR",
  //     });
  //   }, []);

  return (
    <div className='flex flex-col items-center justify-center min-h-screen bg-gray-50'>
      {/* Navigation Bar */}
      <nav className='fixed top-0 left-0 z-50 flex items-center justify-between w-full px-6 py-3 shadow-md md:px-12 lg:px-16 bg-white/30 backdrop-blur-lg'>
        <Link to='/'>
          <img
            src='/images/Landmark-kia-service-logo.svg'
            className='w-full h-20 '
            alt='kia Logo'
          />
        </Link>
        <a
          className='text-lg font-semibold text-gray-900'
          href='tel:+919100075700'
        >
          📞 9100075700
        </a>
      </nav>

      {/* Header Bar */}
      <div className='w-full h-12 '></div>

      {/* Main Content */}
      <div className='flex flex-col items-center mt-12 text-center'>
        <CheckCircle className='w-16 h-16 text-green-600' />
        <h1 className='mt-4 text-2xl font-bold text-black'>THANK YOU!</h1>
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
