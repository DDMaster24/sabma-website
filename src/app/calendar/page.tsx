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
  Appraisal: "bg-amber-500/10 text-amber-400 border border-amber-500/30",
  Meeting: "bg-blue-500/10 text-blue-400 border border-blue-500/30",
  Seminar: "bg-emerald-500/10 text-emerald-400 border border-emerald-500/30",
  Show: "bg-purple-500/10 text-purple-400 border border-purple-500/30",
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
      <section className="relative py-24 lg:py-32 mesh-spotlight overflow-hidden">
        <div className="absolute top-20 right-20 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-10 left-10 w-64 h-64 bg-amber-600/5 rounded-full blur-2xl" />

        <div className="container-custom relative">
          <div className="max-w-3xl">
            <span className="label-micro mb-4 block">
              Events
            </span>
            <h1 className="heading-display text-cream mb-6">
              <span className="text-gradient-amber">Calendar</span>
            </h1>
            <p className="text-xl text-stone-400 leading-relaxed">
              Stay updated with SABMA events, appraisals, shows, and seminars
              throughout the year.
            </p>
          </div>
        </div>
      </section>

      {/* Events List */}
      <section className="section-padding bg-noir">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <h2 className="font-display text-2xl font-bold text-cream mb-8 flex items-center gap-3">
              <span className="w-8 h-px bg-amber-500" />
              Upcoming Events
            </h2>

            <div className="space-y-6">
              {events.map((event) => {
                const date = formatDate(event.date);
                return (
                  <div
                    key={event.id}
                    className="flex gap-6 p-6 card-noir"
                  >
                    {/* Date badge */}
                    <div className="flex-shrink-0 w-20 text-center">
                      <div className="bg-amber-600 text-noir rounded-t-lg py-1 text-xs font-semibold">
                        {date.month}
                      </div>
                      <div className="bg-charcoal rounded-b-lg py-2 border border-t-0 border-stone-800/50">
                        <div className="font-display text-2xl font-bold text-cream">
                          {date.day}
                        </div>
                        <div className="text-xs text-stone-500">{date.year}</div>
                      </div>
                    </div>

                    {/* Event details */}
                    <div className="flex-1">
                      <div className="flex flex-wrap items-center gap-3 mb-2">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-semibold ${eventTypeColors[event.type] ||
                            "bg-stone-500/10 text-stone-400 border border-stone-500/30"
                            }`}
                        >
                          {event.type}
                        </span>
                        <span className="text-sm text-stone-500">
                          {event.time}
                        </span>
                      </div>
                      <h3 className="font-display text-xl font-semibold text-cream mb-2">
                        {event.title}
                      </h3>
                      <p className="text-stone-400 text-sm mb-3">
                        {event.description}
                      </p>
                      <div className="flex items-center gap-2 text-sm text-stone-500">
                        <svg
                          className="w-4 h-4 text-amber-500"
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
      <section className="section-padding bg-charcoal relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-amber-900/20 via-transparent to-transparent" />
        <div className="container-custom text-center relative">
          <h2 className="heading-section text-cream mb-6">
            Never Miss an <span className="text-gradient-amber">Event</span>
          </h2>
          <p className="text-xl text-stone-400 mb-8 max-w-2xl mx-auto">
            Subscribe to our newsletter to receive updates about upcoming events,
            appraisals, and SABMA news.
          </p>
          <Link href="/contact" className="btn-primary">
            <span>Subscribe to Updates</span>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </section>
    </>
  );
}
