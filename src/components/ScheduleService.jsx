import React, { useState } from "react";
import { addDoc, collection, Timestamp } from "firebase/firestore";
import { CgSpinner } from "react-icons/cg";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { db } from "../lib/firebase";

/* =========================
   MAIN COMPONENT
========================= */
export default function ScheduleService() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    mobile: "",
    date: "",
    carYear: "",
    model: "",
    city: "",
    pickup: "",
    comments: "",
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const validate = () => {
    let err = {};
    if (!form.name.trim()) err.name = "Name is required";
    if (!/^\d{10}$/.test(form.mobile))
      err.mobile = "Enter valid 10-digit mobile number";
    if (!form.email || !/\S+@\S+\.\S+/.test(form.email))
      err.email = "Valid email required";
    if (!form.model) err.model = "Select car model";
    if (!form.city) err.city = "Select location";
    if (!form.pickup) err.pickup = "Select pickup option";
    return err;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length) return;

    setLoading(true);
    try {
      await addDoc(collection(db, "serviceAppointments"), {
        ...form,
        timestamp: Timestamp.now(),
      });

      toast.success("Service booked successfully 🚗");
      navigate("/thank-you");
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="py-20 bg-black">
      <div className="max-w-6xl px-6 mx-auto">

        {/* HEADING */}
        <p className="tracking-wide text-center text-white/80">
          Make an appointment with us
        </p>
        <h2 className="mt-2 text-4xl font-extrabold text-center text-white md:text-5xl">
          Schedule A Service
        </h2>

        {/* FORM CARD */}
        <div className="p-8 mt-12 shadow-2xl bg-white/95 backdrop-blur rounded-2xl md:p-10">
          <form
            onSubmit={handleSubmit}
            className="grid gap-6 md:grid-cols-3"
          >
            <Input
              name="name"
              placeholder="Full Name *"
              value={form.name}
              onChange={handleChange}
              error={errors.name}
            />

            <Input
              name="email"
              type="email"
              placeholder="Email Address *"
              value={form.email}
              onChange={handleChange}
              error={errors.email}
            />

            <Input
              name="mobile"
              type="tel"
              placeholder="Mobile Number *"
              value={form.mobile}
              onChange={handleChange}
              error={errors.mobile}
            />

            <Input
              name="date"
              type="date"
              value={form.date}
              onChange={handleChange}
            />

            <Input
              name="carYear"
              placeholder="Car Year"
              value={form.carYear}
              onChange={handleChange}
            />

            <Select
              name="model"
              value={form.model}
              onChange={handleChange}
              options={[
                "-- Select Car Model --",
                "Seltos",
                "Sonet",
                "Carens",
              ]}
              error={errors.model}
            />

            <Select
              name="city"
              value={form.city}
              onChange={handleChange}
              options={[
                "-- Select Location --",
                "Hyderabad",
                "Chennai",
                "Khammam",
              ]}
              error={errors.city}
            />

            <Select
              name="pickup"
              value={form.pickup}
              onChange={handleChange}
              options={[
                "-- Pick Up Required --",
                "Yes",
                "No",
              ]}
              error={errors.pickup}
            />

            <textarea
              name="comments"
              rows="4"
              placeholder="Additional Comments"
              value={form.comments}
              onChange={handleChange}
              className="resize-none md:col-span-3 inputStyle"
            />

            {/* BUTTON */}
            <div className="mt-6 text-center md:col-span-3">
              <button
                type="submit"
                disabled={loading}
                className="px-12 py-4 text-lg font-semibold text-white transition bg-gray-900 rounded-lg shadow-lg hover:bg-black"
              >
                {loading ? (
                  <span className="flex items-center justify-center">
                    <CgSpinner className="mr-2 animate-spin" /> Booking...
                  </span>
                ) : (
                  "Book Appointment"
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}

/* =========================
   REUSABLE INPUT
========================= */
function Input({ name, placeholder, type = "text", value, onChange, error }) {
  return (
    <div>
      <input
        name={name}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="w-full inputStyle"
      />
      {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
    </div>
  );
}

/* =========================
   REUSABLE SELECT
========================= */
function Select({ name, value, onChange, options, error }) {
  return (
    <div>
      <select
        name={name}
        value={value}
        onChange={onChange}
        className="w-full inputStyle"
      >
        {options.map((opt, i) => (
          <option key={i} value={i === 0 ? "" : opt}>
            {opt}
          </option>
        ))}
      </select>
      {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
    </div>
  );
}
