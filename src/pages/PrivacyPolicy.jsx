import SEO from '../components/SEO'

function PrivacyPolicy() {
const lastUpdated = 'October 5, 2026'

return (
<> <SEO
     title="Privacy Policy"
     description="Learn how UniStack handles information, browser storage, notifications, hosting, and advertising technologies."
   />


  <main className="min-h-screen bg-white px-4 py-12 text-gray-800 dark:bg-gray-950 dark:text-gray-200 sm:px-6 lg:px-8">
    <article className="mx-auto max-w-3xl">
      <header className="mb-10">
        <p className="mb-3 text-sm font-medium text-pink-600">
          UniStack
        </p>

        <h1 className="mb-4 text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
          Privacy Policy
        </h1>

        <p className="text-sm text-gray-500 dark:text-gray-400">
          Last updated: {lastUpdated}
        </p>

        <p className="mt-5 leading-7 text-gray-600 dark:text-gray-300">
          Your privacy matters to us. This Privacy Policy explains how
          UniStack handles information when you visit our website and use
          our academic and study tools.
        </p>
      </header>

      <div className="space-y-8 leading-7">
        <section>
          <h2 className="mb-3 text-xl font-semibold text-gray-900 dark:text-white">
            1. About UniStack
          </h2>

          <p>
            UniStack is a student-focused website that provides free
            academic and productivity tools, including CGPA and GPA
            calculators, a grade calculator, academic planners, exam
            tools, and study timers.
          </p>

          <p className="mt-3">
            This website is available at{' '}
            <a
              href="https://uni-stack-pink.vercel.app/"
              className="text-pink-600 underline underline-offset-4"
            >
              https://uni-stack-pink.vercel.app/
            </a>
            .
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-xl font-semibold text-gray-900 dark:text-white">
            2. Information We Collect
          </h2>

          <p>
            UniStack does not currently require you to create an account,
            and it does not operate its own user account system or
            application database.
          </p>

          <p className="mt-3">
            Information you enter into our tools, such as grades, credit
            units, study schedules, or exam dates, may be processed in
            your browser to provide the requested results.
          </p>

          <p className="mt-3">
            We do not intentionally ask you to provide sensitive personal
            information to use our academic tools. Please avoid entering
            sensitive information into the website.
          </p>

          <p className="mt-3">
            Our hosting provider and any third-party services used on the
            website may process technical information, such as your IP
            address, browser information, device information, requested
            pages, and server logs, as necessary to deliver, maintain, and
            protect the website.
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-xl font-semibold text-gray-900 dark:text-white">
            3. Local Storage and Browser Data
          </h2>

          <p>
            Some UniStack tools use your browser's local storage to
            remember information or settings between visits. Depending
            on the tool, this may include saved calculator data, grading
            preferences, or other tool settings.
          </p>

          <p className="mt-3">
            This information is generally stored in your own browser
            rather than in a UniStack account or database. It may remain
            on your device after you leave the website.
          </p>

          <p className="mt-3">
            You can remove locally stored website data through your
            browser's settings. Clearing this data may erase saved
            information and preferences from UniStack tools.
          </p>

          <p className="mt-3">
            If you use a different browser or device, your locally saved
            data may not be available there.
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-xl font-semibold text-gray-900 dark:text-white">
            4. Cookies and Similar Technologies
          </h2>

          <p>
            Cookies are small files that websites and third-party
            services may store in your browser. They can be used for
            functions such as remembering preferences, maintaining
            security, measuring website performance, and delivering
            advertising.
          </p>

          <p className="mt-3">
            UniStack may use cookies or similar technologies through its
            hosting infrastructure or third-party services. If advertising
            or analytics services are added, those services may also use
            their own cookies or identifiers, as described in this policy
            and any applicable notices.
          </p>

          <p className="mt-3">
            You can manage or delete cookies through your browser
            settings. Blocking certain cookies may affect how some
            third-party features work.
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-xl font-semibold text-gray-900 dark:text-white">
            5. Browser Notifications
          </h2>

          <p>
            The UniStack Pomodoro Timer may request permission to send
            browser notifications to alert you when a focus or break
            session finishes.
          </p>

          <p className="mt-3">
            Notifications are controlled through your browser and device
            settings. You can deny or revoke notification permission at
            any time. Notification availability depends on your browser,
            device, and whether the website is open or running in a
            supported context.
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-xl font-semibold text-gray-900 dark:text-white">
            6. Hosting and Third-Party Services
          </h2>

          <p>
            UniStack is hosted using Vercel. When you visit the website,
            Vercel may process technical information needed to deliver
            pages, maintain service reliability, prevent abuse, and
            protect its infrastructure.
          </p>

          <p className="mt-3">
            We also use Google Search Console to monitor website indexing
            and search performance. Search Console is a website management
            service; it does not, by itself, mean that UniStack currently
            displays Google advertisements.
          </p>

          <p className="mt-3">
            These providers process information according to their own
            policies and applicable terms. You can review their privacy
            information here:
          </p>

          <ul className="mt-3 list-disc space-y-2 pl-6">
            <li>
              <a
                href="https://vercel.com/legal/privacy-policy"
                target="_blank"
                rel="noreferrer"
                className="text-pink-600 underline underline-offset-4"
              >
                Vercel Privacy Policy
              </a>
            </li>

            <li>
              <a
                href="https://policies.google.com/privacy"
                target="_blank"
                rel="noreferrer"
                className="text-pink-600 underline underline-offset-4"
              >
                Google Privacy Policy
              </a>
            </li>
          </ul>
        </section>

        <section>
          <h2 className="mb-3 text-xl font-semibold text-gray-900 dark:text-white">
            7. Advertising and Google AdSense
          </h2>

          <p>
            UniStack may apply to use Google AdSense or other advertising
            services to support the operation and maintenance of this
            free website. If advertising is introduced, this section
            describes the technologies that may be used.
          </p>

          <p className="mt-3">
            Third-party vendors, including Google, may use cookies,
            web beacons, IP addresses, or similar identifiers to serve
            advertisements, measure advertising performance, prevent
            fraud, and, where enabled and permitted, personalize ads
            based on a user's visits to this website or other websites.
          </p>

          <p className="mt-3">
            Google's advertising cookies may allow Google and its partners
            to show advertisements based on previous visits to this or
            other websites. The technologies used and information
            processed will depend on the advertising services configured
            and the user's settings.
          </p>

          <p className="mt-3">
            You can learn more about how Google uses information from
            websites that use its services here:
          </p>

          <p className="mt-2">
            <a
              href="https://policies.google.com/technologies/partner-sites"
              target="_blank"
              rel="noreferrer"
              className="text-pink-600 underline underline-offset-4"
            >
              How Google uses information from sites or apps that use its
              services
            </a>
          </p>

          <p className="mt-3">
            You can manage Google's personalized advertising settings
            here:
          </p>

          <p className="mt-2">
            <a
              href="https://adssettings.google.com/"
              target="_blank"
              rel="noreferrer"
              className="text-pink-600 underline underline-offset-4"
            >
              Google Ads Settings
            </a>
          </p>

          <p className="mt-3">
            You can also learn about additional advertising choices at{' '}
            <a
              href="https://www.aboutads.info/choices/"
              target="_blank"
              rel="noreferrer"
              className="text-pink-600 underline underline-offset-4"
            >
              YourAdChoices
            </a>
            .
          </p>

          <p className="mt-3">
            If other advertising providers are used, we will provide
            additional disclosures or links where required.
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-xl font-semibold text-gray-900 dark:text-white">
            8. How Information May Be Used
          </h2>

          <p>Information processed through the website may be used to:</p>

          <ul className="mt-3 list-disc space-y-2 pl-6">
            <li>Provide and operate UniStack's academic tools.</li>
            <li>Remember tool data or preferences in your browser.</li>
            <li>Maintain website security and prevent abuse.</li>
            <li>Understand search visibility and website performance.</li>
            <li>Deliver and measure advertisements if advertising is enabled.</li>
            <li>Meet legal obligations and enforce applicable policies.</li>
          </ul>
        </section>

        <section>
          <h2 className="mb-3 text-xl font-semibold text-gray-900 dark:text-white">
            9. Sharing of Information
          </h2>

          <p>
            UniStack does not sell personal information that you submit
            directly to us. However, third-party providers may process
            technical information when their services are used on the
            website, as described in this policy.
          </p>

          <p className="mt-3">
            Information may also be disclosed where reasonably necessary
            to comply with applicable law, respond to lawful requests, or
            protect the security and rights of users and the website.
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-xl font-semibold text-gray-900 dark:text-white">
            10. Data Retention and Security
          </h2>

          <p>
            Information saved by UniStack tools in local storage generally
            remains in your browser until you delete it or your browser
            removes it. Technical information handled by third-party
            providers is retained according to their own policies and
            operational requirements.
          </p>

          <p className="mt-3">
            We take reasonable steps to operate the website responsibly.
            However, no website, browser, or method of electronic
            transmission can be guaranteed to be completely secure.
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-xl font-semibold text-gray-900 dark:text-white">
            11. Children's Privacy
          </h2>

          <p>
            UniStack is intended for a general audience of students and
            other people who find its academic tools useful. It is not
            designed specifically to collect personal information from
            children.
          </p>

          <p className="mt-3">
            If you believe a child has provided personal information
            through a feature that collects it, please contact us so the
            matter can be reviewed.
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-xl font-semibold text-gray-900 dark:text-white">
            12. Your Choices and Privacy Rights
          </h2>

          <p>
            Depending on your location and applicable law, you may have
            rights to request access to, correction of, deletion of, or
            information about certain personal data processed about you.
            You may also have choices regarding cookies, notifications,
            and personalized advertising.
          </p>

          <p className="mt-3">
            You can manage browser storage, cookies, and notification
            permissions through your browser or device settings. You can
            manage Google's personalized advertising through Google Ads
            Settings.
          </p>

          <p className="mt-3">
            Where applicable, you may contact us using the contact
            information provided on the UniStack website to ask a
            privacy-related question or make a request.
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-xl font-semibold text-gray-900 dark:text-white">
            13. Changes to This Policy
          </h2>

          <p>
            We may update this Privacy Policy when UniStack's features,
            third-party services, advertising arrangements, or legal
            requirements change. The updated version will be published
            on this page with a revised "Last updated" date.
          </p>

          <p className="mt-3">
            We encourage you to review this page periodically.
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-xl font-semibold text-gray-900 dark:text-white">
            14. Contact
          </h2>

          <p>
            If you have questions or concerns about this Privacy Policy
            or UniStack's privacy practices, please use the contact
            information made available on our website.
          </p>

          <p className="mt-3">
            We will update this section with a dedicated contact email
            when one is available.
          </p>
        </section>
      </div>
    </article>
  </main>
</>


)
}

export default PrivacyPolicy
