import { useState } from 'react'
import { Link } from 'react-router-dom'

function Home() {
  const [openFaq, setOpenFaq] = useState(null)

  const tools = [
    {
      category: 'Calculator',
      name: 'CGPA Calculator',
      description:
        'Calculate your CGPA quickly using your courses, grades, and credit units.',
      path: '/cgpa-calculator',
    },
    {
      category: 'Calculator',
      name: 'GPA Calculator',
      description:
        'Calculate your semester GPA and understand how your grades affect your result.',
      path: '/gpa-calculator',
    },
    {
      category: 'Calculator',
      name: 'Grade Calculator',
      description:
        'Calculate your final grade from assignments, tests, exams, and other assessments.',
      path: '/grade-calculator',
    },
    {
      category: 'Planner',
      name: 'CGPA Target Planner',
      description:
        'Find out what GPA you need in future semesters to reach your target CGPA.',
      path: '/cgpa-planner',
    },
    {
      category: 'Planner',
      name: 'Exam Timetable Generator',
      description:
        'Create a practical study timetable based on your exams, time, and priorities.',
      path: '/exam-timetable',
    },
    {
      category: 'Study Tool',
      name: 'Study Hours Calculator',
      description:
        'Work out how much study time you have and organize it around your schedule.',
      path: '/study-hours',
    },
    {
      category: 'Study Tool',
      name: 'Pomodoro Timer',
      description:
        'Stay focused with customizable study sessions and breaks.',
      path: '/pomodoro',
    },
    {
      category: 'Study Tool',
      name: 'Exam Countdown',
      description:
        'Keep track of how much time remains until your next examination.',
      path: '/exam-countdown',
    },
  ]

  return (
    <main>
      {/* Hero */}
      <section className="bg-background px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto max-w-3xl text-center">
            <p className="mb-4 text-sm font-semibold uppercase tracking-wider text-primary">
              Your academic toolkit
            </p>

            <h1 className="text-4xl font-extrabold tracking-tight text-text sm:text-5xl lg:text-6xl">
              Study smarter.
              <span className="block text-primary">
                Plan better.
              </span>
            </h1>

            <p className="mx-auto mt-6 max-w-2xl text-base leading-7 text-text-secondary sm:text-lg">
              UniStack gives students simple tools to calculate grades,
              plan their academic goals, organize study time, and stay on
              track throughout the semester.
            </p>

            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
              <a
                href="#tools"
                className="rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-white transition hover:bg-primary-dark"
              >
                Explore Tools
              </a>

              <Link
                to="/cgpa-calculator"
                className="rounded-lg border border-border bg-surface px-6 py-3 text-sm font-semibold text-text transition hover:border-primary hover:text-primary"
              >
                Calculate Your CGPA
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Tool Categories */}
      <section
        id="tools"
        className="bg-surface px-4 py-16 sm:px-6 lg:px-8 lg:py-20"
      >
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-sm font-semibold uppercase tracking-wider text-primary">
              Everything you need
            </p>

            <h2 className="mt-3 text-3xl font-bold tracking-tight text-text sm:text-4xl">
              Tools built for student life
            </h2>

            <p className="mt-4 text-base leading-7 text-text-secondary">
              From calculating your grades to planning your next exam,
              UniStack keeps your academic tools in one place.
            </p>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {/* Calculators */}
            <div className="rounded-2xl border border-border bg-background p-6 transition hover:-translate-y-1 hover:shadow-lg">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-100 text-primary">
                📊
              </div>

              <h3 className="mt-5 text-xl font-bold text-text">
                Calculators
              </h3>

              <p className="mt-2 text-sm leading-6 text-text-secondary">
                Calculate your GPA, CGPA, grades, and other academic
                results quickly and accurately.
              </p>

              <Link
                to="/cgpa-calculator"
                className="mt-5 inline-block text-sm font-semibold text-primary hover:text-primary-dark"
              >
                Explore calculators →
              </Link>
            </div>

            {/* Planners */}
            <div className="rounded-2xl border border-border bg-background p-6 transition hover:-translate-y-1 hover:shadow-lg">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-violet-100 text-violet-600">
                🎯
              </div>

              <h3 className="mt-5 text-xl font-bold text-text">
                Planners
              </h3>

              <p className="mt-2 text-sm leading-6 text-text-secondary">
                Set academic targets and create practical plans to help
                you stay on track.
              </p>

              <Link
                to="/cgpa-planner"
                className="mt-5 inline-block text-sm font-semibold text-primary hover:text-primary-dark"
              >
                Explore planners →
              </Link>
            </div>

            {/* Study Tools */}
            <div className="rounded-2xl border border-border bg-background p-6 transition hover:-translate-y-1 hover:shadow-lg">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-teal-100 text-teal-600">
                ⏱️
              </div>

              <h3 className="mt-5 text-xl font-bold text-text">
                Study Tools
              </h3>

              <p className="mt-2 text-sm leading-6 text-text-secondary">
                Manage your study time, focus sessions, and exam
                countdowns with simple tools.
              </p>

              <Link
                to="/study-hours"
                className="mt-5 inline-block text-sm font-semibold text-primary hover:text-primary-dark"
              >
                Explore study tools →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Tool Cards */}
      <section className="bg-background px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-wider text-primary">
              Explore UniStack
            </p>

            <h2 className="mt-3 text-3xl font-bold tracking-tight text-text sm:text-4xl">
              Find the right tool
            </h2>

            <p className="mt-4 text-base leading-7 text-text-secondary">
              Choose a tool and get started in seconds. No account required.
            </p>
          </div>

          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {tools.map((tool) => (
              <Link
                key={tool.name}
                to={tool.path}
                className="group rounded-2xl border border-border bg-surface p-6 transition hover:-translate-y-1 hover:border-primary hover:shadow-lg"
              >
                <span className="text-xs font-semibold uppercase tracking-wide text-primary">
                  {tool.category}
                </span>

                <h3 className="mt-3 text-lg font-bold text-text group-hover:text-primary">
                  {tool.name}
                </h3>

                <p className="mt-2 text-sm leading-6 text-text-secondary">
                  {tool.description}
                </p>

                <span className="mt-5 inline-block text-sm font-semibold text-primary">
                  Open tool →
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="bg-surface px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-sm font-semibold uppercase tracking-wider text-primary">
              Simple by design
            </p>

            <h2 className="mt-3 text-3xl font-bold tracking-tight text-text sm:text-4xl">
              How UniStack works
            </h2>

            <p className="mt-4 text-base leading-7 text-text-secondary">
              No complicated setup. Choose a tool, enter your information,
              and get the result you need.
            </p>
          </div>

          <div className="relative mt-12 grid gap-8 md:grid-cols-3">
            {/* Step 1 */}
            <div className="text-center">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-primary text-xl font-bold text-white">
                1
              </div>

              <h3 className="mt-5 text-xl font-bold text-text">
                Choose a tool
              </h3>

              <p className="mx-auto mt-2 max-w-sm text-sm leading-6 text-text-secondary">
                Pick the calculator, planner, or study tool that matches
                what you need.
              </p>
            </div>

            {/* Step 2 */}
            <div className="text-center">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-primary text-xl font-bold text-white">
                2
              </div>

              <h3 className="mt-5 text-xl font-bold text-text">
                Enter your information
              </h3>

              <p className="mx-auto mt-2 max-w-sm text-sm leading-6 text-text-secondary">
                Enter your grades, courses, study time, exam dates, or
                other information the tool needs.
              </p>
            </div>

            {/* Step 3 */}
            <div className="text-center">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-primary text-xl font-bold text-white">
                3
              </div>

              <h3 className="mt-5 text-xl font-bold text-text">
                Get your result
              </h3>

              <p className="mx-auto mt-2 max-w-sm text-sm leading-6 text-text-secondary">
                Get a clear result or plan you can use immediately to
                make better academic decisions.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="bg-background px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-sm font-semibold uppercase tracking-wider text-primary">
              Built for students
            </p>

            <h2 className="mt-3 text-3xl font-bold tracking-tight text-text sm:text-4xl">
              Everything stays simple
            </h2>

            <p className="mt-4 text-base leading-7 text-text-secondary">
              UniStack is designed to give you useful academic tools
              without unnecessary complexity.
            </p>
          </div>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {/* Feature 1 */}
            <div className="rounded-2xl border border-border bg-surface p-6">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-100 text-xl">
                ⚡
              </div>

              <h3 className="mt-5 text-lg font-bold text-text">
                Fast & Simple
              </h3>

              <p className="mt-2 text-sm leading-6 text-text-secondary">
                Get the information you need without complicated steps
                or unnecessary forms.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="rounded-2xl border border-border bg-surface p-6">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-teal-100 text-xl">
                📱
              </div>

              <h3 className="mt-5 text-lg font-bold text-text">
                Works on Any Device
              </h3>

              <p className="mt-2 text-sm leading-6 text-text-secondary">
                Use UniStack comfortably on your phone, tablet, or
                computer.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="rounded-2xl border border-border bg-surface p-6">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-violet-100 text-xl">
                🔒
              </div>

              <h3 className="mt-5 text-lg font-bold text-text">
                Your Data Stays Yours
              </h3>

              <p className="mt-2 text-sm leading-6 text-text-secondary">
                Your saved information is stored locally on your device.
                No account is required.
              </p>
            </div>

            {/* Feature 4 */}
            <div className="rounded-2xl border border-border bg-surface p-6">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-amber-100 text-xl">
                🆓
              </div>

              <h3 className="mt-5 text-lg font-bold text-text">
                Free to Use
              </h3>

              <p className="mt-2 text-sm leading-6 text-text-secondary">
                Access the academic tools you need without having to
                create an account or pay to get started.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-surface px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
        <div className="mx-auto max-w-3xl">
          <div className="text-center">
            <p className="text-sm font-semibold uppercase tracking-wider text-primary">
              Frequently asked questions
            </p>

            <h2 className="mt-3 text-3xl font-bold tracking-tight text-text sm:text-4xl">
              Questions? We've got answers.
            </h2>

            <p className="mt-4 text-base leading-7 text-text-secondary">
              Here are some common questions about using UniStack.
            </p>
          </div>

          <div className="mt-10 space-y-4">
            {[
              {
                question: 'Is UniStack free to use?',
                answer:
                  'Yes. UniStack is designed to provide useful academic tools without requiring an account or payment to get started.',
              },
              {
                question: 'Do I need to create an account?',
                answer:
                  'No. You can use the tools without creating an account. Your saved information can be stored locally on your device.',
              },
              {
                question: 'Can I use UniStack on my phone?',
                answer:
                  'Yes. UniStack is designed to work across phones, tablets, and computers.',
              },
              {
                question: 'What academic tools are available?',
                answer:
                  'UniStack includes calculators for GPA, CGPA, and grades, planners for academic targets and exams, and study tools for managing your study time.',
              },
              {
                question: 'Is my information stored online?',
                answer:
                  'The planned personal-data features use local storage in your browser, so your information stays on your device rather than being stored in a UniStack account.',
              },
            ].map((faq, index) => {
              const isOpen = openFaq === index
              const answerId = `faq-answer-${index}`

              return (
                <div
                  key={faq.question}
                  className="overflow-hidden rounded-xl border border-border bg-background"
                >
                  <button
                    type="button"
                    onClick={() =>
                      setOpenFaq(isOpen ? null : index)
                    }
                    aria-expanded={isOpen}
                    aria-controls={answerId}
                    className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
                  >
                    <span className="font-semibold text-text">
                      {faq.question}
                    </span>

                    <span
                      aria-hidden="true"
                      className="text-xl text-primary"
                    >
                      {isOpen ? '−' : '+'}
                    </span>
                  </button>

                  {isOpen && (
                    <div
                      id={answerId}
                      className="border-t border-border px-5 py-4"
                    >
                      <p className="text-sm leading-6 text-text-secondary">
                        {faq.answer}
                      </p>
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border bg-background px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-10 md:grid-cols-3">
            {/* Brand */}
            <div>
              <Link
                to="/"
                className="text-2xl font-extrabold tracking-tight text-primary"
              >
                UniStack
              </Link>

              <p className="mt-3 max-w-sm text-sm leading-6 text-text-secondary">
                Simple academic tools to help students calculate,
                plan, organize, and study smarter.
              </p>
            </div>

            {/* Navigation */}
            <div>
              <h3 className="text-sm font-semibold text-text">
                Navigation
              </h3>

              <div className="mt-4 flex flex-col gap-3">
                <Link
                  to="/"
                  className="text-sm text-text-secondary hover:text-primary"
                >
                  Home
                </Link>

                <Link
                  to="/cgpa-calculator"
                  className="text-sm text-text-secondary hover:text-primary"
                >
                  Calculators
                </Link>

                <Link
                  to="/cgpa-planner"
                  className="text-sm text-text-secondary hover:text-primary"
                >
                  Planners
                </Link>

                <Link
                  to="/study-hours"
                  className="text-sm text-text-secondary hover:text-primary"
                >
                  Study Tools
                </Link>

                <Link
                  to="/about"
                  className="text-sm text-text-secondary hover:text-primary"
                >
                  About
                </Link>
              </div>
            </div>

            {/* Popular Tools */}
            <div>
              <h3 className="text-sm font-semibold text-text">
                Popular Tools
              </h3>

              <div className="mt-4 flex flex-col gap-3">
                <Link
                  to="/cgpa-calculator"
                  className="text-sm text-text-secondary hover:text-primary"
                >
                  CGPA Calculator
                </Link>

                <Link
                  to="/gpa-calculator"
                  className="text-sm text-text-secondary hover:text-primary"
                >
                  GPA Calculator
                </Link>

                <Link
                  to="/cgpa-planner"
                  className="text-sm text-text-secondary hover:text-primary"
                >
                  CGPA Target Planner
                </Link>

                <Link
                  to="/pomodoro"
                  className="text-sm text-text-secondary hover:text-primary"
                >
                  Pomodoro Timer
                </Link>
              </div>
            </div>
          </div>

          <div className="mt-10 border-t border-border pt-6">
            <p className="text-center text-sm text-text-secondary">
              © {new Date().getFullYear()} UniStack. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </main>
  )
}

export default Home
