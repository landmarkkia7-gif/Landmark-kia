import React from "react";

export default function KiaHero() {
  return (
    <section className="relative w-full min-h-[80vh] overflow-hidden bg-gradient-to-r from-black via-[#2b1f16] to-[#5b3a1a] text-white">

      {/* CONTAINER */}
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 items-center min-h-[80vh]">

        {/* LEFT — CAR IMAGE */}
        <div className="relative flex justify-center md:justify-start">
          <img
            src="/images/Syros.webp"   // <-- replace with Kia car PNG
            alt="Kia Car"
            className="w-[90%] md:w-[520px] object-contain drop-shadow-2xl"
          />
        </div>

        {/* RIGHT — CONTENT */}
        <div className="space-y-6">
          <h2 className="text-sm tracking-widest text-green-400 uppercase">
            Because You Deserve the Best
          </h2>

          <h1 className="text-3xl font-extrabold leading-tight md:text-5xl">
            Kia Premium Service Center
          </h1>

          <p className="max-w-xl text-gray-300">
            Experience certified Kia servicing with genuine parts,
            expert technicians and transparent pricing.
            Drive with confidence every day.
          </p>

          {/* FEATURES */}
          <div className="grid gap-6 pt-4 sm:grid-cols-2">

            <Feature
              title="Service Cost Calculator"
              desc="Know your estimated service cost instantly."
            />

            <Feature
              title="Periodic Maintenance"
              desc="Book routine checkups to keep your Kia healthy."
            />

            <Feature
              title="Genuine Parts"
              desc="Only OEM parts for performance and safety."
            />

            <Feature
              title="Expert Technicians"
              desc="Trained professionals with Kia certification."
            />

          </div>
        </div>

      </div>

      {/* BOTTOM SHADOW / FLOOR EFFECT */}
      <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-black/60 to-transparent" />
    </section>
  );
}

function Feature({ title, desc }) {
  return (
    <div className="flex items-start gap-3">
      <div className="flex items-center justify-center w-10 h-10 text-green-400 border border-gray-600 rounded-full">
        •
      </div>
      <div>
        <h4 className="font-semibold">{title}</h4>
        <p className="text-sm text-gray-400">{desc}</p>
      </div>
    </div>
  );
}
