import React from 'react';
import Footer from './components/Footer';
import ServiceCenters from './components/service';
import KiaHero from './components/KiaHero';
import Navbar from './components/Navbar';
import ScheduleService from './components/ScheduleService';
export default function KiaServicePage() {
  return (
    <div className='text-gray-800 bg-gray-50'>
      <Navbar />
      {/* HERO */}
      <section className='relative min-h-[80vh] flex items-center justify-center text-white'>
        <img
          src='https://www.carkia.in/assets/images/Q-city-financial-district-1.jpeg'
          alt='Kia Service'
          className='absolute inset-0 object-cover w-full h-full'
        />
        <div className='absolute inset-0 bg-black/60' />

        <div className='relative z-10 grid gap-10 px-6 py-20 mx-auto md:grid-cols-2 max-w-7xl'>
          {/* LEFT TEXT */}
          <div>
            <h1 className='text-4xl font-extrabold leading-tight md:text-5xl'>
              Kia Authorized Service Center
            </h1>
            <p className='mt-4 text-lg text-white/80'>
              Genuine parts, expert technicians & fast turnaround for all Kia
              models.
            </p>

            <div className='flex gap-4 mt-6'>
              {/* <button className='px-6 py-3 font-semibold bg-red-600 rounded-lg hover:bg-red-700'>
                Book Service
              </button> */}
              <button className='px-6 py-3 font-semibold text-black bg-white rounded-lg'>
                Call Now
              </button>
            </div>
          </div>
        </div>
      </section>

      <ServiceCenters />
      <ScheduleService />
      <KiaHero />

      <Footer />
    </div>
  );
}

// function Step({ num, text }) {
//   return (
//     <div className='p-6 bg-white shadow rounded-xl'>
//       <div className='text-3xl font-bold text-red-600'>{num}</div>
//       <p className='mt-2'>{text}</p>
//     </div>
//   );
// }
