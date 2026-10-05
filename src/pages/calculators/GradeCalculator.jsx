import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
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


const defaultAssessments = [
  {
    id: 1,
    name: '',
    weight: '',
    score: '',
  },
]


function GradeCalculator() {
  const [gradingSystem, setGradingSystem] = useState(() => {
    return localStorage.getItem('unistack-grade-grading-system') || '5'
  })

  const [customGrades, setCustomGrades] = useState(() => {
    const savedCustomGrades = localStorage.getItem(
      'unistack-grade-custom-grades'
    )

    return savedCustomGrades
      ? JSON.parse(savedCustomGrades)
      : defaultCustomGrades
  })

  const [assessments, setAssessments] = useState(() => {
    const savedAssessments = localStorage.getItem(
      'unistack-grade-assessments'
    )

    return savedAssessments
      ? JSON.parse(savedAssessments)
      : defaultAssessments
  })

  useEffect(() => {
    localStorage.setItem(
      'unistack-grade-grading-system',
      gradingSystem
    )
  }, [gradingSystem])

  useEffect(() => {
    localStorage.setItem(
      'unistack-grade-custom-grades',
      JSON.stringify(customGrades)
    )
  }, [customGrades])

  useEffect(() => {
    localStorage.setItem(
      'unistack-grade-assessments',
      JSON.stringify(assessments)
    )
  }, [assessments])

  const addAssessment = () => {
    setAssessments([
      ...assessments,
      {
        id: Date.now(),
        name: '',
        weight: '',
        score: '',
      },
    ])
  }

  const removeAssessment = (assessmentId) => {
    setAssessments(
      assessments.filter(
        (assessment) => assessment.id !== assessmentId
      )
    )
  }

  const updateAssessment = (assessmentId, field, value) => {
    setAssessments(
      assessments.map((assessment) =>
        assessment.id === assessmentId
          ? { ...assessment, [field]: value }
          : assessment
      )
    )
  }

  const updateCustomGrade = (grade, value) => {
    setCustomGrades((previousGrades) => ({
      ...previousGrades,
      [grade]: value,
    }))
  }

  const getLetterGrade = (percentage) => {
    if (gradingSystem === 'custom') {
      const sortedGrades = Object.entries(customGrades)
        .sort(([, pointA], [, pointB]) => Number(pointB) - Number(pointA))

      if (sortedGrades.length === 0) {
        return ''
      }

      const maxPoint = Number(sortedGrades[0][1])

      if (percentage >= 70) {
        return sortedGrades.find(
          ([, point]) => Number(point) === maxPoint
        )?.[0] || ''
      }

      if (percentage >= 60) {
        return sortedGrades[1]?.[0] || sortedGrades[0][0]
      }

      if (percentage >= 50) {
        return sortedGrades[2]?.[0] || sortedGrades[0][0]
      }

      if (percentage >= 45) {
        return sortedGrades[3]?.[0] || sortedGrades[0][0]
      }

      if (percentage >= 40) {
        return sortedGrades[4]?.[0] || sortedGrades[0][0]
      }

      return sortedGrades[sortedGrades.length - 1][0]
    }

    if (gradingSystem === '5') {
      if (percentage >= 70) return 'A'
      if (percentage >= 60) return 'B'
      if (percentage >= 50) return 'C'
      if (percentage >= 45) return 'D'
      if (percentage >= 40) return 'E'
      return 'F'
    }

    if (percentage >= 70) return 'A'
    if (percentage >= 60) return 'B'
    if (percentage >= 50) return 'C'
    if (percentage >= 40) return 'D'

    return 'F'
  }

  const calculateResults = () => {
    let totalWeight = 0
    let weightedScore = 0

    assessments.forEach((assessment) => {
      const weight = Number(assessment.weight)
      const score = Number(assessment.score)

      if (
        weight > 0 &&
        score >= 0 &&
        score <= 100
      ) {
        totalWeight += weight
        weightedScore += score * (weight / 100)
      }
    })

    const percentage = weightedScore

    const letterGrade =
      totalWeight > 0
        ? getLetterGrade(percentage)
        : ''

    const gradePoints =
      gradingSystem === 'custom'
        ? customGrades[letterGrade]
        : gradingSystems[gradingSystem]?.grades[letterGrade]

    return {
      totalWeight,
      percentage,
      letterGrade,
      gradePoints:
        gradePoints !== undefined
          ? Number(gradePoints)
          : null,
    }
  }

  const clearCalculator = () => {
    localStorage.removeItem('unistack-grade-grading-system')
    localStorage.removeItem('unistack-grade-custom-grades')
    localStorage.removeItem('unistack-grade-assessments')

    setGradingSystem('5')
    setCustomGrades(defaultCustomGrades)
    setAssessments(defaultAssessments)
  }

  const results = calculateResults()

  return (
  <>
    <SEO
      title="Grade Calculator"
      description="Calculate your course grade from weighted assessments such as tests, assignments, and exams. Get accurate results with UniStack."
      breadcrumbs={[
        { name: 'UniStack', url: '/' },
        { name: 'Calculators', url: '/grade-calculator' },
        { name: 'Grade Calculator', url: '/grade-calculator' },
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
            Grade Calculator
          </h1>

          <p className="mx-auto mt-3 max-w-2xl text-text-secondary">
            Calculate your final course grade from your
            assignments, tests, exams, and other assessments.
          </p>
        </div>

        {/* Calculator */}
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

          {/* Assessments */}
          <div>
            <div className="mb-4">
              <h2 className="text-xl font-bold text-text">
                Assessments
              </h2>

              <p className="mt-1 text-sm text-text-secondary">
                Enter the weight and score for each assessment.
              </p>
            </div>

            {/* Weight warning */}
            {results.totalWeight !== 100 && (
              <div className="mb-5 rounded-lg border border-warning/30 bg-warning/10 px-4 py-3 text-sm text-text">
                Current assessment weights add up to{' '}
                <strong>{results.totalWeight}%</strong>.
                They should normally add up to 100%.
              </div>
            )}

            {/* Desktop headings */}
            <div className="mb-2 hidden grid-cols-12 gap-3 px-1 text-xs font-semibold uppercase tracking-wide text-text-secondary sm:grid">
              <div className="col-span-4">Assessment</div>
              <div className="col-span-3">Weight (%)</div>
              <div className="col-span-3">Score (%)</div>
              <div className="col-span-2"></div>
            </div>

            <div className="space-y-3">
              {assessments.map((assessment) => (
                <div
                  key={assessment.id}
                  className="rounded-xl border border-border p-4 sm:grid sm:grid-cols-12 sm:items-center sm:gap-3 sm:border-0 sm:p-0"
                >

                  {/* Assessment Name */}
                  <div className="mb-3 sm:col-span-4 sm:mb-0">
                    <label
                      htmlFor={`assessment-name-${assessment.id}`}
                      className="mb-1 block text-sm font-medium text-text sm:hidden"
                    >
                      Assessment
                    </label>

                    <input
                      id={`assessment-name-${assessment.id}`}
                      type="text"
                      placeholder="e.g. Assignment"
                      value={assessment.name}
                      onChange={(event) =>
                        updateAssessment(
                          assessment.id,
                          'name',
                          event.target.value
                        )
                      }
                      className="w-full rounded-lg border border-border bg-surface px-3 py-2.5 text-text outline-none transition placeholder:text-text-secondary/60 focus:border-primary focus:ring-2 focus:ring-primary/20"
                    />
                  </div>

                  {/* Weight */}
                  <div className="mb-3 sm:col-span-3 sm:mb-0">
                    <label
                      htmlFor={`weight-${assessment.id}`}
                      className="mb-1 block text-sm font-medium text-text sm:hidden"
                    >
                      Weight (%)
                    </label>

                    <input
                      id={`weight-${assessment.id}`}
                      type="number"
                      min="0"
                      max="100"
                      step="1"
                      placeholder="e.g. 20"
                      value={assessment.weight}
                      onChange={(event) =>
                        updateAssessment(
                          assessment.id,
                          'weight',
                          event.target.value
                        )
                      }
                      className="w-full rounded-lg border border-border bg-surface px-3 py-2.5 text-text outline-none transition placeholder:text-text-secondary/60 focus:border-primary focus:ring-2 focus:ring-primary/20"
                    />
                  </div>

                  {/* Score */}
                  <div className="mb-3 sm:col-span-3 sm:mb-0">
                    <label
                      htmlFor={`score-${assessment.id}`}
                      className="mb-1 block text-sm font-medium text-text sm:hidden"
                    >
                      Score (%)
                    </label>

                    <input
                      id={`score-${assessment.id}`}
                      type="number"
                      min="0"
                      max="100"
                      step="0.01"
                      placeholder="e.g. 85"
                      value={assessment.score}
                      onChange={(event) =>
                        updateAssessment(
                          assessment.id,
                          'score',
                          event.target.value
                        )
                      }
                      className="w-full rounded-lg border border-border bg-surface px-3 py-2.5 text-text outline-none transition placeholder:text-text-secondary/60 focus:border-primary focus:ring-2 focus:ring-primary/20"
                    />
                  </div>

                  {/* Remove */}
                  <div className="sm:col-span-2 sm:flex sm:justify-end">
                    <button
                      type="button"
                      onClick={() =>
                        removeAssessment(assessment.id)
                      }
                      disabled={assessments.length === 1}
                      className="w-full rounded-lg border border-error px-3 py-2 text-sm font-medium text-error transition hover:bg-error/10 disabled:cursor-not-allowed disabled:opacity-40 sm:w-auto"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Add Assessment */}
            <button
              type="button"
              onClick={addAssessment}
              className="mt-5 rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-primary-dark"
            >
              + Add Assessment
            </button>
          </div>
        </div>

        {/* Results */}
        <div className="mt-6 grid gap-4 sm:grid-cols-3">

          {/* Percentage */}
          <div className="rounded-2xl border border-primary/20 bg-primary/5 p-6 text-center">
            <p className="text-sm font-medium text-text-secondary">
              Final Percentage
            </p>

            <p className="mt-2 text-4xl font-extrabold text-primary">
              {results.percentage.toFixed(2)}%
            </p>
          </div>

          {/* Letter Grade */}
          <div className="rounded-2xl border border-border bg-surface p-6 text-center">
            <p className="text-sm font-medium text-text-secondary">
              Letter Grade
            </p>

            <p className="mt-2 text-4xl font-extrabold text-text">
              {results.letterGrade || '—'}
            </p>
          </div>

          {/* Grade Point */}
          <div className="rounded-2xl border border-border bg-surface p-6 text-center">
            <p className="text-sm font-medium text-text-secondary">
              Grade Point
            </p>

            <p className="mt-2 text-4xl font-extrabold text-text">
              {results.gradePoints !== null
                ? results.gradePoints
                : '—'}
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
    Understanding Course Grades
  </h2>

  <div className="mt-6 space-y-8 text-sm leading-7 text-text-secondary">
    {/* What is a weighted grade? */}
    <div>
      <h3 className="text-lg font-bold text-text">
        What is a weighted grade?
      </h3>

      <p className="mt-2">
        A weighted grade takes into account how much each assessment
        contributes to your final course result. Assignments, tests,
        exams, projects, and other assessments can have different
        weights.
      </p>
    </div>

    {/* How to use */}
    <div>
      <h3 className="text-lg font-bold text-text">
        How to use the Grade Calculator
      </h3>

      <ol className="mt-3 list-decimal space-y-2 pl-5">
        <li>Select the grading system used by your school.</li>
        <li>Enter each assessment, such as an assignment, test, or exam.</li>
        <li>Enter the percentage weight of each assessment.</li>
        <li>Enter the score you received for each assessment.</li>
        <li>Add more assessments until all parts of your course grading structure are included.</li>
        <li>Check that the assessment weights add up to 100%.</li>
        <li>Review your final percentage, letter grade, and grade point.</li>
      </ol>
    </div>

    {/* Assessment weight */}
    <div>
      <h3 className="text-lg font-bold text-text">
        What does assessment weight mean?
      </h3>

      <p className="mt-2">
        The weight is the percentage of your final grade that an
        assessment contributes. For example, if an exam is worth 70%
        of your course grade, the exam has a weight of 70%.
      </p>
    </div>

    {/* How calculation works */}
    <div>
      <h3 className="text-lg font-bold text-text">
        How is a weighted score calculated?
      </h3>

      <p className="mt-2">
        Each assessment score is multiplied by its percentage weight.
        The weighted scores are then added together to determine your
        final course percentage.
      </p>

      <div className="mt-4 rounded-xl bg-background p-4 font-medium text-text">
        Weighted Score = Score × (Weight ÷ 100)
      </div>
    </div>

    {/* Example */}
    <div>
      <h3 className="text-lg font-bold text-text">
        Simple example
      </h3>

      <p className="mt-2">
        Suppose an assignment is worth 30% and you score 80%, while
        your exam is worth 70% and you score 90%.
      </p>

      <div className="mt-4 rounded-xl bg-background p-4 text-text">
        <p>Assignment: 80 × 0.30 = 24</p>
        <p>Exam: 90 × 0.70 = 63</p>
        <p className="mt-2 font-semibold">
          Final Percentage = 24 + 63 = 87%
        </p>
      </div>
    </div>

    {/* Why weights matter */}
    <div>
      <h3 className="text-lg font-bold text-text">
        Why should the weights add up to 100%?
      </h3>

      <p className="mt-2">
        The assessment weights normally represent the complete course
        grading structure, so they should add up to 100%. If your
        weights do not total 100%, check your course outline or
        syllabus to make sure each assessment has been entered
        correctly.
      </p>
    </div>

    {/* Understanding result */}
    <div>
      <h3 className="text-lg font-bold text-text">
        Understanding your result
      </h3>

      <p className="mt-2">
        The final percentage represents the weighted result of the
        assessments you entered. The letter grade and grade point are
        determined using the grading system selected in the calculator.
      </p>

      <p className="mt-3">
        Your school may use its own grading and classification rules,
        so always compare your result with your institution's official
        grading requirements.
      </p>
    </div>

    {/* Important note */}
    <div className="rounded-xl bg-background p-4">
      <h3 className="font-bold text-text">
        Important note
      </h3>

      <p className="mt-2">
        UniStack calculates your result from the assessment scores,
        weights, and grading system you enter. If your official result
        differs, check your course outline, grading rules, rounding
        methods, and assessment requirements.
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
      <h3 className="font-bold text-text">
        What if my exam is worth 70% of my course grade?
      </h3>

      <p className="mt-2">
        Enter 70 as the exam weight and enter your exam score as a
        percentage. Add the remaining assessments and their weights
        so that the complete grading structure is represented.
      </p>
    </div>

    <div>
      <h3 className="font-bold text-text">
        What happens if my assessment weights do not total 100%?
      </h3>

      <p className="mt-2">
        UniStack shows a warning when the entered weights do not add
        up to 100%. Check your course outline or syllabus to make sure
        every assessment and its weight has been entered correctly.
      </p>
    </div>

    <div>
      <h3 className="font-bold text-text">
        Can I add assignments, tests, and exams together?
      </h3>

      <p className="mt-2">
        Yes. Add a separate assessment row for each assignment, test,
        exam, project, or other graded component in your course.
      </p>
    </div>

    <div>
      <h3 className="font-bold text-text">
        Can I use a 4.0 or 5.0 grading system?
      </h3>

      <p className="mt-2">
        Yes. UniStack supports both 4.0 and 5.0 grading systems. You
        can also use the Custom Scale option if your school uses
        different grade-point values.
      </p>
    </div>

    <div>
      <h3 className="font-bold text-text">
        Can I use my school's custom grade points?
      </h3>

      <p className="mt-2">
        Yes. Select Custom Scale and enter the grade-point values used
        by your school for each grade.
      </p>
    </div>

    <div>
      <h3 className="font-bold text-text">
        Why might my calculated grade differ from my official result?
      </h3>

      <p className="mt-2">
        Differences can result from your school's grading rules,
        assessment requirements, rounding methods, or other academic
        policies. Check your course outline and official grading
        requirements if the results differ.
      </p>
    </div>

    <div>
      <h3 className="font-bold text-text">
        Does UniStack save my grade calculation?
      </h3>

      <p className="mt-2">
        Your assessment entries and selected grading settings can be
        saved in your browser using local storage. No account is
        required.
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
    Explore other UniStack tools to calculate your GPA, track
    your cumulative performance, and plan your target CGPA.
  </p>

  <div className="mt-6 grid gap-4 sm:grid-cols-3">
    <Link
      to="/cgpa-calculator"
      className="rounded-xl border border-border bg-background p-4 transition hover:border-primary hover:bg-primary/5"
    >
      <h3 className="font-bold text-text">
        CGPA Calculator
      </h3>

      <p className="mt-2 text-sm leading-6 text-text-secondary">
        Calculate your cumulative GPA across multiple semesters.
      </p>
    </Link>

    <Link
      to="/gpa-calculator"
      className="rounded-xl border border-border bg-background p-4 transition hover:border-primary hover:bg-primary/5"
    >
      <h3 className="font-bold text-text">
        GPA Calculator
      </h3>

      <p className="mt-2 text-sm leading-6 text-text-secondary">
        Calculate your semester GPA using your grades and credit units.
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
        Find out what GPA you may need to reach your target CGPA.
      </p>
    </Link>
  </div>
</section>
        
      </div>
    </main>
    </>
  )
}

export default GradeCalculator
