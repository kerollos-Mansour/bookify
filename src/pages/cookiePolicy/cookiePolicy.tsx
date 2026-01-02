import PageTransition from "../../components/pageTransition/pageTransition";

export default function CookiePolicy() {
  return (
    <PageTransition>
      <div className="min-h-screen bg-background py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-foreground">
            Cookie Policy
          </h1>
          <p className="text-sm text-muted-foreground mb-8">
            Last updated: January 1, 2026
          </p>

          <div className="prose prose-lg dark:prose-invert max-w-none space-y-8">
            <section>
              <h2 className="text-2xl font-semibold mb-4 text-foreground">
                What Are Cookies?
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                Cookies are small text files that are placed on your device when
                you visit our website. They help us provide you with a better
                experience by remembering your preferences and understanding how
                you use our site.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-foreground">
                How We Use Cookies
              </h2>

              <div className="space-y-6">
                <div className="bg-card p-6 rounded-lg border border-card-border">
                  <h3 className="font-semibold text-lg mb-2 text-foreground">
                    Essential Cookies
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    These cookies are necessary for the website to function
                    properly. They enable core functionality such as security,
                    network management, and accessibility.
                  </p>
                  <p className="text-xs text-muted-foreground mt-2">
                    Example: Authentication tokens, session management
                  </p>
                </div>

                <div className="bg-card p-6 rounded-lg border border-card-border">
                  <h3 className="font-semibold text-lg mb-2 text-foreground">
                    Analytics Cookies
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    These cookies help us understand how visitors interact with
                    our website by collecting and reporting information
                    anonymously.
                  </p>
                  <p className="text-xs text-muted-foreground mt-2">
                    Example: Google Analytics, page views, bounce rates
                  </p>
                </div>

                <div className="bg-card p-6 rounded-lg border border-card-border">
                  <h3 className="font-semibold text-lg mb-2 text-foreground">
                    Functional Cookies
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    These cookies enable enhanced functionality and
                    personalization, such as remembering your preferences and
                    settings.
                  </p>
                  <p className="text-xs text-muted-foreground mt-2">
                    Example: Language preference, currency selection, dark mode
                  </p>
                </div>

                <div className="bg-card p-6 rounded-lg border border-card-border">
                  <h3 className="font-semibold text-lg mb-2 text-foreground">
                    Advertising Cookies
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    These cookies are used to deliver relevant advertisements
                    and track ad campaign performance.
                  </p>
                  <p className="text-xs text-muted-foreground mt-2">
                    Example: Retargeting ads, conversion tracking
                  </p>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-foreground">
                Managing Cookies
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                Most web browsers allow you to control cookies through their
                settings. You can:
              </p>
              <ul className="space-y-2 text-muted-foreground mt-3">
                <li>• Delete all cookies from your browser</li>
                <li>• Block all cookies</li>
                <li>• Allow cookies only from specific websites</li>
                <li>• Be notified when a cookie is set</li>
              </ul>
              <p className="text-sm text-muted-foreground mt-4 p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg border border-yellow-200 dark:border-yellow-800">
                ⚠️ <strong>Note:</strong> Blocking or deleting cookies may
                impact your ability to use certain features of our website, such
                as staying logged in or saving preferences.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-foreground">
                Third-Party Cookies
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                Some cookies on our site are set by third-party services we use,
                such as:
              </p>
              <ul className="space-y-2 text-muted-foreground mt-3">
                <li>• Google Analytics (analytics)</li>
                <li>• Stripe (payment processing)</li>
                <li>• Social media platforms (sharing buttons)</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-foreground">
                Updates to This Policy
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                We may update our Cookie Policy periodically to reflect changes
                in technology or legal requirements. Please check this page
                regularly for the latest information.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-foreground">
                Questions?
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                If you have questions about how we use cookies, please contact
                us at cookies@bookify.com or visit our{" "}
                <a href="/contact-us" className="text-blue-600 hover:underline">
                  Contact Us
                </a>{" "}
                page.
              </p>
            </section>
          </div>
        </div>
      </div>
    </PageTransition>
  );
}
