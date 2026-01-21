import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Calendar",
  description:
    "Stay updated with SABMA events, appraisals, shows, and seminars throughout the year.",
};

const events = [
  {
    id: 1,
    title: "Annual Appraisal Day - Gauteng",
    date: "2026-03-15",
    time: "09:00",
    location: "Pretoria, Gauteng",
    type: "Appraisal",
    description:
      "Annual breed appraisal for registered dogs. Bring your documentation and registration papers.",
  },
  {
    id: 2,
    title: "SABMA Members Meeting",
    date: "2026-04-20",
    time: "14:00",
    location: "Online / Virtual",
    type: "Meeting",
    description:
      "Quarterly members meeting to discuss breed standards, upcoming events, and association matters.",
  },
  {
    id: 3,
    title: "Black Mastiff Breed Seminar",
    date: "2026-05-10",
    time: "10:00",
    location: "Bloemfontein, Free State",
    type: "Seminar",
    description:
      "Educational seminar covering breeding practices, health management, and breed preservation.",
  },
  {
    id: 4,
    title: "Annual Appraisal Day - KZN",
    date: "2026-06-22",
    time: "09:00",
    location: "Durban, KwaZulu-Natal",
    type: "Appraisal",
    description:
      "Regional appraisal day for members in the KwaZulu-Natal region.",
  },
];

const eventTypeColors: Record<string, string> = {
  Appraisal: "bg-bronze-100 text-bronze-700",
  Meeting: "bg-blue-100 text-blue-700",
  Seminar: "bg-green-100 text-green-700",
  Show: "bg-purple-100 text-purple-700",
};

function formatDate(dateString: string) {
  const date = new Date(dateString);
  return {
    day: date.getDate(),
    month: date.toLocaleString("en-ZA", { month: "short" }).toUpperCase(),
    year: date.getFullYear(),
    full: date.toLocaleDateString("en-ZA", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    }),
  };
}

export default function CalendarPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative py-24 lg:py-32 bg-espresso overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-espresso via-espresso-100 to-espresso" />
        <div className="absolute top-20 right-20 w-96 h-96 bg-bronze-400/10 rounded-full blur-3xl" />
        <div className="absolute bottom-10 left-10 w-64 h-64 bg-bronze-500/5 rounded-full blur-2xl" />

        <div className="container-custom relative">
          <div className="max-w-3xl">
            <span className="inline-block text-bronze-400 font-semibold tracking-wider uppercase text-sm mb-4">
              Events
            </span>
            <h1 className="font-display text-4xl lg:text-5xl xl:text-6xl font-bold text-ivory-100 mb-6">
              Calendar
            </h1>
            <p className="text-xl text-ivory-400 leading-relaxed">
              Stay updated with SABMA events, appraisals, shows, and seminars
              throughout the year.
            </p>
          </div>
        </div>
      </section>

      {/* Events List */}
      <section className="section-padding bg-ivory">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <h2 className="font-display text-2xl font-bold text-espresso mb-8">
              Upcoming Events
            </h2>

            <div className="space-y-6">
              {events.map((event) => {
                const date = formatDate(event.date);
                return (
                  <div
                    key={event.id}
                    className="flex gap-6 p-6 bg-white rounded-2xl border border-espresso/5
                             hover:border-bronze-300 hover:shadow-lg transition-all duration-300"
                  >
                    {/* Date badge */}
                    <div className="flex-shrink-0 w-20 text-center">
                      <div className="bg-bronze-500 text-white rounded-t-lg py-1 text-xs font-semibold">
                        {date.month}
                      </div>
                      <div className="bg-ivory-100 rounded-b-lg py-2 border border-t-0 border-espresso/10">
                        <div className="font-display text-2xl font-bold text-espresso">
                          {date.day}
                        </div>
                        <div className="text-xs text-warm-500">{date.year}</div>
                      </div>
                    </div>

                    {/* Event details */}
                    <div className="flex-1">
                      <div className="flex flex-wrap items-center gap-3 mb-2">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-semibold ${eventTypeColors[event.type] ||
                            "bg-warm-100 text-warm-700"
                            }`}
                        >
                          {event.type}
                        </span>
                        <span className="text-sm text-warm-500">
                          {event.time}
                        </span>
                      </div>
                      <h3 className="font-display text-xl font-semibold text-espresso mb-2">
                        {event.title}
                      </h3>
                      <p className="text-warm-600 text-sm mb-3">
                        {event.description}
                      </p>
                      <div className="flex items-center gap-2 text-sm text-warm-500">
                        <svg
                          className="w-4 h-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                          />
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                          />
                        </svg>
                        {event.location}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Subscribe CTA */}
      <section className="section-padding bg-gradient-to-br from-bronze-500 via-bronze-600 to-bronze-500">
        <div className="container-custom text-center">
          <h2 className="font-display text-3xl lg:text-4xl font-bold text-white mb-6">
            Never Miss an Event
          </h2>
          <p className="text-xl text-white/80 mb-8 max-w-2xl mx-auto">
            Subscribe to our newsletter to receive updates about upcoming events,
            appraisals, and SABMA news.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center justify-center px-8 py-4 bg-espresso
                     text-white font-semibold rounded-full transition-all duration-300
                     hover:-translate-y-0.5 hover:shadow-xl"
          >
            Subscribe to Updates
          </Link>
        </div>
      </section>
    </>
  );
}
