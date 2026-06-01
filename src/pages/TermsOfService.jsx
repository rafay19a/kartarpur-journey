import LegalPage, { LegalSection } from '../components/LegalPage'
import { CONTACT_EMAIL } from '../lib/contact'

export default function TermsOfService() {
  return (
    <LegalPage eyebrow="Legal" title="Terms of Service" updated="01 June 2026">
      <p className="text-slate-600 text-[17px] leading-[1.8] mb-10">
        These Terms of Service govern your use of the Kartarpur Journey website and the travel
        services we provide. By making an enquiry, booking a package, or otherwise engaging with
        our services, you confirm that you have read, understood, and accepted the terms set out
        below.
      </p>

      <LegalSection title="Travel Package Information">
        <p>
          All pilgrimage packages advertised on this website are arranged in good faith and are
          subject to availability at the time of booking. Itineraries, departure dates, included
          components, and pricing are described as accurately as possible, but minor variations may
          occur due to circumstances beyond our control — including changes in border arrangements,
          access permissions at Gurdwaras, weather conditions, and decisions made by Pakistani or
          third-country authorities. Where any material change is required, we will communicate it
          to you promptly and offer reasonable alternatives.
        </p>
      </LegalSection>

      <LegalSection title="Booking Procedures">
        <p>
          A booking is confirmed only once we have acknowledged receipt of your enquiry, agreed the
          final itinerary and price with you, and received the required deposit. Until that point,
          any quotes or proposed arrangements are indicative only. We may request copies of
          passports and supporting documents in order to begin the visa or Kartarpur Corridor
          registration process; these documents are handled in accordance with our Privacy Policy.
        </p>
      </LegalSection>

      <LegalSection title="Group Departures">
        <p>
          Many of our packages operate as scheduled group departures with a minimum and maximum
          participant count. If the minimum group size is not reached, we reserve the right to
          re-schedule the departure or to offer participants a full refund of any monies already
          paid. Group members are expected to respect the itinerary, the pace of the group, and the
          dignity of fellow pilgrims and local communities at all times.
        </p>
      </LegalSection>

      <LegalSection title="Pricing">
        <p>
          All prices are quoted per person in the currency displayed and are valid only for the
          specific package, departure date, and group size to which they apply. Prices may change
          without notice for new enquiries, although a price confirmed in writing for a specific
          booking will be honoured. Unless explicitly stated, prices exclude international airfare,
          travel insurance, visa fees payable to government bodies, personal expenses, and
          gratuities.
        </p>
      </LegalSection>

      <LegalSection title="Liability Limitations">
        <p>
          Kartarpur Journey acts in good faith as a coordinator and facilitator of travel
          arrangements. We exercise reasonable care in selecting our hotels, transport providers,
          and local partners. However, we do not accept liability for loss, injury, illness, damage
          to property, delays, or inconvenience that arise from circumstances outside our direct
          control — including but not limited to acts of governments, border closures, force
          majeure events, the conduct of independent contractors, or personal decisions taken by
          pilgrims during free time.
        </p>
        <p>
          We strongly recommend that every pilgrim purchase comprehensive travel insurance covering
          medical care, repatriation, cancellation, and loss of personal belongings before
          departure.
        </p>
      </LegalSection>

      <LegalSection title="Cancellation Policy">
        <p>
          Cancellations made more than 60 days before the scheduled departure are eligible for a
          full refund of monies paid, less any non-recoverable third-party fees (such as visa
          processing, government corridor fees, or hotel deposits that have already been remitted).
          Cancellations made between 30 and 60 days prior to departure may incur a charge of up to
          50% of the total package price. Cancellations within 30 days of departure are generally
          non-refundable, although we will always make every reasonable effort to recover what we
          can on your behalf.
        </p>
        <p>
          In the unlikely event that we have to cancel a confirmed departure, you will receive a
          full refund or the option to transfer your booking to an alternative date.
        </p>
      </LegalSection>

      <LegalSection title="Travel Documentation Responsibility">
        <p>
          Each pilgrim is responsible for ensuring that their passport is valid for at least six
          months beyond the planned return date and that they obtain the correct visa or
          permissions for entry to Pakistan and, where applicable, for the Kartarpur Corridor. We
          will guide and support you through every step of the documentation process, but the
          ultimate responsibility for accurate and timely paperwork rests with the traveller. We
          cannot be held liable for losses arising from refused entry due to documentation that is
          incomplete, inaccurate, or submitted too late.
        </p>
      </LegalSection>

      <LegalSection title="Contact Us">
        <p>
          For any question regarding these Terms of Service, please write to {CONTACT_EMAIL}.
        </p>
      </LegalSection>
    </LegalPage>
  )
}
