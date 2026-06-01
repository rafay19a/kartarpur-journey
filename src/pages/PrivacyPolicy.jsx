import LegalPage, { LegalSection } from '../components/LegalPage'
import { CONTACT_EMAIL, WHATSAPP_DISPLAY } from '../lib/contact'

export default function PrivacyPolicy() {
  return (
    <LegalPage eyebrow="Legal" title="Privacy Policy" updated="01 June 2026">
      <p className="text-slate-600 text-[17px] leading-[1.8] mb-10">
        Kartarpur Journey (“we”, “our”, or “us”) is committed to protecting the privacy of the
        pilgrims and visitors who interact with our website and services. This Privacy Policy
        explains what information we collect, how we use it, and the choices you have over your
        personal data.
      </p>

      <LegalSection title="Information We Collect">
        <p>
          We collect only the information necessary to plan and deliver your pilgrimage. This
          typically includes your full name, country of residence, passport details where required
          for visa support, contact details (email and phone number), travel preferences, and any
          dietary or accessibility requirements you choose to share with us.
        </p>
        <p>
          We also automatically collect limited technical information when you visit our website —
          such as your browser type, device type, approximate location based on IP address, and the
          pages you view — in order to maintain site security and improve the user experience.
        </p>
      </LegalSection>

      <LegalSection title="Enquiry Forms">
        <p>
          When you submit an enquiry through any form on our website, the details you provide are
          transmitted securely to our enquiry management system and stored only for as long as is
          necessary to respond to your request and provide ongoing customer service. Enquiry data
          is never sold, shared with marketing networks, or used for purposes unrelated to your
          pilgrimage planning.
        </p>
      </LegalSection>

      <LegalSection title="WhatsApp Enquiries">
        <p>
          When you contact us through WhatsApp ({WHATSAPP_DISPLAY}), the conversation is governed
          by both this Privacy Policy and WhatsApp's own terms. Messages you send remain on our
          business device and are retained only for the period needed to deliver our service. We
          do not add WhatsApp contacts to broadcast lists or marketing groups without your explicit
          consent.
        </p>
      </LegalSection>

      <LegalSection title="Email Enquiries">
        <p>
          Emails sent to {CONTACT_EMAIL} are received and processed by our authorised team only.
          We do not use email correspondence for marketing purposes unless you have separately
          opted in to receive updates or newsletters.
        </p>
      </LegalSection>

      <LegalSection title="Cookies">
        <p>
          Our website uses a small number of cookies to keep the site functioning correctly and to
          help us understand how visitors use it. You can review and manage your cookie preferences
          at any time. A complete description of the cookies we use, and how to disable them, is
          provided in our Cookie Policy.
        </p>
      </LegalSection>

      <LegalSection title="Analytics">
        <p>
          We use privacy-respecting analytics to understand which pages are most useful to our
          visitors, identify navigation problems, and measure the effectiveness of our content.
          Analytics data is aggregated and does not identify individual users. We do not share
          analytics data with advertisers.
        </p>
      </LegalSection>

      <LegalSection title="Your Rights">
        <p>
          You have the right to request a copy of any personal data we hold about you, to ask us to
          correct inaccurate information, to request deletion of your data, and to object to or
          restrict certain forms of processing. To exercise any of these rights, simply email us at{' '}
          {CONTACT_EMAIL} and we will respond within a reasonable timeframe, typically no longer
          than thirty days.
        </p>
      </LegalSection>

      <LegalSection title="Data Protection">
        <p>
          We take the security of your information seriously. Personal data is stored on systems
          protected by industry-standard encryption, access controls, and authentication. Only
          authorised members of our team can access enquiry and booking data, and only to the
          extent necessary to deliver our services. We retain personal information only for as long
          as is needed to fulfil the purposes for which it was collected or to meet our legal and
          accounting obligations.
        </p>
      </LegalSection>

      <LegalSection title="Contact Us">
        <p>
          For any question about this Privacy Policy or how we handle your data, please write to{' '}
          {CONTACT_EMAIL}. We aim to respond to all privacy-related enquiries within five working
          days.
        </p>
      </LegalSection>
    </LegalPage>
  )
}
