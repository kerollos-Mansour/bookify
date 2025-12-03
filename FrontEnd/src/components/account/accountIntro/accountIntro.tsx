import { Mail } from "lucide-react";

type AccountIntroProps = {
  greeting: string;
  headline: string;
  subtext: string;
};

export default function AccountIntro({
  greeting,
  headline,
  subtext,
}: AccountIntroProps) {
  return (
    <section className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm">
      <div className="grid gap-6 md:grid-cols-[1.6fr_1fr] items-center">
        <div className="space-y-3">
          <p className="text-sm font-medium text-slate-500 uppercase tracking-wide">
            {greeting}
          </p>
          <h1 className="text-3xl sm:text-4xl font-semibold text-slate-900">
            {headline}
          </h1>
          <p className="text-slate-600 text-base sm:text-lg leading-relaxed">
            {subtext}
          </p>
        </div>

        <div className="border border-slate-200 rounded-2xl p-5 bg-slate-50/60">
          <div className="flex items-start gap-4">
            <span className="p-3 rounded-full bg-blue-600/10 text-blue-600">
              <Mail className="w-5 h-5" />
            </span>
            <div className="space-y-3">
              <div>
                <p className="text-base font-semibold text-slate-900">
                  Get trip inspiration and offers
                </p>
                <p className="text-sm text-slate-600">
                  Receive deals, tips, and insights from Expedia.
                </p>
              </div>
              <button className="px-5 py-2 bg-blue-600 text-white font-semibold rounded-full text-sm hover:bg-blue-500 transition-colors">
                Get emails
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
