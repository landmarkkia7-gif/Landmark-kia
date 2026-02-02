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
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  /* =====================
     VALIDATION
  ===================== */
  const validate = () => {
    const err = {};

    if (!form.name.trim()) err.name = "Name is required";

    if (!/^[6-9]\d{9}$/.test(form.mobile)) {
      err.mobile = "Enter a valid 10-digit mobile number starting with 6-9";
    }
    if (!form.model) err.model = "Please select car model";
    if (!form.city) err.city = "Please select preferred location";
    if (!form.pickup) err.pickup = "Please select pickup option";

    // EMAIL OPTIONAL but VALID if entered
    if (form.email && !/\S+@\S+\.\S+/.test(form.email)) {
      err.email = "Please enter a valid email address";
    }

    return err;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) return;

    setLoading(true);
    try {
      await addDoc(collection(db, "serviceAppointments"), {
        ...form,
        timestamp: Timestamp.now(),
      });

      toast.success("Service booked successfully 🚗");
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
        {/* NAME */}
        <div>
          <input
            name="name"
            placeholder="Full Name *"
            value={form.name}
            onChange={handleChange}
            className="inputStyle"
          />
          {errors.name && (
            <p className="mt-1 text-xs text-red-500">{errors.name}</p>
          )}
        </div>

        {/* EMAIL (OPTIONAL) */}
        <div>
          <input
            name="email"
            placeholder="Email (optional)"
            value={form.email}
            onChange={handleChange}
            className="inputStyle"
          />
          {errors.email && (
            <p className="mt-1 text-xs text-red-500">{errors.email}</p>
          )}
        </div>

        {/* MOBILE */}
        <div>
          <input
            name="mobile"
            placeholder="Mobile *"
            value={form.mobile}
            onChange={handleChange}
            className="inputStyle"
          />
          {errors.mobile && (
            <p className="mt-1 text-xs text-red-500">{errors.mobile}</p>
          )}
        </div>

        {/* MODEL */}
        <div>
          <select
            name="model"
            value={form.model}
            onChange={handleChange}
            className="inputStyle"
          >
            <option value="">Select Model</option>
            <option>Seltos</option>
            <option>Sonet</option>
            <option>Syros</option>
            <option>Carens</option>
            <option>Carnival</option>
            {/* <option>EV6</option>
            <option>EV9</option> */}
          </select>
          {errors.model && (
            <p className="mt-1 text-xs text-red-500">{errors.model}</p>
          )}
        </div>

        {/* CITY */}
        <div>
          <select
            name="city"
            value={form.city}
            onChange={handleChange}
            className="inputStyle"
          >
            <option value="">Preferred Service Location</option>
            <option>Medipally</option>
            <option>Attapur</option>
            <option>Kompally</option>
          </select>
          {errors.city && (
            <p className="mt-1 text-xs text-red-500">{errors.city}</p>
          )}
        </div>

        {/* PICKUP */}
        <div>
          <select
            name="pickup"
            value={form.pickup}
            onChange={handleChange}
            className="inputStyle"
          >
            <option value="">Pickup Required?</option>
            <option>Yes</option>
            <option>No</option>
          </select>
          {errors.pickup && (
            <p className="mt-1 text-xs text-red-500">{errors.pickup}</p>
          )}
        </div>

        {/* SUBMIT */}
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
