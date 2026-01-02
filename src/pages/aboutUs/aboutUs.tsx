import PageTransition from "../../components/pageTransition/pageTransition";
import {
  Globe,
  Building,
  Wallet,
  ShieldCheck,
  Star,
  Headphones,
} from "lucide-react";

export default function AboutUs() {
  return (
    <PageTransition>
      <div className="min-h-screen bg-background py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold mb-8 text-foreground">
            About Bookify
          </h1>

          <div className="prose prose-lg dark:prose-invert max-w-none">
            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4 text-foreground">
                Our Story
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                Founded in 2025, Bookify has been on a mission to make travel
                booking simpler, faster, and more accessible for everyone. We
                believe that discovering and booking the perfect accommodation
                should be an exciting part of your travel journey, not a
                headache.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4 text-foreground">
                What We Offer
              </h2>
              <ul className="space-y-4 text-muted-foreground">
                <li className="flex items-start gap-3">
                  <div className="p-2 bg-blue-100 dark:bg-blue-900/20 rounded-lg shrink-0">
                    <Globe className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div>
                    <strong className="text-foreground">Global Reach:</strong>{" "}
                    Access to millions of properties worldwide
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="p-2 bg-purple-100 dark:bg-purple-900/20 rounded-lg shrink-0">
                    <Building className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                  </div>
                  <div>
                    <strong className="text-foreground">
                      Diverse Options:
                    </strong>{" "}
                    From budget hostels to luxury hotels and unique stays
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="p-2 bg-green-100 dark:bg-green-900/20 rounded-lg shrink-0">
                    <Wallet className="w-5 h-5 text-green-600 dark:text-green-400" />
                  </div>
                  <div>
                    <strong className="text-foreground">Best Prices:</strong>{" "}
                    Competitive rates and exclusive deals
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="p-2 bg-orange-100 dark:bg-orange-900/20 rounded-lg shrink-0">
                    <ShieldCheck className="w-5 h-5 text-orange-600 dark:text-orange-400" />
                  </div>
                  <div>
                    <strong className="text-foreground">Secure Booking:</strong>{" "}
                    Safe and encrypted payment processing
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="p-2 bg-yellow-100 dark:bg-yellow-900/20 rounded-lg shrink-0">
                    <Star className="w-5 h-5 text-yellow-600 dark:text-yellow-400" />
                  </div>
                  <div>
                    <strong className="text-foreground">
                      Verified Reviews:
                    </strong>{" "}
                    Real feedback from real travelers
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="p-2 bg-red-100 dark:bg-red-900/20 rounded-lg shrink-0">
                    <Headphones className="w-5 h-5 text-red-600 dark:text-red-400" />
                  </div>
                  <div>
                    <strong className="text-foreground">24/7 Support:</strong>{" "}
                    Customer service whenever you need it
                  </div>
                </li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4 text-foreground">
                Our Mission
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                We're dedicated to connecting travelers with their perfect
                accommodations while supporting local businesses and communities
                around the world. Our platform empowers property owners to reach
                a global audience and helps travelers discover unique places to
                stay.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4 text-foreground">
                Our Values
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-card p-6 rounded-lg border border-card-border">
                  <h3 className="font-semibold text-lg mb-2 text-foreground">
                    Transparency
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    No hidden fees, clear pricing, and honest reviews.
                  </p>
                </div>
                <div className="bg-card p-6 rounded-lg border border-card-border">
                  <h3 className="font-semibold text-lg mb-2 text-foreground">
                    Innovation
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Constantly improving our platform with the latest
                    technology.
                  </p>
                </div>
                <div className="bg-card p-6 rounded-lg border border-card-border">
                  <h3 className="font-semibold text-lg mb-2 text-foreground">
                    Community
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Building connections between travelers and hosts worldwide.
                  </p>
                </div>
                <div className="bg-card p-6 rounded-lg border border-card-border">
                  <h3 className="font-semibold text-lg mb-2 text-foreground">
                    Sustainability
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Promoting eco-friendly travel and responsible tourism.
                  </p>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </PageTransition>
  );
}
