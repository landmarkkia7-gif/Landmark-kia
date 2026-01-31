import React, { useState } from 'react';
import { CgSpinner } from 'react-icons/cg';
import { addDoc, collection, Timestamp } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { db } from '../../lib/firebase';
import toast from 'react-hot-toast';

export default function HomeForm() {
  const [form, setForm] = useState({
    name: '',
    mobile: '',
    email: '',
    model: '',
    city: '',
  });

  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});
    setSubmitted(false);

    let newErrors = {};
    if (!form.name.trim()) newErrors.name = 'Name is required';
    if (!form.mobile.trim() || !/^\d{10}$/.test(form.mobile))
      newErrors.mobile = 'Valid 10-digit mobile number is required';
    if (!form.city) newErrors.city = 'Please select a city';
    if (!form.model) newErrors.model = 'Please select a car model';
    if (form.email && !/\S+@\S+\.\S+/.test(form.email))
      newErrors.email = 'Please enter a valid email address';

    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    setLoading(true);

    try {
      await addDoc(collection(db, 'leads'), {
        name: form.name,
        email: form.email,
        mobile: form.mobile,
        model: form.model,
        city: form.city,
        timestamp: Timestamp.now(),
      });

      toast.success('Successfully submitted');
      navigate('/thank-you');
    } catch (error) {
      console.log(error);
      toast.error('Something went wrong!');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className='
      w-full bg-white/40 flex justify-center border
      xl:top-80 2xl:top-96
      lg:absolute lg:right-72 lg:z-40 lg:-translate-y-1/2 lg:translate-x-1/2
      lg:bg-black/70 lg:p-6 lg:top-72 lg:rounded-2xl lg:shadow-lg
      lg:w-[90%] lg:max-w-sm
    '
    >
      <div className='w-full max-w-sm p-3 shadow-lg sm:p-8 md:p-4 rounded-2xl'>
        <h3 className='pb-4 text-xl font-bold text-center sm:text-2xl lg:text-white'>
          REGISTER YOUR INTEREST
        </h3>

        {!submitted && (
          <form onSubmit={handleSubmit} className='space-y-6'>
            {/* Name */}
            <input
              type='text'
              name='name'
              placeholder='Name'
              value={form.name}
              onChange={handleChange}
              disabled={loading}
              className='w-full px-4 py-2 text-sm text-center text-black bg-transparent border-b-2 border-black sm:text-base focus:outline-none lg:text-white lg:border-white'
            />
            {errors.name && (
              <p className='text-xs text-red-500'>{errors.name}</p>
            )}

            {/* Mobile */}
            <input
              type='text'
              name='mobile'
              placeholder='Mobile Number'
              value={form.mobile}
              onChange={handleChange}
              disabled={loading}
              className='w-full px-4 py-2 text-sm text-center text-black bg-transparent border-b-2 border-black sm:text-base focus:outline-none lg:text-white lg:border-white'
            />
            {errors.mobile && (
              <p className='text-xs text-red-500'>{errors.mobile}</p>
            )}

            {/* City */}
            <select
              name='city'
              value={form.city}
              onChange={handleChange}
              disabled={loading}
              className='w-full px-4 py-2 text-sm text-center text-black bg-transparent border-b-2 border-black sm:text-base focus:outline-none lg:text-white lg:border-white lg:bg-black/10'
            >
              <option value='' disabled>
                Select City
              </option>
              <option className='border-black md:text-black' value='Gachibowli'>
                Gachibowli
              </option>
              <option value='Nampally'>Nampally</option>
              <option value='KHAMMAM'>Khammam</option>
            </select>
            {errors.city && (
              <p className='text-xs text-red-500'>{errors.city}</p>
            )}
            {/* Model */}
            <select
              name='model'
              value={form.model}
              onChange={handleChange}
              disabled={loading}
              className='w-full px-4 py-2 text-sm text-center text-black bg-transparent border-b-2 border-black sm:text-base focus:outline-none lg:text-white lg:border-white lg:bg-black/10'
            >
              <option value=''>Select Model</option>
              <option value='I20'>I20</option>
              <option value='GRAND I10 NIOS'>GRAND I10 NIOS</option>
              <option value='AURA'>AURA</option>
              <option value='VERNA'>VERNA</option>
              <option value='ALCAZAR'>ALCAZAR</option>
              <option value='TUCSON'>TUCSON</option>
              <option value='CRETA N LINE'>CRETA N LINE</option>
              <option value='EXTER'>EXTER</option>
              <option value='VENUE N LINE'>VENUE N LINE</option>
              <option value='CRETA'>CRETA</option>
              <option value='CRETA ELECTRIC'>CRETA ELECTRIC</option>
              <option value='IONIQ 5'>IONIQ 5</option>
            </select>
            {errors.model && (
              <p className='text-xs text-red-500'>{errors.model}</p>
            )}

            {/* Submit */}
            <button
              type='submit'
              disabled={loading}
              className='w-full py-3 text-sm font-bold text-white transition duration-200 bg-blue-600 rounded-lg sm:text-base hover:bg-blue-700'
            >
              {loading ? (
                <div className='flex items-center justify-center'>
                  <CgSpinner className='w-5 h-5 mr-2 animate-spin' />
                  Submitting...
                </div>
              ) : (
                'Submit'
              )}
            </button>
          </form>
        )}

        <p className='mt-3 text-xs text-center text-gray-600 lg:text-white'>
          *By clicking 'Submit', you agree to our Terms & Conditions.
        </p>
      </div>
    </div>
  );
}
