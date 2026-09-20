import { Link } from 'react-router-dom'
import {
  Calculator,
  CalendarDays,
  Clock3,
  ShieldCheck,
  Sparkles,
} from 'lucide-react'

const toolCategories = [
  {
    icon: Calculator,
    title: 'Calculators',
    description:
      'Calculate your CGPA, GPA, and course grades without doing the calculations manually.',
    path: '/cgpa-calculator',
  },
  {
    icon: CalendarDays,
    title: 'Planners',
    description:
      'Plan your academic goals and create study timetables around your upcoming exams.',
    path: '/cgpa-planner',
  },
  {
    icon: Clock3,
    title: 'Study Tools',
    description:
      'Use focused study tools like the Pomodoro Timer, Study Hours Calculator, and Exam Countdown.',
    path: '/study-hours',
  },
]

function About() {
  return (
    <main>
      {/* Hero */}
      <section className="border-b border-border bg-surface">
        <div className="mx-auto max-w-4xl px-4 py-20 text-center sm:px-6 lg:px-8">
          <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary">
            <Sparkles size={28} />
          </div>

          <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-primary">
            About UniStack
          </p>

          <h1 className="text-4xl font-extrabold tracking-tight text-text sm:text-5xl">
            Built to make student life a little easier.
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-text-secondary">
            UniStack is a collection of simple academic tools designed to
            help students calculate, plan, and manage their studies without
            unnecessary complexity.
          </p>
        </div>
      </section>

      {/* What is UniStack? */}
      <section className="bg-background">
        <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="grid gap-10 md:grid-cols-2 md:items-center">
            <div>
              <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-primary">
                What is UniStack?
              </p>

              <h2 className="text-3xl font-bold tracking-tight text-text">
                Your academic toolkit in one place.
              </h2>

              <p className="mt-5 leading-7 text-text-secondary">
                Students often have to switch between different calculators,
                notes, timers, and planning methods just to keep track of
                their academic work.
              </p>

              <p className="mt-4 leading-7 text-text-secondary">
                UniStack brings useful academic tools together in one simple
                place, so you can spend less time figuring out the tools and
                more time focusing on your studies.
              </p>
            </div>

            <div className="rounded-2xl border border-border bg-surface p-6 shadow-sm">
              <div className="space-y-5">
                <div>
                  <p className="text-3xl font-extrabold text-primary">
                    8+
                  </p>
                  <p className="mt-1 text-sm text-text-secondary">
                    Academic tools
                  </p>
                </div>

                <div className="h-px bg-border" />

                <div>
                  <p className="text-3xl font-extrabold text-primary">
                    0
                  </p>
                  <p className="mt-1 text-sm text-text-secondary">
                    Accounts required
                  </p>
                </div>

                <div className="h-px bg-border" />

                <div>
                  <p className="text-3xl font-extrabold text-primary">
                    100%
                  </p>
                  <p className="mt-1 text-sm text-text-secondary">
                    Focused on students
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What you can do */}
      <section className="border-y border-border bg-surface">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-primary">
              What you can do
            </p>

            <h2 className="text-3xl font-bold tracking-tight text-text">
              Tools for different parts of student life.
            </h2>

            <p className="mt-4 leading-7 text-text-secondary">
              Whether you are calculating your grades, planning for exams,
              or trying to study more consistently, UniStack has a tool for
              it.
            </p>
          </div>

          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {toolCategories.map((category) => {
              const Icon = category.icon

              return (
                <Link
                  key={category.title}
                  to={category.path}
                  className="group rounded-2xl border border-border bg-background p-6 transition hover:-translate-y-1 hover:border-primary/40 hover:shadow-md"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <Icon size={24} />
                  </div>

                  <h3 className="mt-5 text-xl font-bold text-text">
                    {category.title}
                  </h3>

                  <p className="mt-3 leading-7 text-text-secondary">
                    {category.description}
                  </p>

                  <span className="mt-5 inline-block text-sm font-semibold text-primary">
                    Explore tools →
                  </span>
                </Link>
              )
            })}
          </div>
        </div>
      </section>

      {/* Privacy */}
      <section className="bg-background">
        <div className="mx-auto max-w-4xl px-4 py-16 text-center sm:px-6 lg:px-8">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-success/10 text-success">
            <ShieldCheck size={24} />
          </div>

          <h2 className="mt-5 text-3xl font-bold tracking-tight text-text">
            No account required.
          </h2>

          <p className="mx-auto mt-4 max-w-2xl leading-7 text-text-secondary">
            UniStack is designed to be simple. You can use the tools without
            creating an account or remembering another password.
          </p>

          <p className="mx-auto mt-4 max-w-2xl leading-7 text-text-secondary">
            Where supported, your tool data is saved locally in your browser
            so it can remain available when you return to the site on the
            same device and browser.
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-border bg-surface">
        <div className="mx-auto max-w-4xl px-4 py-16 text-center sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold tracking-tight text-text">
            Ready to get started?
          </h2>

          <p className="mx-auto mt-4 max-w-xl leading-7 text-text-secondary">
            Explore the tools and find what can make your academic routine a
            little easier.
          </p>

          <Link
            to="/"
            className="mt-7 inline-flex items-center rounded-xl bg-primary px-6 py-3 font-semibold text-white transition hover:bg-primary-dark"
          >
            Explore UniStack
          </Link>
        </div>
      </section>
    </main>
  )
}

export default About
