import React from 'react';
import Footer from './components/Footer';
import ServiceCenters from './components/service';
import KiaHero from './components/KiaHero';
import Navbar from './components/Navbar';
import ScheduleServiceForm from './components/ScheduleService';

export default function KiaServicePage() {
  return (
    <div className='text-gray-800 bg-gray-50'>
      <Navbar />

      {/* HERO */}
      <section className='relative min-h-[80vh] flex items-center text-white'>
        <img
          src='https://www.carkia.in/assets/images/Q-city-financial-district-1.jpeg'
          alt='Kia Service'
          className='absolute inset-0 object-cover w-full h-full'
        />
        <div className='absolute inset-0 bg-black/60' />

        <div className='relative z-10 grid items-center gap-10 px-6 py-20 mx-auto md:grid-cols-2 max-w-7xl mt-11'>
          {/* LEFT CONTENT */}
          <div>
            <h1 className='text-4xl font-extrabold md:text-5xl'>
              Kia Authorized Service Center
            </h1>
            <p className='mt-4 text-lg text-white/80'>
              Genuine parts, expert technicians & fast turnaround for all Kia
              models.
            </p>

            <button className='px-6 py-3 mt-6 font-semibold text-black bg-white rounded-lg'>
              Call Now
            </button>
          </div>

          {/* RIGHT FORM */}
          <ScheduleServiceForm />
        </div>
      </section>

      <ServiceCenters />
      <KiaHero />
      <Footer />
    </div>
  );
}
