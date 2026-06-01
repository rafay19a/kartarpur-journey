import LegalPage, { LegalSection } from '../components/LegalPage'
import { CONTACT_EMAIL } from '../lib/contact'

export default function CookiePolicy() {
  return (
    <LegalPage eyebrow="Legal" title="Cookie Policy" updated="01 June 2026">
      <p className="text-slate-600 text-[17px] leading-[1.8] mb-10">
        This Cookie Policy explains how Kartarpur Journey uses cookies and similar technologies on
        our website. Cookies are small text files that are placed on your device when you visit a
        website. They allow the site to remember your actions and preferences over a period of
        time, so that you do not have to re-enter them every time you return.
      </p>

      <LegalSection title="Essential Cookies">
        <p>
          Essential cookies are necessary for the website to function correctly. They enable core
          features such as page navigation, secure form submission, and access to protected areas
          of the site, including our enquiry and booking pages. Without these cookies, the site
          cannot be served properly. Essential cookies do not store any information that
          personally identifies you and cannot be disabled.
        </p>
      </LegalSection>

      <LegalSection title="Analytics Cookies">
        <p>
          Analytics cookies help us understand how visitors interact with our website by collecting
          and reporting information anonymously — for example, which destination pages are most
          frequently viewed, how long visitors spend reading them, and which routes lead to a
          successful enquiry. These insights allow us to continually refine our content and ensure
          that the information our pilgrims need is easy to find.
        </p>
        <p>
          Analytics cookies do not track you across other websites, and the data they collect is
          aggregated and statistical in nature.
        </p>
      </LegalSection>

      <LegalSection title="User Experience Cookies">
        <p>
          User experience cookies allow the website to remember choices you make — such as your
          preferred currency, your most recently viewed packages, or whether you have already
          dismissed a notification banner — and to provide enhanced, more personal features. These
          cookies do not collect information that can be used to identify you outside of our
          website and are used solely to improve your visit.
        </p>
      </LegalSection>

      <LegalSection title="How to Disable Cookies">
        <p>
          You have full control over the cookies that are stored on your device. Every major
          browser allows you to view, manage, and delete cookies through its settings menu — most
          commonly under sections labelled “Privacy”, “Security”, or “Site Settings”. You can
          choose to block all cookies, accept only cookies from sites you trust, or be notified
          each time a cookie is offered. Detailed instructions for the most common browsers are
          available below:
        </p>
        <ul className="list-disc pl-6 space-y-1.5">
          <li>Google Chrome — Settings → Privacy and security → Cookies and other site data</li>
          <li>Mozilla Firefox — Settings → Privacy &amp; Security → Cookies and Site Data</li>
          <li>Apple Safari — Preferences → Privacy → Manage Website Data</li>
          <li>Microsoft Edge — Settings → Cookies and site permissions → Manage and delete cookies</li>
        </ul>
        <p>
          Please note that disabling essential cookies will prevent certain parts of our website
          from functioning correctly, including enquiry forms and booking pages. Disabling
          analytics or user experience cookies will not stop you from using the site, but may
          result in a less personalised experience.
        </p>
      </LegalSection>

      <LegalSection title="Contact Us">
        <p>
          If you have any question about our use of cookies or about this Cookie Policy, please
          write to {CONTACT_EMAIL}.
        </p>
      </LegalSection>
    </LegalPage>
  )
}
