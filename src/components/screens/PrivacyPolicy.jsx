import React from "react";
// import Navbar from "../Navbar";
// import { Footer } from "../../home";
import { Link } from "react-router-dom";

export default function PrivacyPolicy() {
  return (
    <>
      {/* <Navbar/> */}
      <nav className="fixed top-0 left-0 z-50 flex items-center justify-between w-full px-6 py-3 shadow-md md:px-12 lg:px-16 bg-white/30 backdrop-blur-lg">
        <Link to={"/"}>
          <img
            src={require("./../../images/logo.png")}
            className="h-12"
            alt="Hyundai Logo"
          />
        </Link>
        <a
          className="text-lg font-semibold text-gray-900"
          href="tel:+917997988851"
        >
          📞 7997988851
        </a>
      </nav>
      <div className="max-w-4xl px-6 py-12 mx-auto mt-10 text-gray-800">
        <h1 className="mb-6 text-4xl font-bold text-teal-700">Privacy Policy</h1>

        <p className="mb-6">
          At <strong>Lakshmih Hyundai</strong>, we value your privacy and are
          committed to protecting any personal information you share with us.
          This Privacy Policy outlines how we collect, use, disclose, and protect
          your information when you visit our website or interact with us in any way.
        </p>

        <section className="mb-8">
          <h2 className="mb-2 text-2xl font-semibold text-gray-700">Information We Collect</h2>
          <ul className="pl-5 space-y-1 list-disc">
            <li>
              <strong>Personal Information:</strong> Such as your name, contact details,
              address, and payment information if you make a purchase.
            </li>
            <li>
              <strong>Non-Personal Information:</strong> Such as your IP address, browser type,
              language preference, referring site, and other technical information.
            </li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="mb-2 text-2xl font-semibold text-gray-700">How We Use Your Information</h2>
          <ul className="pl-5 space-y-1 list-disc">
            <li>To provide and personalize our services, including processing transactions and appointments.</li>
            <li>To improve our website and services based on your feedback and usage patterns.</li>
            <li>To communicate with you regarding inquiries, appointments, or marketing communications (if opted in).</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="mb-2 text-2xl font-semibold text-gray-700">Sharing Your Information</h2>
          <ul className="pl-5 space-y-1 list-disc">
            <li>With service providers who assist in operating our website and business.</li>
            <li>With Hyundai Motor Company or its affiliates for vehicle-related operations.</li>
            <li>When required by law or to protect our rights and property.</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="mb-2 text-2xl font-semibold text-gray-700">Security of Your Information</h2>
          <p>
            We implement appropriate security measures to protect your personal information
            from unauthorized access or misuse. However, please note that no method of
            transmission or storage is 100% secure.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="mb-2 text-2xl font-semibold text-gray-700">Your Choices</h2>
          <ul className="pl-5 space-y-1 list-disc">
            <li>Review or update your personal information by contacting us.</li>
            <li>Opt out of marketing messages at any time.</li>
            <li>Request deletion of your information, subject to legal obligations.</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="mb-2 text-2xl font-semibold text-gray-700">Changes to This Policy</h2>
          <p>
            We may update this Privacy Policy periodically. We recommend reviewing this page
            occasionally to stay informed about how we protect your data.
          </p>
        </section>

        <section>
          <h2 className="mb-2 text-2xl font-semibold text-gray-700">Contact Us</h2>
          <p>
            If you have any questions or concerns about our Privacy Policy,
            feel free to contact us at <strong>7997988851</strong>.
          </p>
        </section>

        <p className="mt-10 text-sm text-gray-500">
          Thank you for trusting Lakshmih Hyundai. Your privacy is important to us.
        </p>
      </div> </>
  );
}
