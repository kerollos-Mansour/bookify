import PageTransition from "../../components/pageTransition/pageTransition";

export default function PrivacyPolicy() {
  return (
    <PageTransition>
      <div className="min-h-screen bg-background py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-foreground">
            Privacy Policy
          </h1>
          <p className="text-sm text-muted-foreground mb-8">
            Last updated: January 1, 2026
          </p>

          <div className="prose prose-lg dark:prose-invert max-w-none space-y-8">
            <section>
              <h2 className="text-2xl font-semibold mb-4 text-foreground">
                1. Information We Collect
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                We collect information you provide directly to us when you
                create an account, make a booking, or communicate with us. This
                includes your name, email address, phone number, payment
                information, and travel preferences.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-foreground">
                2. How We Use Your Information
              </h2>
              <ul className="space-y-2 text-muted-foreground">
                <li>• To process your bookings and reservations</li>
                <li>
                  • To communicate with you about your account and bookings
                </li>
                <li>• To improve our services and user experience</li>
                <li>• To send you promotional offers (with your consent)</li>
                <li>• To prevent fraud and ensure platform security</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-foreground">
                3. Information Sharing
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                We may share your information with:
              </p>
              <ul className="space-y-2 text-muted-foreground mt-3">
                <li>
                  • <strong>Property Owners:</strong> To facilitate your
                  bookings
                </li>
                <li>
                  • <strong>Service Providers:</strong> Payment processors,
                  customer support
                </li>
                <li>
                  • <strong>Legal Requirements:</strong> When required by law
                </li>
              </ul>
              <p className="text-muted-foreground leading-relaxed mt-3">
                We do NOT sell your personal data to third parties for marketing
                purposes.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-foreground">
                4. Data Security
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                We implement industry-standard security measures to protect your
                personal information, including:
              </p>
              <ul className="space-y-2 text-muted-foreground mt-3">
                <li>• SSL encryption for data transmission</li>
                <li>• Secure payment processing through trusted providers</li>
                <li>• Regular security audits and updates</li>
                <li>• Access controls and authentication</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-foreground">
                5. Your Rights
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                You have the right to:
              </p>
              <ul className="space-y-2 text-muted-foreground mt-3">
                <li>• Access your personal data</li>
                <li>• Correct inaccurate information</li>
                <li>• Request deletion of your data</li>
                <li>• Object to data processing</li>
                <li>• Data portability</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-foreground">
                6. Cookies and Tracking
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                We use cookies and similar tracking technologies to improve your
                browsing experience, analyze site traffic, and personalize
                content. You can manage cookie preferences in your browser
                settings. See our{" "}
                <a href="/cookies" className="text-blue-600 hover:underline">
                  Cookie Policy
                </a>{" "}
                for more details.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-foreground">
                7. Changes to This Policy
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                We may update this privacy policy from time to time. We will
                notify you of any changes by posting the new policy on this page
                and updating the "Last updated" date.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-foreground">
                8. Contact Us
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                If you have any questions about this Privacy Policy, please
                contact us at:
              </p>
              <div className="mt-3 p-4 bg-card rounded-lg border border-card-border">
                <p className="text-foreground">Email: privacy@bookify.com</p>
                <p className="text-foreground">Phone: +20 123 456 7890</p>
              </div>
            </section>
          </div>
        </div>
      </div>
    </PageTransition>
  );
}
