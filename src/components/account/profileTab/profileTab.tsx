import { Edit2 } from "lucide-react";

const profileSections = [
  {
    title: "Basic information",
    description:
      "Make sure this information matches your travel ID, like your passport or license.",
    fields: [
      { label: "Name", value: "Mohamed Sabry" },
      { label: "Bio", value: "Not provided" },
      { label: "Date of birth", value: "Not provided" },
      { label: "Gender", value: "Not provided" },
      { label: "Accessibility needs", value: "Not provided" },
    ],
  },
  {
    title: "Contact",
    description:
      "You can sign in, receive account activity alerts, and get trip updates by sharing this information.",
    fields: [
      { label: "Mobile number", value: "Not provided" },
      { label: "Emergency contact", value: "Not provided" },
      { label: "Email", value: "emailll@gmail.com" },
      { label: "Address", value: "Not provided" },
    ],
  },
];

const quickLinks = [
  "Airport security",
  "Travel documents",
  "Flight preferences",
  "Reward programs",
];

export default function ProfileTab() {
  return (
    <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm space-y-8">
      {profileSections.map((section) => (
        <article key={section.title} className="border border-slate-100 rounded-2xl p-5 sm:p-6">
          <header className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4 sm:justify-between">
            <div>
              <p className="text-xl font-semibold text-slate-900">
                {section.title}
              </p>
              <p className="text-sm text-slate-500">{section.description}</p>
            </div>
            <button className="inline-flex items-center gap-2 text-blue-600 font-semibold text-sm hover:text-blue-500">
              <Edit2 className="w-4 h-4" />
              Edit
            </button>
          </header>

          <dl className="mt-6 grid gap-6 sm:grid-cols-2">
            {section.fields.map((field) => (
              <div key={field.label}>
                <dt className="text-sm uppercase tracking-wide text-slate-400 font-semibold">
                  {field.label}
                </dt>
                <dd className="text-base text-slate-900">{field.value}</dd>
              </div>
            ))}
          </dl>
        </article>
      ))}

      <article className="grid gap-5 lg:grid-cols-2 border border-slate-100 rounded-2xl p-5 sm:p-6">
        <section className="space-y-4">
          <header>
            <p className="text-xl font-semibold text-slate-900">More details</p>
            <p className="text-sm text-slate-500">
              Speed up your booking by securely saving essential travel details.
            </p>
          </header>
          <div className="space-y-3">
            {quickLinks.map((item) => (
              <button
                key={item}
                className="w-full flex items-center justify-between rounded-2xl border border-slate-200 px-4 py-3 text-left text-sm font-semibold text-slate-700 hover:border-blue-200 hover:text-blue-600 transition-colors"
              >
                {item}
                <span aria-hidden className="text-slate-400">
                  &rsaquo;
                </span>
              </button>
            ))}
          </div>
        </section>

        <section className="space-y-4 border-t pt-5 lg:border-t-0 lg:pt-0 lg:pl-6">
          <header className="flex items-start justify-between gap-4">
            <div>
              <p className="text-xl font-semibold text-slate-900">
                Additional travelers
              </p>
              <p className="text-sm text-slate-500">
                Make booking a breeze by saving profiles of family, friends, or
                teammates who often travel with you.
              </p>
            </div>
          </header>
          <button className="w-full rounded-full border border-blue-200 text-blue-600 font-semibold py-3 hover:bg-blue-50 transition-colors">
            Add additional traveler
          </button>
        </section>
      </article>
    </div>
  );
}


