import { useEffect, useState } from 'react'
import { gradingSystems } from '../../utils/gradingSystem.js'

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
      </div>
    </main>
  )
}

export default CGPACalculator

