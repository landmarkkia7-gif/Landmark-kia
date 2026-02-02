import React, { useState } from "react";
import { addDoc, collection, Timestamp } from "firebase/firestore";
import { CgSpinner } from "react-icons/cg";
import toast from "react-hot-toast";
import { db } from "../lib/firebase";
import { useNavigate } from "react-router-dom";

export default function ScheduleServiceForm() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    name: "",
    email: "",
    mobile: "",
    model: "",
    city: "",
    pickup: "",
    comments: "",
  });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await addDoc(collection(db, "serviceAppointments"), {
        ...form,
        timestamp: Timestamp.now(),
      });

      toast.success("Service booked successfully");
      navigate("/thank-you");
    } catch (err) {
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 mt-10 shadow-xl bg-white/30 rounded-2xl">
      <h3 className="mb-4 text-xl font-bold text-center">
        Schedule Service
      </h3>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input name="name" placeholder="Full Name *" onChange={handleChange} className="inputStyle" />
        <input name="email" placeholder="Email *" onChange={handleChange} className="inputStyle" />
        <input name="mobile" placeholder="Mobile *" onChange={handleChange} className="inputStyle" />

        <select name="model" onChange={handleChange} className="inputStyle">
          <option value="">Select Model</option>
          <option>Seltos</option>
          <option>Sonet</option>
          <option>Carens</option>
        </select>

        <select name="city" onChange={handleChange} className="inputStyle">
          <option value="">Select Location</option>
          <option>Hyderabad</option>
          <option>Khammam</option>
        </select>

        <select name="pickup" onChange={handleChange} className="inputStyle">
          <option value="">Pickup Required?</option>
          <option>Yes</option>
          <option>No</option>
        </select>

        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 font-semibold text-white bg-black rounded-lg"
        >
          {loading ? (
            <span className="flex items-center justify-center">
              <CgSpinner className="mr-2 animate-spin" /> Booking...
            </span>
          ) : (
            "Book Service"
          )}
        </button>
      </form>
    </div>
  );
}
