import type { Metadata } from "next"
import { LegalPage } from "@/components/LegalPage"

export const metadata: Metadata = { title: "Cookie Policy" }

export default function CookiePolicyPage() {
  return (
    <LegalPage title="Cookie Policy" lastUpdated="1 May 2026" currentPage="cookie-policy">

      <p>
        This Cookie Policy explains how Karagateway OÜ ("Karagateway", "we", "us") uses cookies and similar
        technologies on our website. It should be read together with our{" "}
        <a href="/privacy-policy">Privacy Policy</a>.
      </p>

      <h2>1. What are cookies?</h2>
      <p>
        Cookies are small text files placed on your device when you visit a website. They are widely used to
        make websites work, to improve performance, and to provide information to site owners. Similar
        technologies (such as local storage and pixels) work in comparable ways. In this policy, we refer to
        all of these as "cookies".
      </p>

      <h2>2. The types of cookies we use</h2>
      <p>
        <strong>Essential cookies (always active).</strong> These are necessary for the website to function —
        for example, to enable basic navigation, security, and to remember your cookie preferences. The website
        cannot work properly without them, so they do not require your consent.
      </p>
      <p>
        <strong>Analytics cookies (consent required).</strong> With your consent, we use analytics cookies to
        understand how visitors find and use our website — such as which pages are visited and how the site
        performs. This helps us improve the site. These cookies are only set if you choose to enable them, and
        you can withdraw your consent at any time.
      </p>
      <p>
        We do not use cookies to sell your data, and we do not use intrusive advertising or third-party
        tracking cookies. If this changes in future, we will update this policy and our consent options
        accordingly.
      </p>

      <h2>3. Managing your cookie preferences</h2>
      <p>
        When you first visit our website, you can choose to accept all cookies, reject non-essential cookies,
        or manage your preferences. You can change your choice at any time through our{" "}
        <strong>cookie settings</strong> (accessible from the footer of any page) or by adjusting your browser
        settings to refuse or delete cookies. Please note that disabling certain cookies may affect how the
        website functions.
      </p>
      <p>
        Most browsers also let you control cookies through their settings. To find out more, visit your
        browser's help pages.
      </p>

      <h2>4. Cookies set by third parties</h2>
      <p>
        Some cookies may be set by third-party services we use (for example, an analytics provider), and only
        where you have consented. These third parties process data in accordance with their own privacy and
        cookie policies. We encourage you to review them.
      </p>

      <h2>5. Changes to this policy</h2>
      <p>
        We may update this Cookie Policy from time to time to reflect changes in the cookies we use or in
        legal requirements. The current version, with its "last updated" date, is always available on our
        website.
      </p>

      <h2>6. Contact us</h2>
      <p>If you have any questions about our use of cookies, please contact:</p>
      <p>
        <strong>Karagateway OÜ</strong><br />
        Ehitajate tee 60-11<br />
        Email: <a href="mailto:info@karagateway.com">info@karagateway.com</a>
      </p>

      <hr />
      <p>
        <em>
          This Cookie Policy is provided for general information and transparency. It should be reviewed by a
          qualified legal or data-protection adviser before publication, and updated to list the specific
          cookies actually used once your analytics and other tools are finalised.
        </em>
      </p>
    </LegalPage>
  )
}
