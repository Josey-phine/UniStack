import { useState } from 'react'
import SEO from '../../components/SEO'
import { Link } from 'react-router-dom'

function StudyHoursCalculator() {
  const [availableHours, setAvailableHours] = useState('')
  const [courseCount, setCourseCount] = useState('')
  const [result, setResult] = useState(null)

  const calculateHours = () => {
    const hours = Number(availableHours)
    const courses = Number(courseCount)

    if (hours <= 0 || courses <= 0) {
      setResult(null)
      return
    }

    const hoursPerCourse = hours / courses

    setResult({
      totalHours: hours,
      courses,
      hoursPerCourse,
    })
  }

  const clearAll = () => {
    setAvailableHours('')
    setCourseCount('')
    setResult(null)
  }

  return (
    <>
      <SEO
        title="Study Hours Calculator"
        description="Calculate how much study time to dedicate to each course based on your available study hours with UniStack."
        breadcrumbs={[
          { name: 'UniStack', url: '/' },
          { name: 'Study Tools', url: '/study-hours' },
          { name: 'Study Hours Calculator', url: '/study-hours' },
        ]}
      />

      <main className="min-h-screen bg-background px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl">
        {/* Header */}
        <div className="mb-8">
          <p className="mb-2 text-sm font-semibold text-primary">
            Study Tool
          </p>

          <h1 className="text-3xl font-bold tracking-tight text-text sm:text-4xl">
            Study Hours Calculator
          </h1>

          <p className="mt-3 max-w-2xl text-text-secondary">
            Calculate how much study time you can dedicate to each
            course based on your available study hours.
          </p>
        </div>

        {/* Calculator Card */}
        <div className="rounded-2xl border border-border bg-surface p-5 shadow-sm sm:p-6">
          <div className="grid gap-6 sm:grid-cols-2">
            {/* Available Hours */}
            <div>
              <label
                htmlFor="available-hours"
                className="mb-2 block text-sm font-semibold text-text"
              >
                Available study hours
              </label>

              <input
                id="available-hours"
                type="number"
                min="0"
                step="0.5"
                value={availableHours}
                onChange={(event) =>
                  setAvailableHours(event.target.value)
                }
                placeholder="e.g. 6"
                className="w-full rounded-xl border border-border bg-surface px-4 py-3 text-text outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
              />

              <p className="mt-2 text-xs text-text-secondary">
                Enter the total number of hours you can study.
              </p>
            </div>

            {/* Course Count */}
            <div>
              <label
                htmlFor="course-count"
                className="mb-2 block text-sm font-semibold text-text"
              >
                Number of courses
              </label>

              <input
                id="course-count"
                type="number"
                min="1"
                step="1"
                value={courseCount}
                onChange={(event) =>
                  setCourseCount(event.target.value)
                }
                placeholder="e.g. 4"
                className="w-full rounded-xl border border-border bg-surface px-4 py-3 text-text outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
              />

              <p className="mt-2 text-xs text-text-secondary">
                Enter how many courses you want to study.
              </p>
            </div>
          </div>

          {/* Actions */}
          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <button
              type="button"
              onClick={calculateHours}
              className="rounded-xl bg-primary px-5 py-3 font-semibold text-white transition hover:bg-primary-dark"
            >
              Calculate Study Hours
            </button>

            <button
              type="button"
              onClick={clearAll}
              className="rounded-xl border border-border bg-surface px-5 py-3 font-semibold text-text-secondary transition hover:bg-background hover:text-text"
            >
              Clear All
            </button>
          </div>
        </div>

        {/* Result */}
        {result && (
          <div className="mt-6 rounded-2xl border border-primary/20 bg-primary/5 p-5 sm:p-6">
            <p className="text-sm font-semibold text-primary">
              Your Study Plan
            </p>

            <h2 className="mt-2 text-2xl font-bold text-text">
              {result.hoursPerCourse.toFixed(2)} hours per course
            </h2>

            <p className="mt-2 text-text-secondary">
              With {result.totalHours} available study hours across{' '}
              {result.courses} courses, an equal distribution gives
              you approximately{' '}
              <span className="font-semibold text-text">
                {result.hoursPerCourse.toFixed(2)} hours
              </span>{' '}
              per course.
            </p>

            {/* Result Details */}
            <div className="mt-6 grid gap-4 sm:grid-cols-3">
              <div className="rounded-xl border border-border bg-surface p-4">
                <p className="text-sm text-text-secondary">
                  Available Hours
                </p>

                <p className="mt-1 text-xl font-bold text-text">
                  {result.totalHours}
                </p>
              </div>

              <div className="rounded-xl border border-border bg-surface p-4">
                <p className="text-sm text-text-secondary">
                  Courses
                </p>

                <p className="mt-1 text-xl font-bold text-text">
                  {result.courses}
                </p>
              </div>

              <div className="rounded-xl border border-border bg-surface p-4">
                <p className="text-sm text-text-secondary">
                  Hours / Course
                </p>

                <p className="mt-1 text-xl font-bold text-primary">
                  {result.hoursPerCourse.toFixed(2)}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Tip */}
        <div className="mt-6 rounded-2xl border border-border bg-surface p-5">
          <h2 className="font-semibold text-text">
            Study Tip
          </h2>

          <p className="mt-2 text-sm leading-6 text-text-secondary">
            Equal study time is a useful starting point, but some
            courses may need more attention than others. Consider
            giving difficult or unfamiliar subjects additional time.
          </p>
        </div>

                {/* Educational Content */}
        <section className="mt-8 rounded-2xl border border-border bg-surface p-5 shadow-sm sm:p-8">
          <h2 className="text-2xl font-bold text-text">
            How to Plan Your Study Hours
          </h2>

          <div className="mt-6 space-y-6 text-sm leading-7 text-text-secondary">
            <div>
              <h3 className="text-lg font-bold text-text">
                Why should you plan your study hours?
              </h3>

              <p className="mt-2">
                Planning your study time helps you make better use of
                the hours available to you. It can also help you avoid
                spending too much time on one course while neglecting
                others.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-bold text-text">
                How does the calculator work?
              </h3>

              <p className="mt-2">
                Enter the total number of hours you have available for
                studying and the number of courses you want to study.
                The calculator divides your available hours equally
                across those courses.
              </p>

              <div className="mt-4 rounded-xl bg-background p-4 font-medium text-text">
                Hours per Course = Total Study Hours ÷ Number of Courses
              </div>
            </div>

            <div>
              <h3 className="text-lg font-bold text-text">
                Simple example
              </h3>

              <p className="mt-2">
                Suppose you have 8 hours available and four courses to
                study.
              </p>

              <div className="mt-4 rounded-xl bg-background p-4 text-text">
                <p>8 total study hours ÷ 4 courses</p>
                <p className="mt-2 font-semibold">
                  = 2 hours per course
                </p>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-bold text-text">
                Should every course get the same amount of time?
              </h3>

              <p className="mt-2">
                Not necessarily. Equal distribution is a useful
                starting point, but your courses may have different
                levels of difficulty. You may want to spend additional
                time on subjects that are more difficult or topics you
                understand less confidently.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-bold text-text">
                Tips for using your study time effectively
              </h3>

              <ul className="mt-2 list-disc space-y-2 pl-5">
                <li>
                  Prioritize difficult or unfamiliar topics.
                </li>
                <li>
                  Include short breaks during longer study sessions.
                </li>
                <li>
                  Use practice questions to test what you remember.
                </li>
                <li>
                  Review important topics regularly instead of leaving
                  everything until the last minute.
                </li>
                <li>
                  Adjust your study schedule when your priorities
                  change.
                </li>
              </ul>
            </div>
          </div>
        </section>

                {/* Related Tools */}
<section className="mt-8 rounded-2xl border border-border bg-surface p-5 shadow-sm sm:p-8">
  <h2 className="text-2xl font-bold text-text">
    Related Tools
  </h2>

  <p className="mt-2 text-sm leading-7 text-text-secondary">
    Use these UniStack tools to organize your study
    schedule and stay focused while preparing for exams.
  </p>

  <div className="mt-6 grid gap-4 sm:grid-cols-3">
    <Link
      to="/exam-countdown"
      className="rounded-xl border border-border bg-background p-4 transition hover:border-primary hover:bg-primary/5"
    >
      <h3 className="font-bold text-text">
        Exam Countdown
      </h3>

      <p className="mt-2 text-sm leading-6 text-text-secondary">
        Track how many days you have left before your exams.
      </p>
    </Link>

    <Link
      to="/exam-timetable"
      className="rounded-xl border border-border bg-background p-4 transition hover:border-primary hover:bg-primary/5"
    >
      <h3 className="font-bold text-text">
        Exam Timetable Generator
      </h3>

      <p className="mt-2 text-sm leading-6 text-text-secondary">
        Create a study timetable based on your exams and
        available study time.
      </p>
    </Link>

    <Link
      to="/pomodoro"
      className="rounded-xl border border-border bg-background p-4 transition hover:border-primary hover:bg-primary/5"
    >
      <h3 className="font-bold text-text">
        Pomodoro Timer
      </h3>

      <p className="mt-2 text-sm leading-6 text-text-secondary">
        Use focused study sessions and breaks to manage
        your study time.
      </p>
    </Link>
  </div>
</section>

      </div>
    </main>
    </>
  )
}

export default StudyHoursCalculator
