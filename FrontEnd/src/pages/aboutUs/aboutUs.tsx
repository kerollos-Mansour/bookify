import {
  FaGlobe,
  FaHeart,
  FaShieldAlt,
  FaUsers,
  FaStar,
  FaAward,
} from "react-icons/fa";
import { useTheme } from "../../context/themeContext";
import { IconType } from "react-icons";

interface Stat {
  icon: IconType;
  value: string;
  label: string;
}

interface Value {
  icon: IconType;
  title: string;
  description: string;
}

export default function AboutUs() {
  const { theme } = useTheme();

  const stats: Stat[] = [
    { icon: FaGlobe, value: "150+", label: "Countries" },
    { icon: FaUsers, value: "2M+", label: "Happy Travelers" },
    { icon: FaAward, value: "50K+", label: "Partner Hotels" },
    { icon: FaStar, value: "4.8/5", label: "Average Rating" },
  ];

  const values: Value[] = [
    {
      icon: FaShieldAlt,
      title: "Trust & Safety",
      description:
        "Your security is our priority. We verify all properties and provide secure booking with 24/7 customer support.",
    },
    {
      icon: FaHeart,
      title: "Customer First",
      description:
        "We're dedicated to making your travel dreams come true with personalized service and unbeatable deals.",
    },
    {
      icon: FaGlobe,
      title: "Global Reach",
      description:
        "Access accommodations worldwide, from bustling cities to remote paradises, all in one platform.",
    },
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300">
      {/* Hero Section */}
      <section className="bg-alternate pt-20 pb-16 px-4 md:px-8 border-b border-card-border dark:border-transparent">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-6">
            About Bookify
          </h1>
          <p className="text-lg text-slate-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed font-medium">
            We're on a mission to make travel accessible, affordable, and
            unforgettable for everyone. Since our founding, we've helped
            millions of travelers find their perfect home away from home.
          </p>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-4 md:px-8 bg-white dark:bg-gray-900">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="text-center p-6 rounded-lg bg-alternate border border-card-border dark:border-gray-700 hover:shadow-lg transition-all"
              >
                <stat.icon className="text-blue-500 dark:text-blue-400 mx-auto mb-4" size={40} />
                <h3 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">
                  {stat.value}
                </h3>
                <p className="text-slate-600 dark:text-gray-400 font-medium">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-16 px-4 md:px-8 bg-alternate">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-6">
                Our Story
              </h2>
              <div className="space-y-4 text-slate-600 dark:text-gray-300 leading-relaxed font-medium">
                <p>
                  Founded in 2015, Bookify started with a simple idea: finding
                  the perfect place to stay shouldn't be complicated or
                  expensive. What began as a small startup has grown into a
                  global platform trusted by millions.
                </p>
                <p>
                  Today, we partner with over 50,000 properties worldwide,
                  from boutique hotels to luxury resorts, vacation rentals to
                  unique stays. Our technology makes it easy to compare
                  options, read genuine reviews, and book with confidence.
                </p>
                <p>
                  But we're more than just a booking platform. We're travel
                  enthusiasts who believe that where you stay can transform
                  your entire journey. That's why we're committed to helping
                  you find not just a room, but the right experience.
                </p>
              </div>
            </div>
            <div className="relative">
              <div className="aspect-square rounded-lg bg-gradient-to-br from-blue-500 to-blue-700 shadow-2xl overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center">
                  <img
                    src={theme === "dark" ? "/white-logo.png" : "/full-logo.png"}
                    alt="Bookify"
                    className="h-32 w-auto object-contain opacity-20"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 px-4 md:px-8 bg-white dark:bg-gray-900">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-12 text-center">
            Our Values
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <div
                key={index}
                className="p-8 rounded-lg bg-alternate border border-card-border dark:border-gray-700 hover:shadow-lg transition-all"
              >
                <div className="w-14 h-14 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center mb-6">
                  <value.icon className="text-blue-600 dark:text-blue-400" size={24} />
                </div>
                <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-4">
                  {value.title}
                </h3>
                <p className="text-slate-600 dark:text-gray-400 leading-relaxed font-medium">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 md:px-8 bg-alternate border-t border-card-border dark:border-transparent">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-6">
            Join Millions of Happy Travelers
          </h2>
          <p className="text-slate-600 dark:text-gray-300 mb-8 text-lg font-medium">
            Start your journey with Bookify today and discover your perfect
            stay anywhere in the world.
          </p>
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg font-semibold transition-all shadow-lg hover:shadow-blue-500/20 text-lg">
            Start Exploring
          </button>
        </div>
      </section>
    </div>
  );
}