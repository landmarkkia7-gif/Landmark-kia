import React, { useState } from 'react';

export default function Popup() {
  const [mobile, setMobile] = useState('');
  const [error, setError] = useState('');
  const [isOpen, setIsOpen] = useState(true);

  const validateMobile = (num) => {
    return /^[6-9]\d{9}$/.test(num); // Indian mobile number format
  };

  const handleSubmit = () => {
    if (!validateMobile(mobile)) {
      setError('Please enter a valid 10-digit mobile number.');
    } else {
      setError('');
      alert('Submitted successfully!');
      // Add your submit logic here
    }
  };

  if (!isOpen) return null;

  return (
    <div className='fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50'>
      <div className='relative w-full max-w-md p-6 text-center bg-white shadow-xl rounded-2xl'>
        <button
          className='absolute p-1 text-sm text-black rounded-full top-3 right-3 hover:text-white hover:bg-red-700'
          onClick={() => setIsOpen(false)}
        >
          ✕
        </button>

        <div className='flex justify-center mb-4'>
          <svg
            className='w-8 h-8 text-black'
            fill='none'
            stroke='currentColor'
            strokeWidth='1.5'
            viewBox='0 0 24 24'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              d='M12 2C9.243 2 7 4.243 7 7v2a5 5 0 005 5 5 5 0 005-5V7c0-2.757-2.243-5-5-5z'
            />
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              d='M12 14v6m-4 0h8'
            />
          </svg>
        </div>

        <h1 className='mb-2 font-serif text-3xl tracking-widest'>
          LakshmiHYUNDAI
        </h1>
        <p className='mb-4 font-medium'>GET A FREE QUOTE & NEW OFFERS</p>

        <input
          type='text'
          placeholder='Enter your mobile no here'
          value={mobile}
          onChange={(e) => setMobile(e.target.value)}
          className='w-full p-2 mb-2 text-center border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black'
        />
        {error && <p className='mb-2 text-sm text-red-500'>{error}</p>}

        <button
          onClick={handleSubmit}
          className='w-full py-2 font-semibold text-white bg-black rounded-md'
        >
          SUBMIT
        </button>

        <div className='flex gap-4 mt-4 '>
          <button className='flex items-center justify-center w-1/2 py-2 text-black bg-gray-100 rounded-md hover:text-white hover:bg-blue-500'>
            📞 Call now
          </button>
          <button className='flex items-center justify-center w-1/2 py-2 text-black bg-gray-100 rounded-md hover:bg-green-500'>
            🟢 WhatsApp
          </button>
        </div>

        <p className='mt-4 text-xs text-gray-600'>
          <span className='font-semibold'>*Disclaimer:</span> By clicking
          'Submit', you have agreed to our Terms & Conditions.
        </p>
      </div>
    </div>
  );
}
