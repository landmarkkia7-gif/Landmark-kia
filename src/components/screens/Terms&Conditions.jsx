import React from "react";

import Navbar from "../Navbar";
import Footer from "../Footer";

export default function TermsAndConditions() {
  return (
    <>
      <Navbar />

      <div className="max-w-4xl px-6 py-12 mx-auto mt-20 text-gray-800">
        <h1 className="mb-6 text-4xl font-bold text-teal-700">
          Terms & Conditions
        </h1>

        <p className="mb-6">
          Welcome to <strong>Landmark Kia Service Center</strong>. By accessing
          our website, booking a service, or using any of our services, you
          agree to comply with and be bound by the following Terms & Conditions.
          Please read them carefully before proceeding.
        </p>

        {/* Use of Website */}
        <section className="mb-8">
          <h2 className="mb-2 text-2xl font-semibold text-gray-700">
            Use of Website & Services
          </h2>
          <ul className="pl-5 space-y-1 list-disc">
            <li>
              This website is intended to provide information about Landmark Kia
              Service Center, including service bookings and customer support.
            </li>
            <li>
              You agree to use this website only for lawful purposes and in a
              manner that does not infringe the rights of others.
            </li>
            <li>
              Unauthorized use of this website may result in legal action.
            </li>
          </ul>
        </section>

        {/* Service Bookings */}
        <section className="mb-8">
          <h2 className="mb-2 text-2xl font-semibold text-gray-700">
            Service Appointments & Bookings
          </h2>
          <ul className="pl-5 space-y-1 list-disc">
            <li>
              Service bookings made online or offline are subject to availability.
            </li>
            <li>
              Landmark Kia Service Center reserves the right to reschedule or
              cancel appointments due to operational requirements.
            </li>
            <li>
              Customers must provide accurate vehicle and contact details at
              the time of booking.
            </li>
          </ul>
        </section>

        {/* Pricing */}
        <section className="mb-8">
          <h2 className="mb-2 text-2xl font-semibold text-gray-700">
            Pricing & Payments
          </h2>
          <ul className="pl-5 space-y-1 list-disc">
            <li>
              All service charges are indicative and may vary based on vehicle
              condition and additional work required.
            </li>
            <li>
              Final billing will be shared after inspection and customer
              approval.
            </li>
            <li>
              Payments must be made using accepted payment methods at the
              service center.
            </li>
          </ul>
        </section>

        {/* Warranty */}
        <section className="mb-8">
          <h2 className="mb-2 text-2xl font-semibold text-gray-700">
            Warranty & Liability
          </h2>
          <ul className="pl-5 space-y-1 list-disc">
            <li>
              Repairs and parts are covered under Kia’s warranty policies,
              wherever applicable.
            </li>
            <li>
              Landmark Kia Service Center shall not be held responsible for
              delays caused by parts availability, natural events, or factors
              beyond our control.
            </li>
            <li>
              We are not liable for personal belongings left inside the vehicle.
            </li>
          </ul>
        </section>

        {/* Intellectual Property */}
        <section className="mb-8">
          <h2 className="mb-2 text-2xl font-semibold text-gray-700">
            Intellectual Property
          </h2>
          <p>
            All content on this website, including text, images, logos, and
            design elements, is the property of Landmark Kia Service Center or
            its licensors and is protected under applicable intellectual
            property laws. Unauthorized use is prohibited.
          </p>
        </section>

        {/* Privacy */}
        <section className="mb-8">
          <h2 className="mb-2 text-2xl font-semibold text-gray-700">
            Privacy
          </h2>
          <p>
            Your use of this website is also governed by our Privacy Policy,
            which outlines how we collect and handle your personal information.
          </p>
        </section>

        {/* Changes */}
        <section className="mb-8">
          <h2 className="mb-2 text-2xl font-semibold text-gray-700">
            Changes to Terms
          </h2>
          <p>
            Landmark Kia Service Center reserves the right to modify these Terms
            & Conditions at any time without prior notice. Continued use of our
            website or services constitutes acceptance of the updated terms.
          </p>
        </section>

        {/* Governing Law */}
        <section className="mb-8">
          <h2 className="mb-2 text-2xl font-semibold text-gray-700">
            Governing Law
          </h2>
          <p>
            These Terms & Conditions shall be governed by and interpreted in
            accordance with the laws of India. Any disputes shall be subject to
            the jurisdiction of local courts.
          </p>
        </section>

        {/* Contact */}
        <section>
          <h2 className="mb-2 text-2xl font-semibold text-gray-700">
            Contact Information
          </h2>
          <p>
            For any questions regarding these Terms & Conditions, please contact
            us at <strong>9100075700</strong>.
          </p>
        </section>

        <p className="mt-10 text-sm text-gray-500">
          By using our website and services, you acknowledge that you have read
          and agreed to these Terms & Conditions.
        </p>
      </div>

      <Footer />
    </>
  );
}
