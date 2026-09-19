import { useEffect, useMemo, useState } from 'react'

const STORAGE_KEY = 'unistack-exam-countdown-exams'

const getToday = () => {
  const today = new Date()

  const year = today.getFullYear()
  const month = String(today.getMonth() + 1).padStart(2, '0')
  const day = String(today.getDate()).padStart(2, '0')

  return `${year}-${month}-${day}`
}

const getDaysRemaining = (examDate) => {
  const today = new Date(`${getToday()}T00:00:00`)
  const exam = new Date(`${examDate}T00:00:00`)

  if (Number.isNaN(exam.getTime())) {
    return null
  }

  const difference =
    exam.getTime() - today.getTime()

  return Math.ceil(
    difference / (1000 * 60 * 60 * 24)
  )
}

const formatDate = (dateString) => {
  const date = new Date(`${dateString}T00:00:00`)

  if (Number.isNaN(date.getTime())) {
    return 'Invalid date'
  }

  return date.toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })
}

function ExamCountdown() {
  const [exams, setExams] = useState(() => {
    try {
      const savedExams =
        localStorage.getItem(STORAGE_KEY)

      return savedExams
        ? JSON.parse(savedExams)
        : []
    } catch {
      return []
    }
  })

  const [course, setCourse] = useState('')
  const [examDate, setExamDate] = useState('')
  const [error, setError] = useState('')

  useEffect(() => {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(exams)
    )
  }, [exams])

  const examDetails = useMemo(() => {
    return exams
      .map((exam) => ({
        ...exam,
        daysRemaining: getDaysRemaining(
          exam.examDate
        ),
      }))
      .sort((a, b) => {
        return (
          new Date(`${a.examDate}T00:00:00`) -
          new Date(`${b.examDate}T00:00:00`)
        )
      })
  }, [exams])

  const upcomingExams = examDetails.filter(
    (exam) => exam.daysRemaining >= 0
  )

  const passedExams = examDetails.filter(
    (exam) => exam.daysRemaining < 0
  )

  const nearestExam =
    upcomingExams.length > 0
      ? upcomingExams[0]
      : null

  const addExam = () => {
    setError('')

    const trimmedCourse = course.trim()

    if (!trimmedCourse) {
      setError('Please enter a course name.')
      return
    }

    if (!examDate) {
      setError('Please select an exam date.')
      return
    }

    const newExam = {
      id: Date.now(),
      course: trimmedCourse,
      examDate,
    }

    setExams((previousExams) => [
      ...previousExams,
      newExam,
    ])

    setCourse('')
    setExamDate('')
  }

  const deleteExam = (id) => {
    setExams((previousExams) =>
      previousExams.filter(
        (exam) => exam.id !== id
      )
    )
  }

  const clearAll = () => {
    setExams([])
    setCourse('')
    setExamDate('')
    setError('')
  }

  return (
    <main className="min-h-screen bg-background px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl">
        {/* HEADER */}
        <div className="mb-8">
          <p className="mb-2 text-sm font-semibold text-primary">
            Study Tool
          </p>

          <h1 className="text-3xl font-bold tracking-tight text-text sm:text-4xl">
            Exam Countdown
          </h1>

          <p className="mt-3 max-w-2xl text-text-secondary">
            Keep track of your upcoming exams and see exactly how
            much time you have left to prepare.
          </p>
        </div>

        {/* ADD EXAM */}
        <section className="rounded-2xl border border-border bg-surface p-5 shadow-sm sm:p-6">
          <h2 className="text-xl font-bold text-text">
            Add an Exam
          </h2>

          <p className="mt-2 text-sm text-text-secondary">
            Add each course and its exam date to build your countdown.
          </p>

          <div className="mt-6 grid gap-5 sm:grid-cols-2">
            <div>
              <label
                htmlFor="course"
                className="mb-2 block text-sm font-semibold text-text"
              >
                Course name
              </label>

              <input
                id="course"
                type="text"
                value={course}
                onChange={(event) =>
                  setCourse(event.target.value)
                }
                placeholder="e.g. MTH 202"
                className="w-full rounded-xl border border-border bg-surface px-4 py-3 text-text outline-none transition placeholder:text-text-secondary/60 focus:border-primary focus:ring-2 focus:ring-primary/20"
              />
            </div>

            <div>
              <label
                htmlFor="exam-date"
                className="mb-2 block text-sm font-semibold text-text"
              >
                Exam date
              </label>

              <input
                id="exam-date"
                type="date"
                min={getToday()}
                value={examDate}
                onChange={(event) =>
                  setExamDate(event.target.value)
                }
                className="w-full rounded-xl border border-border bg-surface px-4 py-3 text-text outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
              />
            </div>
          </div>

          {error && (
            <div className="mt-5 rounded-xl border border-error/20 bg-error/5 p-4">
              <p className="text-sm font-medium text-error">
                {error}
              </p>
            </div>
          )}

          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <button
              type="button"
              onClick={addExam}
              className="rounded-xl bg-primary px-5 py-3 font-semibold text-white transition hover:bg-primary-dark"
            >
              Add Exam
            </button>

            <button
              type="button"
              onClick={clearAll}
              className="rounded-xl border border-border bg-surface px-5 py-3 font-semibold text-text-secondary transition hover:bg-background hover:text-text"
            >
              Clear All
            </button>
          </div>
        </section>

        {/* NEAREST EXAM */}
        {nearestExam && (
          <section className="mt-6 rounded-2xl border border-primary/20 bg-primary/5 p-5 sm:p-6">
            <p className="text-sm font-semibold text-primary">
              Next Exam
            </p>

            <div className="mt-3 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h2 className="text-2xl font-bold text-text">
                  {nearestExam.course}
                </h2>

                <p className="mt-1 text-sm text-text-secondary">
                  {formatDate(nearestExam.examDate)}
                </p>
              </div>

              <div className="rounded-xl bg-surface px-5 py-4 text-center shadow-sm">
                <p className="text-3xl font-bold text-primary">
                  {nearestExam.daysRemaining === 0
                    ? 'Today'
                    : nearestExam.daysRemaining}
                </p>

                {nearestExam.daysRemaining !== 0 && (
                  <p className="text-sm text-text-secondary">
                    {nearestExam.daysRemaining === 1
                      ? 'day remaining'
                      : 'days remaining'}
                  </p>
                )}
              </div>
            </div>
          </section>
        )}

        {/* UPCOMING EXAMS */}
        <section className="mt-6">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold text-text">
                Upcoming Exams
              </h2>

              <p className="mt-1 text-sm text-text-secondary">
                {upcomingExams.length === 0
                  ? 'No upcoming exams yet.'
                  : `${upcomingExams.length} upcoming ${
                      upcomingExams.length === 1
                        ? 'exam'
                        : 'exams'
                    }`}
              </p>
            </div>
          </div>

          {upcomingExams.length > 0 ? (
            <div className="space-y-4">
              {upcomingExams.map((exam) => (
                <div
                  key={exam.id}
                  className={`rounded-2xl border bg-surface p-5 shadow-sm ${
                    nearestExam?.id === exam.id
                      ? 'border-primary/40'
                      : 'border-border'
                  }`}
                >
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <div className="flex flex-wrap items-center gap-2">
                        <h3 className="text-lg font-bold text-text">
                          {exam.course}
                        </h3>

                        {nearestExam?.id === exam.id && (
                          <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
                            Next exam
                          </span>
                        )}
                      </div>

                      <p className="mt-1 text-sm text-text-secondary">
                        {formatDate(exam.examDate)}
                      </p>
                    </div>

                    <div className="flex items-center justify-between gap-4 sm:justify-end">
                      <div className="text-left sm:text-right">
                        <p className="text-2xl font-bold text-primary">
                          {exam.daysRemaining === 0
                            ? 'Today'
                            : exam.daysRemaining}
                        </p>

                        {exam.daysRemaining !== 0 && (
                          <p className="text-xs text-text-secondary">
                            {exam.daysRemaining === 1
                              ? 'day left'
                              : 'days left'}
                          </p>
                        )}
                      </div>

                      <button
                        type="button"
                        onClick={() =>
                          deleteExam(exam.id)
                        }
                        className="rounded-lg border border-border px-3 py-2 text-sm font-semibold text-text-secondary transition hover:border-error/30 hover:bg-error/5 hover:text-error"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="rounded-2xl border border-dashed border-border bg-surface p-8 text-center">
              <p className="font-medium text-text">
                No upcoming exams
              </p>

              <p className="mt-1 text-sm text-text-secondary">
                Add an exam above to start your countdown.
              </p>
            </div>
          )}
        </section>

        {/* PASSED EXAMS */}
        {passedExams.length > 0 && (
          <section className="mt-8">
            <h2 className="text-xl font-bold text-text">
              Passed Exams
            </h2>

            <p className="mt-1 text-sm text-text-secondary">
              These exam dates have already passed.
            </p>

            <div className="mt-4 space-y-4">
              {passedExams.map((exam) => (
                <div
                  key={exam.id}
                  className="rounded-2xl border border-border bg-surface p-5 opacity-75"
                >
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <h3 className="font-bold text-text">
                        {exam.course}
                      </h3>

                      <p className="mt-1 text-sm text-text-secondary">
                        {formatDate(exam.examDate)}
                      </p>
                    </div>

                    <div className="flex items-center justify-between gap-4 sm:justify-end">
                      <span className="rounded-full bg-background px-3 py-1 text-xs font-semibold text-text-secondary">
                        Passed
                      </span>

                      <button
                        type="button"
                        onClick={() =>
                          deleteExam(exam.id)
                        }
                        className="rounded-lg border border-border px-3 py-2 text-sm font-semibold text-text-secondary transition hover:border-error/30 hover:bg-error/5 hover:text-error"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* EMPTY STATE */}
        {exams.length === 0 && (
          <div className="mt-8 rounded-2xl border border-border bg-surface p-8 text-center">
            <h2 className="text-xl font-bold text-text">
              Your exam countdown is empty
            </h2>

            <p className="mt-2 text-sm text-text-secondary">
              Add your courses and exam dates above and UniStack
              will keep track of them for you.
            </p>
          </div>
        )}
      </div>
    </main>
  )
}

export default ExamCountdown
