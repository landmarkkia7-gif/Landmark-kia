import React from "react";
import { FiMapPin, FiClock, FiPhone, FiMail } from "react-icons/fi";

export default function ServiceCenterDetails({
  title = "Contact Details",
  image,
  address,
  time,
  phone,
  email,
  detailsLink = "#",
  mapEmbed, // 👈 NEW PROP
}) {
  return (
    <section className="bg-[#22344d] text-white py-12">
      <div className="grid items-start gap-10 px-6 mx-auto md:grid-cols-2 max-w-7xl">

        {/* LEFT IMAGE */}
        <div className="overflow-hidden rounded-lg shadow-lg">
          <img
            src={image}
            alt={title}
            className="w-full h-[320px] object-cover"
          />
        </div>

        {/* RIGHT DETAILS */}
        <div>
          <h2 className="mb-6 text-3xl font-bold">{title}</h2>

          <div className="space-y-4 text-gray-200">

            {address && (
              <div className="flex gap-3">
                <FiMapPin className="mt-1 text-xl" />
                <p>{address}</p>
              </div>
            )}

            {time && (
              <div className="flex gap-3">
                <FiClock className="mt-1 text-xl" />
                <p>{time}</p>
              </div>
            )}

            {phone && (
              <div className="flex gap-3">
                <FiPhone className="mt-1 text-xl" />
                <p>{phone}</p>
              </div>
            )}

            {email && (
              <div className="flex gap-3">
                <FiMail className="mt-1 text-xl" />
                <p>{email}</p>
              </div>
            )}
          </div>

          {/* BUTTON */}
          <div className="mt-8">
            <a
              href={detailsLink}
              className="px-6 py-3 font-semibold bg-black rounded-md hover:bg-gray-800"
            >
              VIEW DETAILS
            </a>
          </div>
        </div>

      </div>

      {/* MAP SECTION BELOW */}
      {mapEmbed && (
        <div className="px-6 mx-auto mt-12 max-w-7xl">
          <iframe
            src={mapEmbed}
            className="w-full h-[350px] rounded-lg shadow-lg border-0"
            loading="lazy"
            allowFullScreen
            referrerPolicy="no-referrer-when-downgrade"
            title="service-map"
          />
        </div>
      )}
    </section>
  );
}
