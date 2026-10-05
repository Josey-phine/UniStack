import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { gradingSystems } from '../../utils/gradingSystem.js'
import SEO from '../../components/SEO.jsx'

function CGPACalculator() {
  const defaultCustomGrades = {
    A: 5,
    B: 4,
    C: 3,
    D: 2,
    E: 1,
    F: 0,
  }

  const defaultSemesters = [
    {
      id: 1,
      name: 'Semester 1',
      courses: [
        {
          id: 1,
          course: '',
          creditUnit: '',
          grade: '',
        },
      ],
    },
  ]

  const [gradingSystem, setGradingSystem] = useState(() => {
    return localStorage.getItem('unistack-cgpa-grading-system') || '5'
  })

  const [customGrades, setCustomGrades] = useState(() => {
    const savedCustomGrades = localStorage.getItem(
      'unistack-cgpa-custom-grades'
    )

    return savedCustomGrades
      ? JSON.parse(savedCustomGrades)
      : defaultCustomGrades
  })

  const [semesters, setSemesters] = useState(() => {
    const savedSemesters = localStorage.getItem('unistack-cgpa-semesters')

    return savedSemesters
      ? JSON.parse(savedSemesters)
      : defaultSemesters
  })

  const [activeSemesterId, setActiveSemesterId] = useState(() => {
    const savedActiveSemester = localStorage.getItem(
      'unistack-cgpa-active-semester'
    )

    return savedActiveSemester
      ? Number(savedActiveSemester)
      : 1
  })

  const [editingSemesterId, setEditingSemesterId] = useState(null)
  const [editingName, setEditingName] = useState('')

  useEffect(() => {
    localStorage.setItem(
      'unistack-cgpa-custom-grades',
      JSON.stringify(customGrades)
    )
  }, [customGrades])

  useEffect(() => {
    localStorage.setItem(
      'unistack-cgpa-semesters',
      JSON.stringify(semesters)
    )
  }, [semesters])

  useEffect(() => {
    localStorage.setItem(
      'unistack-cgpa-grading-system',
      gradingSystem
    )
  }, [gradingSystem])

  useEffect(() => {
    localStorage.setItem(
      'unistack-cgpa-active-semester',
      activeSemesterId
    )
  }, [activeSemesterId])

  const activeSemester = semesters.find(
    (semester) => semester.id === activeSemesterId
  )

  const addSemester = () => {
    const newSemester = {
      id: Date.now(),
      name: `Semester ${semesters.length + 1}`,
      courses: [
        {
          id: Date.now() + 1,
          course: '',
          creditUnit: '',
          grade: '',
        },
      ],
    }

    setSemesters([...semesters, newSemester])
    setActiveSemesterId(newSemester.id)
  }

  const startRenaming = (semester) => {
    setEditingSemesterId(semester.id)
    setEditingName(semester.name)
  }

  const saveSemesterName = (id) => {
    const trimmedName = editingName.trim()

    if (!trimmedName) {
      setEditingSemesterId(null)
      setEditingName('')
      return
    }

    setSemesters(
      semesters.map((semester) =>
        semester.id === id
          ? { ...semester, name: trimmedName }
          : semester
      )
    )

    setEditingSemesterId(null)
    setEditingName('')
  }

  const deleteSemester = (id) => {
    if (semesters.length === 1) {
      alert('You need to keep at least one semester.')
      return
    }

    const confirmed = window.confirm(
      'Are you sure you want to delete this semester?'
    )

    if (!confirmed) {
      return
    }

    const remainingSemesters = semesters.filter(
      (semester) => semester.id !== id
    )

    setSemesters(remainingSemesters)

    if (activeSemesterId === id) {
      setActiveSemesterId(remainingSemesters[0].id)
    }
  }

  const addCourse = () => {
    setSemesters(
      semesters.map((semester) =>
        semester.id === activeSemesterId
          ? {
              ...semester,
              courses: [
                ...semester.courses,
                {
                  id: Date.now(),
                  course: '',
                  creditUnit: '',
                  grade: '',
                },
              ],
            }
          : semester
      )
    )
  }

  const removeCourse = (courseId) => {
    setSemesters(
      semesters.map((semester) =>
        semester.id === activeSemesterId
          ? {
              ...semester,
              courses: semester.courses.filter(
                (course) => course.id !== courseId
              ),
            }
          : semester
      )
    )
  }

  const updateCourse = (courseId, field, value) => {
    setSemesters(
      semesters.map((semester) =>
        semester.id === activeSemesterId
          ? {
              ...semester,
              courses: semester.courses.map((course) =>
                course.id === courseId
                  ? { ...course, [field]: value }
                  : course
              ),
            }
          : semester
      )
    )
  }

  const updateCustomGrade = (grade, value) => {
    setCustomGrades((previousGrades) => ({
      ...previousGrades,
      [grade]: value,
    }))
  }

  const calculateSemesterGPA = (semester) => {
    const gradePoints =
      gradingSystem === 'custom'
        ? customGrades
        : gradingSystems[gradingSystem].grades

    let totalQualityPoints = 0
    let totalCreditUnits = 0

    semester.courses.forEach((course) => {
      const creditUnit = Number(course.creditUnit)
      const gradePoint = gradePoints[course.grade]

      if (creditUnit > 0 && gradePoint !== undefined) {
        totalQualityPoints += creditUnit * gradePoint
        totalCreditUnits += creditUnit
      }
    })

    if (totalCreditUnits === 0) {
      return 0
    }

    return totalQualityPoints / totalCreditUnits
  }

  const calculateOverallCGPA = () => {
    const gradePoints =
      gradingSystem === 'custom'
        ? customGrades
        : gradingSystems[gradingSystem].grades

    let totalQualityPoints = 0
    let totalCreditUnits = 0

    semesters.forEach((semester) => {
      semester.courses.forEach((course) => {
        const creditUnit = Number(course.creditUnit)
        const gradePoint = gradePoints[course.grade]

        if (creditUnit > 0 && gradePoint !== undefined) {
          totalQualityPoints += creditUnit * gradePoint
          totalCreditUnits += creditUnit
        }
      })
    })

    if (totalCreditUnits === 0) {
      return 0
    }

    return totalQualityPoints / totalCreditUnits
  }

  const clearCalculator = () => {
    localStorage.removeItem('unistack-cgpa-grading-system')
    localStorage.removeItem('unistack-cgpa-custom-grades')
    localStorage.removeItem('unistack-cgpa-semesters')
    localStorage.removeItem('unistack-cgpa-active-semester')

    setGradingSystem('5')
    setCustomGrades(defaultCustomGrades)
    setSemesters(defaultSemesters)
    setActiveSemesterId(1)
    setEditingSemesterId(null)
    setEditingName('')
  }

  const availableGrades =
    gradingSystem === 'custom'
      ? Object.keys(customGrades)
      : Object.keys(gradingSystems[gradingSystem].grades)

  const overallCGPA = calculateOverallCGPA()

  return (
    <>
      <SEO
        title="CGPA Calculator"
        description="Calculate your CGPA across multiple semesters using 5.0, 4.0, or custom grading systems. Save your courses and results locally with UniStack."
        breadcrumbs={[
          { name: 'UniStack', url: '/' },
          { name: 'Calculators', url: '/cgpa-calculator' },
          { name: 'CGPA Calculator', url: '/cgpa-calculator' },
          ]}
      />

      <main className="min-h-screen bg-background px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl">

        {/* Page Header */}
        <div className="text-center">
          <p className="text-sm font-semibold uppercase tracking-wider text-primary">
            Calculator
          </p>

          <h1 className="mt-3 text-3xl font-bold tracking-tight text-text sm:text-4xl">
            CGPA Calculator
          </h1>

          <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-text-secondary">
            Calculate your cumulative grade point average across
            multiple semesters.
          </p>
        </div>

        {/* Semester Overview Card */}
        <div className="mt-10 rounded-2xl border border-border bg-surface p-5 shadow-sm sm:p-8">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-xl font-bold text-text">
                Semester Overview
              </h2>

              <p className="mt-1 text-sm text-text-secondary">
                Track your GPA across all your semesters.
              </p>
            </div>

            <button
              type="button"
              onClick={addSemester}
              className="rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-primary-dark"
            >
              + Add Semester
            </button>
          </div>

          {/* Semester List */}
          <div className="mt-6 space-y-3">
            {semesters.map((semester) => {
              const semesterGPA = calculateSemesterGPA(semester)

              const totalCredits = semester.courses.reduce(
                (total, course) => {
                  const credit = Number(course.creditUnit)

                  return credit > 0 ? total + credit : total
                },
                0
              )

              const isActive = semester.id === activeSemesterId
              const isEditing = editingSemesterId === semester.id

              return (
                <div
                  key={semester.id}
                  className={`rounded-xl border p-4 transition ${
                    isActive
                      ? 'border-primary bg-primary/5'
                      : 'border-border hover:border-primary/50 hover:bg-background'
                  }`}
                >
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

                    {/* Semester Selection */}
                    <button
                      type="button"
                      onClick={() => setActiveSemesterId(semester.id)}
                      className="flex-1 text-left"
                    >
                      {isEditing ? (
                        <input
                          type="text"
                          value={editingName}
                          onChange={(e) =>
                            setEditingName(e.target.value)
                          }
                          onClick={(e) => e.stopPropagation()}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                              saveSemesterName(semester.id)
                            }
                          }}
                          autoFocus
                          className="w-full rounded-lg border border-border bg-surface px-3 py-2 text-sm font-semibold text-text outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                        />
                      ) : (
                        <>
                          <p className="font-semibold text-text">
                            {semester.name}
                          </p>

                          <p className="mt-1 text-sm text-text-secondary">
                            {totalCredits} Credit Units
                          </p>
                        </>
                      )}
                    </button>

                    {/* GPA */}
                    <div className="sm:text-right">
                      <p className="text-xs font-medium text-text-secondary">
                        GPA
                      </p>

                      <p className="text-xl font-bold text-primary">
                        {semesterGPA.toFixed(2)}
                      </p>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-2">
                      {isEditing ? (
                        <button
                          type="button"
                          onClick={() =>
                            saveSemesterName(semester.id)
                          }
                          className="rounded-lg px-3 py-2 text-sm font-semibold text-primary hover:bg-primary/10"
                        >
                          Save
                        </button>
                      ) : (
                        <button
                          type="button"
                          onClick={() => startRenaming(semester)}
                          className="rounded-lg px-3 py-2 text-sm font-semibold text-text-secondary hover:bg-background hover:text-primary"
                        >
                          Rename
                        </button>
                      )}

                      <button
                        type="button"
                        onClick={() => deleteSemester(semester.id)}
                        className="rounded-lg px-3 py-2 text-sm font-semibold text-error hover:bg-red-50"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>

          {/* Overall CGPA */}
          <div className="mt-6 rounded-xl bg-background p-5 text-center">
            <p className="text-sm font-medium text-text-secondary">
              Overall CGPA
            </p>

            <p className="mt-2 text-4xl font-extrabold text-primary">
              {overallCGPA.toFixed(2)}
            </p>
          </div>
        </div>

        {/* Calculator Card */}
        <div className="mt-6 rounded-2xl border border-border bg-surface p-5 shadow-sm sm:p-8">

          {/* Active Semester */}
          <div>
            <p className="text-sm font-semibold uppercase tracking-wider text-primary">
              {activeSemester?.name}
            </p>

            <h2 className="mt-1 text-2xl font-bold text-text">
              Calculate Semester GPA
            </h2>
          </div>

          {/* Grading System */}
          <div className="mt-8">
            <label
              htmlFor="grading-system"
              className="block text-sm font-semibold text-text"
            >
              Grading System
            </label>

            <select
              id="grading-system"
              value={gradingSystem}
              onChange={(e) => setGradingSystem(e.target.value)}
              className="mt-2 w-full rounded-lg border border-border bg-surface px-4 py-3 text-sm text-text outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 sm:max-w-xs"
            >
              <option value="5">5.0 Scale</option>
              <option value="4">4.0 Scale</option>
              <option value="custom">Custom</option>
            </select>

            {/* Custom Grading System */}
            {gradingSystem === 'custom' && (
              <div className="mt-6 rounded-xl border border-border bg-background p-5">
                <h3 className="text-lg font-bold text-text">
                  Custom Grade Points
                </h3>

                <p className="mt-1 text-sm text-text-secondary">
                  Enter the grade points used by your school.
                </p>

                <div className="mt-5 grid grid-cols-2 gap-4 sm:grid-cols-3">
                  {Object.keys(customGrades).map((grade) => (
                    <div key={grade}>
                      <label className="block text-sm font-semibold text-text">
                        Grade {grade}
                      </label>

                      <input
                        type="number"
                        min="0"
                        step="0.1"
                        value={customGrades[grade]}
                        onChange={(e) =>
                          updateCustomGrade(
                            grade,
                            Number(e.target.value)
                          )
                        }
                        className="mt-2 w-full rounded-lg border border-border bg-surface px-4 py-3 text-sm text-text outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Course Table */}
          <div className="mt-8">
            <div className="hidden grid-cols-[1fr_120px_120px_48px] gap-3 px-2 text-sm font-semibold text-text-secondary sm:grid">
              <span>Course</span>
              <span>Credit Units</span>
              <span>Grade</span>
              <span></span>
            </div>

            <div className="space-y-4 sm:space-y-3">
              {activeSemester?.courses.map((course) => (
                <div
                  key={course.id}
                  className="rounded-xl border border-border p-4 sm:grid sm:grid-cols-[1fr_120px_120px_48px] sm:items-center sm:gap-3 sm:border-0 sm:p-0"
                >
                  {/* Course */}
                  <div>
                    <label className="text-xs font-medium text-text-secondary sm:hidden">
                      Course
                    </label>

                    <input
                      type="text"
                      value={course.course}
                      onChange={(e) =>
                        updateCourse(
                          course.id,
                          'course',
                          e.target.value
                        )
                      }
                      placeholder="e.g. CSC 201"
                      className="mt-1 w-full rounded-lg border border-border bg-surface px-4 py-3 text-sm text-text outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                    />
                  </div>

                  {/* Credit Unit */}
                  <div className="mt-3 sm:mt-0">
                    <label className="text-xs font-medium text-text-secondary sm:hidden">
                      Credit Units
                    </label>

                    <input
                      type="number"
                      min="1"
                      value={course.creditUnit}
                      onChange={(e) =>
                        updateCourse(
                          course.id,
                          'creditUnit',
                          e.target.value
                        )
                      }
                      placeholder="3"
                      className="mt-1 w-full rounded-lg border border-border bg-surface px-4 py-3 text-sm text-text outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                    />
                  </div>

                  {/* Grade */}
                  <div className="mt-3 sm:mt-0">
                    <label className="text-xs font-medium text-text-secondary sm:hidden">
                      Grade
                    </label>

                    <select
                      value={course.grade}
                      onChange={(e) =>
                        updateCourse(
                          course.id,
                          'grade',
                          e.target.value
                        )
                      }
                      className="mt-1 w-full rounded-lg border border-border bg-surface px-4 py-3 text-sm text-text outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                    >
                      <option value="">Select</option>

                      {availableGrades.map((grade) => (
                        <option key={grade} value={grade}>
                          {grade}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Remove */}
                  <div className="mt-3 flex justify-end sm:mt-0">
                    <button
                      type="button"
                      onClick={() => removeCourse(course.id)}
                      disabled={activeSemester.courses.length === 1}
                      className="rounded-lg px-3 py-2 text-sm font-medium text-error transition hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-40"
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
              className="mt-6 rounded-lg border border-primary px-4 py-2.5 text-sm font-semibold text-primary transition hover:bg-primary hover:text-white"
            >
              + Add Course
            </button>
          </div>

          {/* Semester Result */}
          <div className="mt-8 rounded-xl bg-background p-6 text-center">
            <p className="text-sm font-medium text-text-secondary">
              {activeSemester?.name} GPA
            </p>

            <p className="mt-2 text-4xl font-extrabold text-primary">
              {activeSemester
                ? calculateSemesterGPA(activeSemester).toFixed(2)
                : '0.00'}
            </p>
          </div>

          {/* Clear */}
          <button
            type="button"
            onClick={clearCalculator}
            className="mt-6 rounded-lg border border-error px-4 py-2.5 text-sm font-semibold text-error transition hover:bg-red-50"
          >
            Clear All
          </button>
        </div>
                

       {/* Educational Content */}
<section className="mt-8 rounded-2xl border border-border bg-surface p-5 shadow-sm sm:p-8">
  <h2 className="text-2xl font-bold text-text">
    Understanding CGPA
  </h2>

  <div className="mt-6 space-y-8 text-sm leading-7 text-text-secondary">
    {/* What is CGPA? */}
    <div>
      <h3 className="text-lg font-bold text-text">
        What is CGPA?
      </h3>

      <p className="mt-2">
        CGPA stands for Cumulative Grade Point Average. It represents
        your overall academic performance across multiple semesters.
        Unlike GPA, which usually measures performance within one
        semester, CGPA combines your courses over a longer period while
        taking their credit units into account.
      </p>
    </div>

    {/* How to use */}
    <div>
      <h3 className="text-lg font-bold text-text">
        How to use the CGPA Calculator
      </h3>

      <ol className="mt-3 list-decimal space-y-2 pl-5">
        <li>Select the grading system used by your school.</li>
        <li>Enter each course and its credit units.</li>
        <li>Select the grade you received for each course.</li>
        <li>Add more courses or semesters when needed.</li>
        <li>Check your semester GPA and overall CGPA.</li>
      </ol>

      <p className="mt-3">
        If your school uses a grading scale that is not listed, select
        <strong className="font-semibold text-text"> Custom </strong>
        and enter the grade points used by your institution.
      </p>
    </div>

    {/* How is it calculated? */}
    <div>
      <h3 className="text-lg font-bold text-text">
        How is CGPA calculated?
      </h3>

      <p className="mt-2">
        CGPA is calculated by dividing your total quality points by
        your total credit units. Quality points are calculated by
        multiplying each course's credit units by the grade point
        earned in that course.
      </p>

      <div className="mt-4 rounded-xl bg-background p-4 font-medium text-text">
        CGPA = Total Quality Points ÷ Total Credit Units
      </div>
    </div>

    {/* Why credit units matter */}
    <div>
      <h3 className="text-lg font-bold text-text">
        Why do credit units matter?
      </h3>

      <p className="mt-2">
        Credit units determine how much a course contributes to your
        overall result. A course with more credit units has a greater
        effect on your GPA or CGPA than a course with fewer credit
        units when their grade points differ.
      </p>
    </div>

    {/* Multiple semesters */}
    <div>
      <h3 className="text-lg font-bold text-text">
        Calculating CGPA across multiple semesters
      </h3>

      <p className="mt-2">
        You can add multiple semesters to keep your academic results
        together. UniStack calculates the overall CGPA using the
        quality points and credit units from the courses entered
        across those semesters.
      </p>

      <p className="mt-3">
        This means your overall CGPA is not simply the average of your
        semester GPAs. The credit units from your courses are taken
        into account when calculating the cumulative result.
      </p>
    </div>

    {/* Example */}
    <div>
      <h3 className="text-lg font-bold text-text">
        Simple example
      </h3>

      <p className="mt-2">
        Suppose you take two courses: a 3-credit course with a grade
        point of 5 and a 2-credit course with a grade point of 4.
      </p>

      <div className="mt-4 rounded-xl bg-background p-4 text-text">
        <p>3 × 5 = 15 quality points</p>
        <p>2 × 4 = 8 quality points</p>
        <p className="mt-2 font-semibold">
          23 quality points ÷ 5 credit units = 4.60 GPA
        </p>
      </div>
    </div>

    {/* Grading systems */}
    <div>
      <h3 className="text-lg font-bold text-text">
        5.0, 4.0, and custom grading systems
      </h3>

      <p className="mt-2">
        Schools can use different grading scales and grade-point
        values. UniStack supports 5.0 and 4.0 grading systems, as well
        as a Custom option for institutions that use a different
        scale.
      </p>

      <p className="mt-3">
        Always use the grading system and grade points provided by
        your school. If your institution has different values, enter
        them through the Custom option rather than assuming that
        another grading scale applies.
      </p>
    </div>

    {/* Understanding result */}
    <div>
      <h3 className="text-lg font-bold text-text">
        Understanding your CGPA result
      </h3>

      <p className="mt-2">
        The number displayed by the calculator represents the
        cumulative grade point average for the courses and semesters
        you have entered. The maximum possible value depends on the
        grading system you selected.
      </p>

      <p className="mt-3">
        Your institution may also have its own rules for academic
        standing or degree classification. Use your school's official
        grading and classification requirements when interpreting your
        CGPA.
      </p>
    </div>

    {/* Important note */}
    <div className="rounded-xl bg-background p-4">
      <h3 className="font-bold text-text">
        Important note
      </h3>

      <p className="mt-2">
        UniStack calculates your result based on the information and
        grading system you provide. Check your institution's official
        academic guidelines if you are unsure about grade points,
        credit units, repeated courses, or how your school calculates
        its official CGPA.
      </p>
    </div>
  </div>
</section>

                {/* FAQ */}
<section className="mt-8 rounded-2xl border border-border bg-surface p-5 shadow-sm sm:p-8">
  <h2 className="text-2xl font-bold text-text">
    Frequently Asked Questions
  </h2>

  <div className="mt-6 space-y-6 text-sm leading-7 text-text-secondary">
    <div>
      <h3 className="text-lg font-bold text-text">
        Can I calculate CGPA for multiple semesters?
      </h3>

      <p className="mt-2">
        Yes. Add as many semesters as you need, enter the courses and
        results for each semester, and UniStack will calculate the
        overall CGPA from the courses you have entered.
      </p>
    </div>

    <div>
      <h3 className="text-lg font-bold text-text">
        Can I use a 4.0 or 5.0 grading system?
      </h3>

      <p className="mt-2">
        Yes. UniStack supports both 4.0 and 5.0 grading systems.
        Select the scale used by your school before entering your
        results.
      </p>
    </div>

    <div>
      <h3 className="text-lg font-bold text-text">
        What if my school uses a different grading system?
      </h3>

      <p className="mt-2">
        Select the Custom grading option and enter the grade points
        used by your school. This allows the calculator to work with
        grading systems that are different from the built-in 4.0 and
        5.0 scales.
      </p>
    </div>

    <div>
      <h3 className="text-lg font-bold text-text">
        Will changing my grading system delete my courses?
      </h3>

      <p className="mt-2">
        No. Changing the grading system does not remove the courses
        you have entered. Your calculator data is saved locally in
        your browser.
      </p>
    </div>

    <div>
      <h3 className="text-lg font-bold text-text">
        Does UniStack save my CGPA results?
      </h3>

      <p className="mt-2">
        Your calculator entries are stored locally in your browser so
        you can return to them later on the same browser and device.
        UniStack does not require an account for the calculator.
      </p>
    </div>

    <div>
      <h3 className="text-lg font-bold text-text">
        Can I simply average my semester GPAs to get my CGPA?
      </h3>

      <p className="mt-2">
        Not always. CGPA takes the credit units of your courses into
        account, so simply averaging semester GPAs may produce a
        different result. UniStack calculates the overall result from
        the course credit units and grade points you enter.
      </p>
    </div>

    <div>
      <h3 className="text-lg font-bold text-text">
        Why does my CGPA look different from my school's result?
      </h3>

      <p className="mt-2">
        Your school may use different grade points, credit-unit rules,
        rounding methods, or academic policies. Check that you selected
        the correct grading system and entered your results accurately.
        For official results, always use your institution's academic
        records and guidelines.
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
    Use these UniStack tools to calculate your GPA, plan your
    target CGPA, and check individual course grades.
  </p>

  <div className="mt-6 grid gap-4 sm:grid-cols-3">
    <Link
      to="/gpa-calculator"
      className="rounded-xl border border-border bg-background p-4 transition hover:border-primary hover:bg-primary/5"
    >
      <h3 className="font-bold text-text">
        GPA Calculator
      </h3>

      <p className="mt-2 text-sm leading-6 text-text-secondary">
        Calculate your GPA for a semester using your course
        grades and credit units.
      </p>
    </Link>

    <Link
      to="/cgpa-planner"
      className="rounded-xl border border-border bg-background p-4 transition hover:border-primary hover:bg-primary/5"
    >
      <h3 className="font-bold text-text">
        CGPA Target Planner
      </h3>

      <p className="mt-2 text-sm leading-6 text-text-secondary">
        Find out what GPA you may need to reach your target
        CGPA.
      </p>
    </Link>

    <Link
      to="/grade-calculator"
      className="rounded-xl border border-border bg-background p-4 transition hover:border-primary hover:bg-primary/5"
    >
      <h3 className="font-bold text-text">
        Grade Calculator
      </h3>

      <p className="mt-2 text-sm leading-6 text-text-secondary">
        Calculate your final course percentage from tests,
        assignments, exams, and other assessments.
      </p>
    </Link>
  </div>
</section>

      </div>
    </main>
    </>
  )
}

export default CGPACalculator