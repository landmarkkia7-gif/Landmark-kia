import React from "react";
import Navbar from "./Navbar";

export default function TermsConditions() {
  return (
    <><Navbar />
      <main className="max-w-5xl px-4 py-10 mx-auto mt-10 leading-relaxed text-gray-800">
        {/* Title */}
        <h1 className="mb-2 text-4xl font-bold text-center">Terms and Conditions</h1>
        <h2 className="mb-10 text-xl font-semibold text-center">
          Lakshmi Hyundai – Statement of Terms and Conditions
        </h2>

        {/* Introduction */}
        <section className="mb-10 space-y-4">
          <p>
            At <strong>Lakshmi Hyundai</strong>, we value your privacy and are committed
            to safeguarding your personal information. These Terms and Conditions
            outline how we collect, use, and protect your data, and how you may
            interact with our services.
          </p>
        </section>

        {/* Coverage */}
        <section className="mb-10 space-y-4">
          <h3 className="text-2xl font-semibold">1. Coverage of These Terms and Conditions</h3>
          <p>
            These Terms and Conditions apply to the treatment of personally
            identifiable information collected by Lakshmi Hyundai when you visit
            our website or use our services. This policy does not extend to the
            practices of companies that Lakshmi Hyundai does not own, control, or
            manage, nor to individuals not employed by Lakshmi Hyundai.
          </p>
        </section>

        {/* User Consent */}
        <section className="mb-10 space-y-4">
          <h3 className="text-2xl font-semibold">2. User Consent</h3>
          <p>
            By providing your contact details, you <strong>explicitly authorize</strong>
            Lakshmi Hyundai (operated by Lakshmi Motors Pvt. Ltd.) to contact you
            via phone calls, SMS, or emails regarding our products, services,
            offers, and promotions. This authorization overrides your
            registration on the National Customer Preference Register (NCPR).
          </p>
        </section>

        {/* Information Collection and Use */}
        <section className="mb-10 space-y-4">
          <h3 className="text-2xl font-semibold">3. Information Collection and Use</h3>
          <p>Lakshmi Hyundai may collect personally identifiable information when you:</p>
          <ul className="ml-4 space-y-1 list-disc list-inside">
            <li>Register for a Lakshmi Hyundai account</li>
            <li>Request information about our services, offers, or promotions</li>
            <li>Interact with us directly or via our business partners</li>
          </ul>
          <p>This information may include (but is not limited to):</p>
          <ul className="ml-4 space-y-1 list-disc list-inside">
            <li>Name and contact details</li>
            <li>Email address</li>
            <li>Date of birth and gender</li>
            <li>Occupation and industry</li>
            <li>Personal preferences and interests</li>
          </ul>
          <p>
            Once you register and sign in, you are no longer anonymous to us.
            Lakshmi Hyundai uses your data to:
          </p>
          <ul className="ml-4 space-y-1 list-disc list-inside">
            <li>Fulfill your requests for products and services</li>
            <li>Provide updates on offers, products, and services</li>
            <li>Enhance and personalize your user experience</li>
          </ul>
        </section>

        {/* Information Sharing and Disclosure */}
        <section className="mb-10 space-y-4">
          <h3 className="text-2xl font-semibold">4. Information Sharing and Disclosure</h3>
          <p>
            Lakshmi Hyundai <strong>does not sell or rent</strong> your personally
            identifiable information to third parties. We will only disclose your
            information when:
          </p>
          <ul className="ml-4 space-y-1 list-disc list-inside">
            <li>We have your explicit consent</li>
            <li>
              Sharing is necessary to provide the product or service you have
              requested
            </li>
            <li>We respond to legal obligations such as subpoenas or court orders</li>
            <li>
              Your actions violate the Lakshmi Hyundai Terms of Service or other
              usage guidelines
            </li>
          </ul>
        </section>

        {/* Security */}
        <section className="mb-10 space-y-4">
          <h3 className="text-2xl font-semibold">5. Security</h3>
          <p>
            Your Lakshmi Hyundai account information is protected by a password
            for your privacy and security. We implement adequate measures to
            secure access to your personal data and safeguard it against
            unauthorized access or misuse.
          </p>
        </section>

        {/* Changes to the Policy */}
        <section className="mb-10 space-y-4">
          <h3 className="text-2xl font-semibold">6. Changes to This Policy</h3>
          <p>
            Lakshmi Hyundai may update these Terms and Conditions from time to
            time. Significant changes will be communicated via a prominent notice
            on our website.
          </p>
        </section>

      </main></>
  );
}
