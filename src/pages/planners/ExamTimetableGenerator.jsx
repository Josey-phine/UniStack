import { useEffect, useState } from 'react'
import { generateTimetable } from '../../utils/timetableAlgorithm'

const defaultSettings = {
  studyHoursPerDay: '',
}

const defaultExams = [
  {
    id: 1,
    course: '',
    examDate: '',
    difficulty: 'Medium',
    confidence: 'Medium',
  },
]

const getToday = () => {
  const today = new Date()

  const year = today.getFullYear()
  const month = String(today.getMonth() + 1).padStart(2, '0')
  const day = String(today.getDate()).padStart(2, '0')

  return `${year}-${month}-${day}`
}

const formatDate = (dateString) => {
  const date = new Date(`${dateString}T00:00:00`)

  return date.toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  })
}

const formatShortDate = (dateString) => {
  const date = new Date(`${dateString}T00:00:00`)

  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })
}

function ExamTimetableGenerator() {
  const [settings, setSettings] = useState(() => {
    const savedSettings = localStorage.getItem(
      'unistack-exam-timetable-settings'
    )

    return savedSettings
      ? JSON.parse(savedSettings)
      : defaultSettings
  })

  const [exams, setExams] = useState(() => {
    const savedExams = localStorage.getItem(
      'unistack-exam-timetable-exams'
    )

    return savedExams
      ? JSON.parse(savedExams)
      : defaultExams
  })

  const [timetable, setTimetable] = useState([])

  const [savedPlans, setSavedPlans] = useState(() => {
    const saved = localStorage.getItem(
      'unistack-exam-timetable-plans'
    )

    return saved ? JSON.parse(saved) : []
  })

  const [error, setError] = useState('')

  const [planName, setPlanName] = useState('')

  useEffect(() => {
    localStorage.setItem(
      'unistack-exam-timetable-settings',
      JSON.stringify(settings)
    )
  }, [settings])

  useEffect(() => {
    localStorage.setItem(
      'unistack-exam-timetable-exams',
      JSON.stringify(exams)
    )
  }, [exams])

  useEffect(() => {
    localStorage.setItem(
      'unistack-exam-timetable-plans',
      JSON.stringify(savedPlans)
    )
  }, [savedPlans])

  const updateSettings = (field, value) => {
    setSettings((current) => ({
      ...current,
      [field]: value,
    }))
  }

  const updateExam = (id, field, value) => {
    setExams((current) =>
      current.map((exam) =>
        exam.id === id
          ? {
              ...exam,
              [field]: value,
            }
          : exam
      )
    )
  }

  const addExam = () => {
    setExams((current) => [
      ...current,
      {
        id: Date.now(),
        course: '',
        examDate: '',
        difficulty: 'Medium',
        confidence: 'Medium',
      },
    ])
  }

  const removeExam = (id) => {
    setExams((current) =>
      current.filter((exam) => exam.id !== id)
    )
  }

  const clearAll = () => {
    setSettings(defaultSettings)
    setExams(defaultExams)
    setTimetable([])
    setError('')
    setPlanName('')

    localStorage.removeItem(
      'unistack-exam-timetable-settings'
    )

    localStorage.removeItem(
      'unistack-exam-timetable-exams'
    )
  }

  const handleGenerate = () => {
    setError('')

    const studyHours = Number(
      settings.studyHoursPerDay
    )

    if (studyHours <= 0) {
      setError(
        'Please enter your available study hours per day.'
      )
      return
    }

    const incompleteExam = exams.find(
      (exam) =>
        !exam.course.trim() ||
        !exam.examDate
    )

    if (incompleteExam) {
      setError(
        'Please complete the course name and exam date for every exam.'
      )
      return
    }

    const today = getToday()

    const pastExam = exams.find(
      (exam) => exam.examDate <= today
    )

    if (pastExam) {
      setError(
        `${pastExam.course} has an exam date that is today or has already passed. Please choose a future exam date.`
      )
      return
    }

    const generatedTimetable =
      generateTimetable({
        exams,
        studyHoursPerDay: studyHours,
        startDate: today,
      })

    if (!generatedTimetable.length) {
      setError(
        'There was not enough information to generate a timetable.'
      )
      return
    }

    setTimetable(generatedTimetable)
    setPlanName('')
  }

  const handleSavePlan = () => {
    if (!timetable.length) {
      setError(
        'Generate a timetable before saving it.'
      )
      return
    }

    const finalPlanName =
      planName.trim() ||
      `Exam Plan - ${formatShortDate(
        getToday()
      )}`

    const newPlan = {
      id: Date.now(),
      name: finalPlanName,
      createdAt: new Date().toISOString(),
      settings,
      exams,
      timetable,
    }

    setSavedPlans((current) => [
      newPlan,
      ...current,
    ])

    setPlanName('')
    setError('')
  }

  const loadPlan = (plan) => {
    setSettings(plan.settings)
    setExams(plan.exams)
    setTimetable(plan.timetable)
    setPlanName(plan.name)
    setError('')
  }

  const deletePlan = (id) => {
    setSavedPlans((current) =>
      current.filter(
        (plan) => plan.id !== id
      )
    )
  }

  const clearSavedPlans = () => {
    setSavedPlans([])

    localStorage.removeItem(
      'unistack-exam-timetable-plans'
    )
  }

  return (
    <main className="min-h-screen bg-background">
      <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-10">
          <p className="mb-2 text-sm font-semibold text-primary">
            Planner
          </p>

          <h1 className="text-3xl font-extrabold tracking-tight text-text sm:text-4xl">
            Exam Timetable Generator
          </h1>

          <p className="mt-3 max-w-2xl text-text-secondary">
            Tell UniStack about your exams and study time,
            then generate a personalized study timetable.
          </p>
        </div>

        {/* Study Availability */}
        <section className="mb-8 rounded-2xl border border-border bg-surface p-6 shadow-sm">
          <div className="mb-6">
            <h2 className="text-xl font-bold text-text">
              Study Availability
            </h2>

            <p className="mt-1 text-sm text-text-secondary">
              Tell us how much time you can study each day.
            </p>
          </div>

          <div className="max-w-sm">
            <label
              htmlFor="studyHours"
              className="mb-2 block text-sm font-semibold text-text"
            >
              Available study hours per day
            </label>

            <input
              id="studyHours"
              type="number"
              min="0.5"
              max="24"
              step="0.5"
              value={settings.studyHoursPerDay}
              onChange={(event) =>
                updateSettings(
                  'studyHoursPerDay',
                  event.target.value
                )
              }
              placeholder="e.g. 4"
              className="w-full rounded-xl border border-border bg-surface px-4 py-3 text-text outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
            />

            <p className="mt-2 text-xs text-text-secondary">
              You can enter values such as 2, 3.5, 5, or 6.
            </p>
          </div>
        </section>

        {/* Exams */}
        <section className="rounded-2xl border border-border bg-surface p-6 shadow-sm">
          <div className="mb-6">
            <h2 className="text-xl font-bold text-text">
              Your Exams
            </h2>

            <p className="mt-1 text-sm text-text-secondary">
              Add every course you need to prepare for.
            </p>
          </div>

          <div className="space-y-6">
            {exams.map((exam, index) => (
              <div
                key={exam.id}
                className="rounded-2xl border border-border bg-background p-5"
              >
                <div className="mb-5 flex items-center justify-between">
                  <h3 className="font-bold text-text">
                    Exam {index + 1}
                  </h3>

                  {exams.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeExam(exam.id)}
                      className="text-sm font-medium text-error transition hover:opacity-80"
                    >
                      Remove
                    </button>
                  )}
                </div>

                <div className="grid gap-5 md:grid-cols-2">
                  {/* Course */}
                  <div>
                    <label
                      htmlFor={`course-${exam.id}`}
                      className="mb-2 block text-sm font-semibold text-text"
                    >
                      Course name
                    </label>

                    <input
                      id={`course-${exam.id}`}
                      type="text"
                      value={exam.course}
                      onChange={(event) =>
                        updateExam(
                          exam.id,
                          'course',
                          event.target.value
                        )
                      }
                      placeholder="e.g. CSC 273"
                      className="w-full rounded-xl border border-border bg-surface px-4 py-3 text-text outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
                    />
                  </div>

                  {/* Exam Date */}
                  <div>
                    <label
                      htmlFor={`date-${exam.id}`}
                      className="mb-2 block text-sm font-semibold text-text"
                    >
                      Exam date
                    </label>

                    <input
                      id={`date-${exam.id}`}
                      type="date"
                      value={exam.examDate}
                      onChange={(event) =>
                        updateExam(
                          exam.id,
                          'examDate',
                          event.target.value
                        )
                      }
                      className="w-full rounded-xl border border-border bg-surface px-4 py-3 text-text outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
                    />
                  </div>

                  {/* Difficulty */}
                  <div>
                    <label
                      htmlFor={`difficulty-${exam.id}`}
                      className="mb-2 block text-sm font-semibold text-text"
                    >
                      Course difficulty
                    </label>

                    <select
                      id={`difficulty-${exam.id}`}
                      value={exam.difficulty}
                      onChange={(event) =>
                        updateExam(
                          exam.id,
                          'difficulty',
                          event.target.value
                        )
                      }
                      className="w-full rounded-xl border border-border bg-surface px-4 py-3 text-text outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
                    >
                      <option value="Easy">Easy</option>
                      <option value="Medium">Medium</option>
                      <option value="Hard">Hard</option>
                    </select>
                  </div>

                  {/* Confidence */}
                  <div>
                    <label
                      htmlFor={`confidence-${exam.id}`}
                      className="mb-2 block text-sm font-semibold text-text"
                    >
                      Your confidence
                    </label>

                    <select
                      id={`confidence-${exam.id}`}
                      value={exam.confidence}
                      onChange={(event) =>
                        updateExam(
                          exam.id,
                          'confidence',
                          event.target.value
                        )
                      }
                      className="w-full rounded-xl border border-border bg-surface px-4 py-3 text-text outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
                    >
                      <option value="Low">Low</option>
                      <option value="Medium">Medium</option>
                      <option value="High">High</option>
                    </select>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <button
            type="button"
            onClick={addExam}
            className="mt-6 w-full rounded-xl border-2 border-dashed border-border px-4 py-3 text-sm font-semibold text-primary transition hover:border-primary hover:bg-primary/5"
          >
            + Add Another Exam
          </button>
        </section>

        {/* Error */}
        {error && (
          <div className="mt-6 rounded-xl border border-error/20 bg-error/5 px-4 py-3 text-sm font-medium text-error">
            {error}
          </div>
        )}

        {/* Actions */}
        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-end">
          <button
            type="button"
            onClick={clearAll}
            className="rounded-xl border border-border bg-surface px-6 py-3 text-sm font-semibold text-text-secondary transition hover:bg-background"
          >
            Clear All
          </button>

          <button
            type="button"
            onClick={handleGenerate}
            className="rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-white transition hover:bg-primary-dark"
          >
            Generate Timetable
          </button>
        </div>

        {/* Generated Timetable */}
        {timetable.length > 0 && (
          <section className="mt-10">
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-text">
                Your Study Timetable
              </h2>

              <p className="mt-1 text-sm text-text-secondary">
                Your study sessions are prioritized based on
                exam date, difficulty, and confidence.
              </p>
            </div>

            <div className="mb-6 rounded-2xl border border-primary/20 bg-primary/5 p-5">
              <label
                htmlFor="planName"
                className="mb-2 block text-sm font-semibold text-text"
              >
                Plan name
              </label>

              <div className="flex flex-col gap-3 sm:flex-row">
                <input
                  id="planName"
                  type="text"
                  value={planName}
                  onChange={(event) =>
                    setPlanName(event.target.value)
                  }
                  placeholder="e.g. My September Exam Plan"
                  className="flex-1 rounded-xl border border-border bg-surface px-4 py-3 text-text outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
                />

                <button
                  type="button"
                  onClick={handleSavePlan}
                  className="rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-white transition hover:bg-primary-dark"
                >
                  Save Plan
                </button>
              </div>
            </div>

            <div className="space-y-5">
              {timetable.map((day) => (
                <div
                  key={day.date}
                  className="rounded-2xl border border-border bg-surface p-6 shadow-sm"
                >
                  <div className="mb-5 flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
                    <h3 className="font-bold text-text">
                      {formatDate(day.date)}
                    </h3>

                    <span className="text-sm text-text-secondary">
                      {day.sessions.reduce(
                        (total, session) =>
                          total + session.hours,
                        0
                      )}{' '}
                      hours planned
                    </span>
                  </div>

                  <div className="space-y-3">
                    {day.sessions.map(
                      (session, index) => (
                        <div
                          key={`${day.date}-${session.course}-${index}`}
                          className="rounded-xl border border-border bg-background p-4"
                        >
                          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                            <div>
                              <h4 className="font-bold text-text">
                                {session.course}
                              </h4>

                              <p className="mt-1 text-xs text-text-secondary">
                                Exam:{' '}
                                {formatDate(
                                  session.examDate
                                )}
                              </p>
                            </div>

                            <div className="flex flex-wrap gap-2">
                              <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
                                {session.hours} hr
                              </span>

                              <span className="rounded-full bg-warning/10 px-3 py-1 text-xs font-semibold text-warning">
                                {session.difficulty}
                              </span>

                              <span className="rounded-full bg-success/10 px-3 py-1 text-xs font-semibold text-success">
                                {session.confidence}{' '}
                                confidence
                              </span>
                            </div>
                          </div>
                        </div>
                      )
                    )}
                  </div>

                  {day.unusedHours > 0 && (
                    <p className="mt-4 text-xs text-text-secondary">
                      {day.unusedHours} hour
                      {day.unusedHours !== 1
                        ? 's'
                        : ''}{' '}
                      remained unused.
                    </p>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Saved Plans */}
        {savedPlans.length > 0 && (
          <section className="mt-12">
            <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <h2 className="text-2xl font-bold text-text">
                  Saved Plans
                </h2>

                <p className="mt-1 text-sm text-text-secondary">
                  Your saved exam timetables are stored on
                  this device.
                </p>
              </div>

              <button
                type="button"
                onClick={clearSavedPlans}
                className="self-start text-sm font-semibold text-error transition hover:opacity-80 sm:self-auto"
              >
                Clear Saved Plans
              </button>
            </div>

            <div className="space-y-4">
              {savedPlans.map((plan) => (
                <div
                  key={plan.id}
                  className="flex flex-col gap-4 rounded-2xl border border-border bg-surface p-5 shadow-sm sm:flex-row sm:items-center sm:justify-between"
                >
                  <div>
                    <h3 className="font-bold text-text">
                      {plan.name}
                    </h3>

                    <p className="mt-1 text-xs text-text-secondary">
                      Created{' '}
                      {formatShortDate(
                        plan.createdAt.split('T')[0]
                      )}
                    </p>

                    <p className="mt-1 text-xs text-text-secondary">
                      {plan.exams.length}{' '}
                      {plan.exams.length === 1
                        ? 'exam'
                        : 'exams'}
                    </p>
                  </div>

                  <div className="flex gap-3">
                    <button
                      type="button"
                      onClick={() =>
                        loadPlan(plan)
                      }
                      className="rounded-lg border border-border px-4 py-2 text-sm font-semibold text-text transition hover:bg-background"
                    >
                      Load
                    </button>

                    <button
                      type="button"
                      onClick={() =>
                        deletePlan(plan.id)
                      }
                      className="rounded-lg px-4 py-2 text-sm font-semibold text-error transition hover:bg-error/5"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </main>
  )
}

export default ExamTimetableGenerator
