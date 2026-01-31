import React from "react";

export default function ScheduleService() {
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
          <form className="grid gap-6 md:grid-cols-3">

            <Input placeholder="Full Name *" />
            <Input placeholder="Email Address *" type="email" />
            <Input placeholder="Mobile Number *" type="tel" />

            <Input type="date" />
            <Input placeholder="Car Year *" />

            <Select
              options={["-- Select Car Model --", "Seltos", "Sonet", "Carens"]}
            />

            <Select
              options={["-- Select Location --", "Hyderabad", "Chennai"]}
            />

            <Select
              options={["-- Pick Up Required --", "Yes", "No"]}
            />

            {/* TEXTAREA */}
            <textarea
              rows="4"
              placeholder="Additional Comments"
              className="resize-none md:col-span-3 inputStyle"
            />
          </form>

          {/* BUTTON */}
          <div className="mt-10 text-center">
            <button className="px-12 py-4 text-lg font-semibold text-white transition bg-gray-900 rounded-lg shadow-lg hover:bg-black">
              Book Appointment
            </button>
          </div>
        </div>

      </div>
    </section>
  );
}

/* Reusable Input */
function Input({ placeholder, type = "text" }) {
  return (
    <input
      type={type}
      placeholder={placeholder}
      className="inputStyle"
    />
  );
}

/* Reusable Select */
function Select({ options }) {
  return (
    <select className="inputStyle">
      {options.map((opt, i) => (
        <option key={i}>{opt}</option>
      ))}
    </select>
  );
}
