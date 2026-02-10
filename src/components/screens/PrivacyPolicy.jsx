import React from "react";

import Navbar from "../Navbar";
import Footer from "../Footer";

export default function PrivacyPolicy() {
  return (
    <>
      <Navbar />

      <div className="max-w-4xl px-6 py-12 mx-auto mt-20 text-gray-800">
        <h1 className="mb-6 text-4xl font-bold text-teal-700">
          Privacy Policy
        </h1>

        <p className="mb-6">
          At <strong>Landmark Kia Service Center</strong>, we respect your privacy
          and are committed to protecting the personal information you share
          with us. This Privacy Policy explains how we collect, use, store, and
          protect your information when you visit our website, book a service,
          or interact with us in any manner.
        </p>

        {/* Information We Collect */}
        <section className="mb-8">
          <h2 className="mb-2 text-2xl font-semibold text-gray-700">
            Information We Collect
          </h2>
          <ul className="pl-5 space-y-1 list-disc">
            <li>
              <strong>Personal Information:</strong> Name, phone number, email
              address, vehicle details, service booking information, and
              billing details.
            </li>
            <li>
              <strong>Technical Information:</strong> IP address, browser type,
              device information, and website usage data.
            </li>
          </ul>
        </section>

        {/* How We Use Information */}
        <section className="mb-8">
          <h2 className="mb-2 text-2xl font-semibold text-gray-700">
            How We Use Your Information
          </h2>
          <ul className="pl-5 space-y-1 list-disc">
            <li>To schedule and manage vehicle service appointments.</li>
            <li>To communicate service updates, reminders, and confirmations.</li>
            <li>
              To improve our service quality, website experience, and customer
              support.
            </li>
            <li>
              To send promotional messages or offers, only if you have opted in.
            </li>
          </ul>
        </section>

        {/* Information Sharing */}
        <section className="mb-8">
          <h2 className="mb-2 text-2xl font-semibold text-gray-700">
            Sharing of Information
          </h2>
          <ul className="pl-5 space-y-1 list-disc">
            <li>
              With <strong>Kia India Pvt. Ltd.</strong> and its authorized
              partners for service-related operations.
            </li>
            <li>
              With trusted third-party service providers who assist in website
              operations, customer communication, and analytics.
            </li>
            <li>
              When required by law or to protect our legal rights and safety.
            </li>
          </ul>
        </section>

        {/* Data Security */}
        <section className="mb-8">
          <h2 className="mb-2 text-2xl font-semibold text-gray-700">
            Data Security
          </h2>
          <p>
            We implement appropriate technical and organizational security
            measures to safeguard your personal information. While we strive to
            protect your data, no online transmission or storage system is
            completely secure.
          </p>
        </section>

        {/* User Rights */}
        <section className="mb-8">
          <h2 className="mb-2 text-2xl font-semibold text-gray-700">
            Your Rights & Choices
          </h2>
          <ul className="pl-5 space-y-1 list-disc">
            <li>Request access, correction, or update of your information.</li>
            <li>Opt out of promotional communications at any time.</li>
            <li>
              Request deletion of your data, subject to applicable legal and
              service requirements.
            </li>
          </ul>
        </section>

        {/* Policy Updates */}
        <section className="mb-8">
          <h2 className="mb-2 text-2xl font-semibold text-gray-700">
            Changes to This Privacy Policy
          </h2>
          <p>
            Landmark Kia Service Center may update this Privacy Policy from time
            to time. Any changes will be posted on this page, and we encourage
            you to review it periodically.
          </p>
        </section>

        {/* Contact */}
        <section>
          <h2 className="mb-2 text-2xl font-semibold text-gray-700">
            Contact Us
          </h2>
          <p>
            If you have any questions regarding this Privacy Policy or our data
            practices, please contact us at{" "}
            <strong>9100075700</strong>.
          </p>
        </section>

        <p className="mt-10 text-sm text-gray-500">
          Thank you for choosing Landmark Kia Service Center. Your trust and
          privacy matter to us.
        </p>
      </div>

      <Footer />
    </>
  );
}
