import { useEffect, useState } from 'react'
import { gradingSystems } from '../../utils/gradingSystem.js'
import SEO from '../../components/SEO.jsx'

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
    <>
      <SEO
        title="GPA Calculator"
        description="Calculate your semester GPA using course grades and credit units. Choose a 5.0, 4.0, or custom grading scale with UniStack."
        breadcrumbs={[
          { name: 'UniStack', url: '/' },
          { name: 'Calculators', url: '/gpa-calculator' },
          { name: 'GPA Calculator', url: '/gpa-calculator' },
        ]}
      />

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

                {/* Educational Content */}
        <section className="mt-8 rounded-2xl border border-border bg-surface p-5 shadow-sm sm:p-8">
          <h2 className="text-2xl font-bold text-text">
            Understanding GPA
          </h2>

          <div className="mt-6 space-y-6 text-sm leading-7 text-text-secondary">
            <div>
              <h3 className="text-lg font-bold text-text">
                What is GPA?
              </h3>

              <p className="mt-2">
                GPA stands for Grade Point Average. It measures your academic
                performance for a specific semester or academic period. Your
                GPA is calculated using the grades you earned and the credit
                units of your courses.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-bold text-text">
                How is GPA calculated?
              </h3>

              <p className="mt-2">
                Each grade is assigned a grade point. That grade point is
                multiplied by the course's credit units to get the quality
                points. Your total quality points are then divided by your
                total credit units.
              </p>

              <div className="mt-4 rounded-xl bg-background p-4 font-medium text-text">
                GPA = Total Quality Points ÷ Total Credit Units
              </div>
            </div>

            <div>
              <h3 className="text-lg font-bold text-text">
                GPA vs CGPA
              </h3>

              <p className="mt-2">
                GPA usually represents your performance during one semester,
                while CGPA represents your cumulative performance across
                multiple semesters. Your semester GPA can therefore contribute
                to your overall CGPA.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-bold text-text">
                Simple example
              </h3>

              <p className="mt-2">
                Suppose you take a 3-credit course and earn a grade point of
                5, then take a 2-credit course and earn a grade point of 4.
              </p>

              <div className="mt-4 rounded-xl bg-background p-4 text-text">
                <p>3 × 5 = 15 quality points</p>
                <p>2 × 4 = 8 quality points</p>
                <p className="mt-2 font-semibold">
                  Total = 23 quality points ÷ 5 credit units = 4.60 GPA
                </p>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-bold text-text">
                Choosing a grading system
              </h3>

              <p className="mt-2">
                Schools may use different grading scales, such as 5.0 or 4.0.
                Some institutions may also use their own grade-point system.
                UniStack lets you select a 5.0 scale, a 4.0 scale, or create
                a custom scale that matches your school's grading system.
              </p>
            </div>
          </div>
        </section>
                {/* FAQ */}
        <section className="mt-8 rounded-2xl border border-border bg-surface p-5 shadow-sm sm:p-8">
          <h2 className="text-2xl font-bold text-text">
            Frequently Asked Questions About GPA
          </h2>

          <div className="mt-6 space-y-6 text-sm leading-7 text-text-secondary">
            <div>
              <h3 className="text-lg font-bold text-text">
                What is GPA?
              </h3>

              <p className="mt-2">
                GPA stands for Grade Point Average. It measures your
                academic performance for a specific semester or
                academic period using your course grades and credit
                units.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-bold text-text">
                How is GPA calculated?
              </h3>

              <p className="mt-2">
                GPA is calculated by dividing your total quality
                points by your total credit units. Quality points are
                calculated by multiplying each course's credit units
                by the grade point earned in that course.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-bold text-text">
                What is the difference between GPA and CGPA?
              </h3>

              <p className="mt-2">
                GPA usually represents your performance during one
                semester, while CGPA represents your cumulative
                performance across multiple semesters.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-bold text-text">
                Do credit units affect GPA?
              </h3>

              <p className="mt-2">
                Yes. Courses with more credit units have a greater
                effect on your GPA because their grade points
                contribute more quality points to the calculation.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-bold text-text">
                Can I calculate GPA on a 4.0 or 5.0 scale?
              </h3>

              <p className="mt-2">
                Yes. UniStack supports both 4.0 and 5.0 grading
                systems. You can also choose the Custom Scale option
                if your school uses a different grading system.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-bold text-text">
                Can I use my school's custom grade points?
              </h3>

              <p className="mt-2">
                Yes. Select Custom Scale and enter the grade points
                used by your school for each grade.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-bold text-text">
                What happens if I have courses with different credit units?
              </h3>

              <p className="mt-2">
                Each course is weighted according to its credit units.
                This means a 3-credit course contributes more to your
                GPA calculation than a 1-credit course when the grade
                points are different.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-bold text-text">
                Can I save my GPA calculation?
              </h3>

              <p className="mt-2">
                UniStack saves your entered courses, grades, credit
                units, and grading system locally in your browser.
                Your data stays available when you return to the
                calculator on the same browser unless you clear it.
              </p>
            </div>
          </div>
        </section>
        {/* Related Tools */}
<section className="mt-8 rounded-2xl border border-border bg-surface p-5 shadow-sm sm:p-8">
  <h2 className="text-2xl font-bold text-text">
    Related Tools
  </h2>

  <p className="mt-2 text-sm leading-7 text-text-secondary">
    Explore other UniStack tools to calculate your cumulative
    performance, plan your target CGPA, and check your course grades.
  </p>

  <div className="mt-6 grid gap-4 sm:grid-cols-3">
    <a
      href="/cgpa-calculator"
      className="rounded-xl border border-border bg-background p-4 transition hover:border-primary hover:bg-primary/5"
    >
      <h3 className="font-bold text-text">
        CGPA Calculator
      </h3>

      <p className="mt-2 text-sm leading-6 text-text-secondary">
        Calculate your cumulative GPA across multiple semesters.
      </p>
    </a>

    <a
      href="/cgpa-planner"
      className="rounded-xl border border-border bg-background p-4 transition hover:border-primary hover:bg-primary/5"
    >
      <h3 className="font-bold text-text">
        CGPA Target Planner
      </h3>

      <p className="mt-2 text-sm leading-6 text-text-secondary">
        Find out what GPA you may need to reach your target CGPA.
      </p>
    </a>

    <a
      href="/grade-calculator"
      className="rounded-xl border border-border bg-background p-4 transition hover:border-primary hover:bg-primary/5"
    >
      <h3 className="font-bold text-text">
        Grade Calculator
      </h3>

      <p className="mt-2 text-sm leading-6 text-text-secondary">
        Calculate your final course percentage from your assessments.
      </p>
    </a>
  </div>
</section>

      </div>
    </main>
    </>
  )
}

export default GPACalculator
