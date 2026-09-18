import { useEffect, useState } from 'react'
import { gradingSystems } from '../../utils/gradingSystem.js'

const defaultCustomGrades = {
  A: 5,
  B: 4,
  C: 3,
  D: 2,
  E: 1,
  F: 0,
}

const defaultCourses = [
  {
    id: 1,
    course: '',
    creditUnit: '',
    grade: '',
  },
]

function GPACalculator() {
  const [gradingSystem, setGradingSystem] = useState(() => {
    return localStorage.getItem('unistack-gpa-grading-system') || '5'
  })

  const [customGrades, setCustomGrades] = useState(() => {
    const savedCustomGrades = localStorage.getItem(
      'unistack-gpa-custom-grades'
    )

    return savedCustomGrades
      ? JSON.parse(savedCustomGrades)
      : defaultCustomGrades
  })

  const [courses, setCourses] = useState(() => {
    const savedCourses = localStorage.getItem('unistack-gpa-courses')

    return savedCourses
      ? JSON.parse(savedCourses)
      : defaultCourses
  })

  useEffect(() => {
    localStorage.setItem(
      'unistack-gpa-grading-system',
      gradingSystem
    )
  }, [gradingSystem])

  useEffect(() => {
    localStorage.setItem(
      'unistack-gpa-custom-grades',
      JSON.stringify(customGrades)
    )
  }, [customGrades])

  useEffect(() => {
    localStorage.setItem(
      'unistack-gpa-courses',
      JSON.stringify(courses)
    )
  }, [courses])

  const addCourse = () => {
    setCourses([
      ...courses,
      {
        id: Date.now(),
        course: '',
        creditUnit: '',
        grade: '',
      },
    ])
  }

  const removeCourse = (courseId) => {
    setCourses(
      courses.filter((course) => course.id !== courseId)
    )
  }

  const updateCourse = (courseId, field, value) => {
    setCourses(
      courses.map((course) =>
        course.id === courseId
          ? { ...course, [field]: value }
          : course
      )
    )
  }

  const updateCustomGrade = (grade, value) => {
    setCustomGrades((previousGrades) => ({
      ...previousGrades,
      [grade]: value,
    }))
  }

  const calculateResults = () => {
    const gradePoints =
      gradingSystem === 'custom'
        ? customGrades
        : gradingSystems[gradingSystem].grades

    let totalQualityPoints = 0
    let totalCreditUnits = 0

    courses.forEach((course) => {
      const creditUnit = Number(course.creditUnit)
      const gradePoint = gradePoints[course.grade]

      if (creditUnit > 0 && gradePoint !== undefined) {
        totalQualityPoints += creditUnit * gradePoint
        totalCreditUnits += creditUnit
      }
    })

    const gpa =
      totalCreditUnits > 0
        ? totalQualityPoints / totalCreditUnits
        : 0

    return {
      totalQualityPoints,
      totalCreditUnits,
      gpa,
    }
  }

  const clearCalculator = () => {
    localStorage.removeItem('unistack-gpa-grading-system')
    localStorage.removeItem('unistack-gpa-custom-grades')
    localStorage.removeItem('unistack-gpa-courses')

    setGradingSystem('5')
    setCustomGrades(defaultCustomGrades)
    setCourses(defaultCourses)
  }

  const results = calculateResults()

  const gradeOptions =
    gradingSystem === 'custom'
      ? Object.keys(customGrades)
      : Object.keys(gradingSystems[gradingSystem].grades)

  return (
    <main className="min-h-screen bg-background px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl">

        {/* Header */}
        <div className="mb-8 text-center">
          <p className="mb-2 text-sm font-semibold uppercase tracking-wide text-primary">
            Academic Calculator
          </p>

          <h1 className="text-3xl font-extrabold tracking-tight text-text sm:text-4xl">
            GPA Calculator
          </h1>

          <p className="mx-auto mt-3 max-w-2xl text-text-secondary">
            Calculate your semester GPA using your courses,
            credit units, and grades.
          </p>
        </div>

        {/* Calculator Card */}
        <div className="rounded-2xl border border-border bg-surface p-5 shadow-sm sm:p-8">

          {/* Grading System */}
          <div className="mb-8">
            <label
              htmlFor="grading-system"
              className="mb-2 block text-sm font-semibold text-text"
            >
              Grading System
            </label>

            <select
              id="grading-system"
              value={gradingSystem}
              onChange={(event) =>
                setGradingSystem(event.target.value)
              }
              className="w-full rounded-lg border border-border bg-surface px-4 py-3 text-text outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20 sm:max-w-xs"
            >
              <option value="5">5.0 Scale</option>
              <option value="4">4.0 Scale</option>
              <option value="custom">Custom Scale</option>
            </select>
          </div>

          {/* Custom Grades */}
          {gradingSystem === 'custom' && (
            <div className="mb-8 rounded-xl border border-border bg-background p-5">
              <h2 className="mb-1 text-lg font-bold text-text">
                Custom Grade Points
              </h2>

              <p className="mb-5 text-sm text-text-secondary">
                Enter the point value for each grade.
              </p>

              <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-6">
                {Object.keys(customGrades).map((grade) => (
                  <div key={grade}>
                    <label
                      htmlFor={`custom-${grade}`}
                      className="mb-2 block text-sm font-semibold text-text"
                    >
                      Grade {grade}
                    </label>

                    <input
                      id={`custom-${grade}`}
                      type="number"
                      min="0"
                      step="0.01"
                      value={customGrades[grade]}
                      onChange={(event) =>
                        updateCustomGrade(
                          grade,
                          event.target.value
                        )
                      }
                      className="w-full rounded-lg border border-border bg-surface px-3 py-2.5 text-text outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Courses */}
          <div>
            <div className="mb-4">
              <h2 className="text-xl font-bold text-text">
                Courses
              </h2>

              <p className="mt-1 text-sm text-text-secondary">
                Add all courses for this semester.
              </p>
            </div>

            {/* Desktop headings */}
            <div className="mb-2 hidden grid-cols-12 gap-3 px-1 text-xs font-semibold uppercase tracking-wide text-text-secondary sm:grid">
              <div className="col-span-5">Course</div>
              <div className="col-span-3">Credit Unit</div>
              <div className="col-span-3">Grade</div>
              <div className="col-span-1"></div>
            </div>

            <div className="space-y-3">
              {courses.map((course, index) => (
                <div
                  key={course.id}
                  className="rounded-xl border border-border p-4 sm:grid sm:grid-cols-12 sm:items-center sm:gap-3 sm:border-0 sm:p-0"
                >
                  {/* Course */}
                  <div className="mb-3 sm:col-span-5 sm:mb-0">
                    <label
                      htmlFor={`course-${course.id}`}
                      className="mb-1 block text-sm font-medium text-text sm:hidden"
                    >
                      Course
                    </label>

                    <input
                      id={`course-${course.id}`}
                      type="text"
                      placeholder="e.g. CSC 201"
                      value={course.course}
                      onChange={(event) =>
                        updateCourse(
                          course.id,
                          'course',
                          event.target.value
                        )
                      }
                      className="w-full rounded-lg border border-border bg-surface px-3 py-2.5 text-text outline-none transition placeholder:text-text-secondary/60 focus:border-primary focus:ring-2 focus:ring-primary/20"
                    />
                  </div>

                  {/* Credit Unit */}
                  <div className="mb-3 sm:col-span-3 sm:mb-0">
                    <label
                      htmlFor={`credit-${course.id}`}
                      className="mb-1 block text-sm font-medium text-text sm:hidden"
                    >
                      Credit Unit
                    </label>

                    <input
                      id={`credit-${course.id}`}
                      type="number"
                      min="1"
                      step="1"
                      placeholder="e.g. 3"
                      value={course.creditUnit}
                      onChange={(event) =>
                        updateCourse(
                          course.id,
                          'creditUnit',
                          event.target.value
                        )
                      }
                      className="w-full rounded-lg border border-border bg-surface px-3 py-2.5 text-text outline-none transition placeholder:text-text-secondary/60 focus:border-primary focus:ring-2 focus:ring-primary/20"
                    />
                  </div>

                  {/* Grade */}
                  <div className="mb-3 sm:col-span-3 sm:mb-0">
                    <label
                      htmlFor={`grade-${course.id}`}
                      className="mb-1 block text-sm font-medium text-text sm:hidden"
                    >
                      Grade
                    </label>

                    <select
                      id={`grade-${course.id}`}
                      value={course.grade}
                      onChange={(event) =>
                        updateCourse(
                          course.id,
                          'grade',
                          event.target.value
                        )
                      }
                      className="w-full rounded-lg border border-border bg-surface px-3 py-2.5 text-text outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
                    >
                      <option value="">Select grade</option>

                      {gradeOptions.map((grade) => (
                        <option key={grade} value={grade}>
                          {grade}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Remove */}
                  <div className="sm:col-span-1 sm:flex sm:justify-end">
                    <button
                      type="button"
                      onClick={() => removeCourse(course.id)}
                      disabled={courses.length === 1}
                      className="w-full rounded-lg border border-error px-3 py-2 text-sm font-medium text-error transition hover:bg-error/10 disabled:cursor-not-allowed disabled:opacity-40 sm:w-auto"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Add Course */}
            <button
              type="button"
              onClick={addCourse}
              className="mt-5 rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-primary-dark"
            >
              + Add Course
            </button>
          </div>
        </div>

        {/* Results */}
        <div className="mt-6 grid gap-4 sm:grid-cols-3">

          {/* GPA */}
          <div className="rounded-2xl border border-primary/20 bg-primary/5 p-6 text-center">
            <p className="text-sm font-medium text-text-secondary">
              Semester GPA
            </p>

            <p className="mt-2 text-4xl font-extrabold text-primary">
              {results.gpa.toFixed(2)}
            </p>

            <p className="mt-1 text-xs text-text-secondary">
              {gradingSystem === 'custom'
                ? 'Custom scale'
                : `${gradingSystem}.0 scale`}
            </p>
          </div>

          {/* Credit Units */}
          <div className="rounded-2xl border border-border bg-surface p-6 text-center">
            <p className="text-sm font-medium text-text-secondary">
              Total Credit Units
            </p>

            <p className="mt-2 text-3xl font-extrabold text-text">
              {results.totalCreditUnits}
            </p>
          </div>

          {/* Quality Points */}
          <div className="rounded-2xl border border-border bg-surface p-6 text-center">
            <p className="text-sm font-medium text-text-secondary">
              Total Quality Points
            </p>

            <p className="mt-2 text-3xl font-extrabold text-text">
              {results.totalQualityPoints.toFixed(2)}
            </p>
          </div>
        </div>

        {/* Clear */}
        <div className="mt-6 text-center">
          <button
            type="button"
            onClick={clearCalculator}
            className="text-sm font-medium text-error transition hover:underline"
          >
            Clear All
          </button>
        </div>

      </div>
    </main>
  )
}

export default GPACalculator

