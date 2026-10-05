import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import SEO from '../../components/SEO.jsx'

const defaultInputs = {
  currentCGPA: '',
  completedCredits: '',
  targetCGPA: '',
  remainingCredits: '',
}

const defaultScenario = {
  futureGPA: '',
  futureCredits: '',
}

function CGPATargetPlanner() {
  const [inputs, setInputs] = useState(() => {
    const savedInputs = localStorage.getItem(
      'unistack-cgpa-planner-inputs'
    )

    return savedInputs
      ? JSON.parse(savedInputs)
      : defaultInputs
  })

  const [scenario, setScenario] = useState(() => {
    const savedScenario = localStorage.getItem(
      'unistack-cgpa-planner-scenario'
    )

    return savedScenario
      ? JSON.parse(savedScenario)
      : defaultScenario
  })

  useEffect(() => {
    localStorage.setItem(
      'unistack-cgpa-planner-inputs',
      JSON.stringify(inputs)
    )
  }, [inputs])

  useEffect(() => {
    localStorage.setItem(
      'unistack-cgpa-planner-scenario',
      JSON.stringify(scenario)
    )
  }, [scenario])

  const updateInput = (field, value) => {
    setInputs((previousInputs) => ({
      ...previousInputs,
      [field]: value,
    }))
  }

  const updateScenario = (field, value) => {
    setScenario((previousScenario) => ({
      ...previousScenario,
      [field]: value,
    }))
  }

  const calculateResults = () => {
    const currentCGPA = Number(inputs.currentCGPA)
    const completedCredits = Number(inputs.completedCredits)
    const targetCGPA = Number(inputs.targetCGPA)
    const remainingCredits = Number(inputs.remainingCredits)

    if (
      currentCGPA < 0 ||
      completedCredits <= 0 ||
      targetCGPA <= 0 ||
      remainingCredits <= 0
    ) {
      return null
    }

    const currentQualityPoints =
      currentCGPA * completedCredits

    const targetTotalQualityPoints =
      targetCGPA *
      (completedCredits + remainingCredits)

    const requiredQualityPoints =
      targetTotalQualityPoints - currentQualityPoints

    const requiredGPA =
      requiredQualityPoints / remainingCredits

    return {
      requiredGPA,
      currentQualityPoints,
      targetTotalQualityPoints,
    }
  }

  const calculateScenario = () => {
    const currentCGPA = Number(inputs.currentCGPA)
    const completedCredits = Number(inputs.completedCredits)
    const futureGPA = Number(scenario.futureGPA)
    const futureCredits = Number(scenario.futureCredits)

    if (
      currentCGPA < 0 ||
      completedCredits <= 0 ||
      futureGPA < 0 ||
      futureCredits <= 0
    ) {
      return null
    }

    const currentQualityPoints =
      currentCGPA * completedCredits

    const futureQualityPoints =
      futureGPA * futureCredits

    const newTotalQualityPoints =
      currentQualityPoints + futureQualityPoints

    const newTotalCredits =
      completedCredits + futureCredits

    const projectedCGPA =
      newTotalQualityPoints / newTotalCredits

    return {
      projectedCGPA,
      newTotalQualityPoints,
      newTotalCredits,
    }
  }

  const results = calculateResults()
  const scenarioResult = calculateScenario()

  const clearPlanner = () => {
    localStorage.removeItem('unistack-cgpa-planner-inputs')
    localStorage.removeItem('unistack-cgpa-planner-scenario')

    setInputs(defaultInputs)
    setScenario(defaultScenario)
  }

  const hasValidInputs =
    Number(inputs.currentCGPA) >= 0 &&
    Number(inputs.completedCredits) > 0 &&
    Number(inputs.targetCGPA) > 0 &&
    Number(inputs.remainingCredits) > 0

  const hasValidScenario =
    Number(inputs.currentCGPA) >= 0 &&
    Number(inputs.completedCredits) > 0 &&
    Number(scenario.futureGPA) >= 0 &&
    Number(scenario.futureCredits) > 0

  const requiredGPA = results?.requiredGPA ?? null

  const isImpossible =
    requiredGPA !== null && requiredGPA > 5

  const isAlreadyReached =
    requiredGPA !== null && requiredGPA <= 0

  return (
    <>
      <SEO
        title="CGPA Target Planner"
        description="Plan your target CGPA, calculate the GPA you need to reach your goal, and explore future GPA scenarios with UniStack."
        breadcrumbs={[
          { name: 'UniStack', url: '/' },
          { name: 'Planners', url: '/cgpa-planner' },
          { name: 'CGPA Target Planner', url: '/cgpa-planner' },
        ]}
      />

      <main className="min-h-screen bg-background px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl">

        {/* Header */}
        <div className="mb-8 text-center">
          <p className="mb-2 text-sm font-semibold uppercase tracking-wide text-primary">
            Academic Planner
          </p>

          <h1 className="text-3xl font-extrabold tracking-tight text-text sm:text-4xl">
            CGPA Target Planner
          </h1>

          <p className="mx-auto mt-3 max-w-2xl text-text-secondary">
            Find out the GPA you need to reach your target and
            explore different future GPA scenarios.
          </p>
        </div>

        {/* Main Planner */}
        <div className="rounded-2xl border border-border bg-surface p-5 shadow-sm sm:p-8">

          <div className="mb-6">
            <h2 className="text-xl font-bold text-text">
              Enter Your Academic Details
            </h2>

            <p className="mt-1 text-sm text-text-secondary">
              Use your current CGPA and credit units to plan
              toward your target.
            </p>
          </div>

          <div className="grid gap-5 sm:grid-cols-2">

            {/* Current CGPA */}
            <div>
              <label
                htmlFor="current-cgpa"
                className="mb-2 block text-sm font-semibold text-text"
              >
                Current CGPA
              </label>

              <input
                id="current-cgpa"
                type="number"
                min="0"
                max="5"
                step="0.01"
                placeholder="e.g. 4.00"
                value={inputs.currentCGPA}
                onChange={(event) =>
                  updateInput(
                    'currentCGPA',
                    event.target.value
                  )
                }
                className="w-full rounded-lg border border-border bg-surface px-4 py-3 text-text outline-none transition placeholder:text-text-secondary/60 focus:border-primary focus:ring-2 focus:ring-primary/20"
              />

              <p className="mt-1 text-xs text-text-secondary">
                Your current cumulative GPA.
              </p>
            </div>

            {/* Completed Credits */}
            <div>
              <label
                htmlFor="completed-credits"
                className="mb-2 block text-sm font-semibold text-text"
              >
                Completed Credit Units
              </label>

              <input
                id="completed-credits"
                type="number"
                min="1"
                step="1"
                placeholder="e.g. 60"
                value={inputs.completedCredits}
                onChange={(event) =>
                  updateInput(
                    'completedCredits',
                    event.target.value
                  )
                }
                className="w-full rounded-lg border border-border bg-surface px-4 py-3 text-text outline-none transition placeholder:text-text-secondary/60 focus:border-primary focus:ring-2 focus:ring-primary/20"
              />

              <p className="mt-1 text-xs text-text-secondary">
                Total credits you've completed so far.
              </p>
            </div>

            {/* Target CGPA */}
            <div>
              <label
                htmlFor="target-cgpa"
                className="mb-2 block text-sm font-semibold text-text"
              >
                Target CGPA
              </label>

              <input
                id="target-cgpa"
                type="number"
                min="0"
                max="5"
                step="0.01"
                placeholder="e.g. 4.50"
                value={inputs.targetCGPA}
                onChange={(event) =>
                  updateInput(
                    'targetCGPA',
                    event.target.value
                  )
                }
                className="w-full rounded-lg border border-border bg-surface px-4 py-3 text-text outline-none transition placeholder:text-text-secondary/60 focus:border-primary focus:ring-2 focus:ring-primary/20"
              />

              <p className="mt-1 text-xs text-text-secondary">
                The CGPA you want to graduate with.
              </p>
            </div>

            {/* Remaining Credits */}
            <div>
              <label
                htmlFor="remaining-credits"
                className="mb-2 block text-sm font-semibold text-text"
              >
                Remaining Credit Units
              </label>

              <input
                id="remaining-credits"
                type="number"
                min="1"
                step="1"
                placeholder="e.g. 90"
                value={inputs.remainingCredits}
                onChange={(event) =>
                  updateInput(
                    'remainingCredits',
                    event.target.value
                  )
                }
                className="w-full rounded-lg border border-border bg-surface px-4 py-3 text-text outline-none transition placeholder:text-text-secondary/60 focus:border-primary focus:ring-2 focus:ring-primary/20"
              />

              <p className="mt-1 text-xs text-text-secondary">
                Credits you still have left to complete.
              </p>
            </div>
          </div>
        </div>

        {/* Main Results */}
        {hasValidInputs && results && (
          <div className="mt-6">

            <div className="rounded-2xl border border-primary/20 bg-primary/5 p-6 text-center sm:p-8">
              <p className="text-sm font-semibold uppercase tracking-wide text-text-secondary">
                Required Average GPA
              </p>

              <p className="mt-3 text-5xl font-extrabold text-primary">
                {requiredGPA.toFixed(2)}
              </p>

              {isImpossible ? (
                <p className="mx-auto mt-4 max-w-xl text-sm text-error">
                  This target would require an average GPA above
                  5.00 over your remaining credits, so it cannot
                  be reached on a 5.0 grading scale with these
                  numbers.
                </p>
              ) : isAlreadyReached ? (
                <p className="mx-auto mt-4 max-w-xl text-sm text-success">
                  You have already reached or exceeded your target
                  based on the information entered.
                </p>
              ) : (
                <p className="mx-auto mt-4 max-w-xl text-sm text-text-secondary">
                  You need to maintain an average GPA of{' '}
                  <strong className="text-text">
                    {requiredGPA.toFixed(2)}
                  </strong>{' '}
                  across your remaining credit units.
                </p>
              )}
            </div>

            <div className="mt-4 grid gap-4 sm:grid-cols-3">

              <div className="rounded-2xl border border-border bg-surface p-5 text-center">
                <p className="text-sm text-text-secondary">
                  Current Quality Points
                </p>

                <p className="mt-2 text-2xl font-bold text-text">
                  {results.currentQualityPoints.toFixed(2)}
                </p>
              </div>

              <div className="rounded-2xl border border-border bg-surface p-5 text-center">
                <p className="text-sm text-text-secondary">
                  Target CGPA
                </p>

                <p className="mt-2 text-2xl font-bold text-text">
                  {Number(inputs.targetCGPA).toFixed(2)}
                </p>
              </div>

              <div className="rounded-2xl border border-border bg-surface p-5 text-center">
                <p className="text-sm text-text-secondary">
                  Remaining Credits
                </p>

                <p className="mt-2 text-2xl font-bold text-text">
                  {Number(inputs.remainingCredits)}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* What-If Scenario */}
        <div className="mt-8 rounded-2xl border border-border bg-surface p-5 shadow-sm sm:p-8">

          <div className="mb-6">
            <p className="mb-2 text-sm font-semibold uppercase tracking-wide text-primary">
              ⭐ What-If Scenario
            </p>

            <h2 className="text-2xl font-bold text-text">
              What if I get this GPA?
            </h2>

            <p className="mt-2 text-sm text-text-secondary">
              Enter a future GPA and the number of credits you
              expect to take. We'll estimate your new CGPA.
            </p>
          </div>

          <div className="grid gap-5 sm:grid-cols-2">

            {/* Future GPA */}
            <div>
              <label
                htmlFor="future-gpa"
                className="mb-2 block text-sm font-semibold text-text"
              >
                Expected GPA
              </label>

              <input
                id="future-gpa"
                type="number"
                min="0"
                max="5"
                step="0.01"
                placeholder="e.g. 4.50"
                value={scenario.futureGPA}
                onChange={(event) =>
                  updateScenario(
                    'futureGPA',
                    event.target.value
                  )
                }
                className="w-full rounded-lg border border-border bg-surface px-4 py-3 text-text outline-none transition placeholder:text-text-secondary/60 focus:border-primary focus:ring-2 focus:ring-primary/20"
              />
            </div>

            {/* Future Credits */}
            <div>
              <label
                htmlFor="future-credits"
                className="mb-2 block text-sm font-semibold text-text"
              >
                Future Credit Units
              </label>

              <input
                id="future-credits"
                type="number"
                min="1"
                step="1"
                placeholder="e.g. 20"
                value={scenario.futureCredits}
                onChange={(event) =>
                  updateScenario(
                    'futureCredits',
                    event.target.value
                  )
                }
                className="w-full rounded-lg border border-border bg-surface px-4 py-3 text-text outline-none transition placeholder:text-text-secondary/60 focus:border-primary focus:ring-2 focus:ring-primary/20"
              />
            </div>
          </div>

          {hasValidScenario && scenarioResult && (
            <div className="mt-6 rounded-xl border border-primary/20 bg-primary/5 p-6 text-center">

              <p className="text-sm font-medium text-text-secondary">
                Projected CGPA
              </p>

              <p className="mt-2 text-4xl font-extrabold text-primary">
                {scenarioResult.projectedCGPA.toFixed(2)}
              </p>

              <p className="mt-3 text-sm text-text-secondary">
                If you earn a{' '}
                <strong className="text-text">
                  {Number(scenario.futureGPA).toFixed(2)}
                </strong>{' '}
                GPA over{' '}
                <strong className="text-text">
                  {Number(scenario.futureCredits)}
                </strong>{' '}
                credits, your projected CGPA would be{' '}
                <strong className="text-text">
                  {scenarioResult.projectedCGPA.toFixed(2)}
                </strong>.
              </p>
            </div>
          )}

          {!hasValidScenario && (
            <div className="mt-6 rounded-xl border border-border bg-background p-5 text-center">
              <p className="text-sm text-text-secondary">
                Enter your expected GPA and future credit units
                to see your projected CGPA.
              </p>
            </div>
          )}
        </div>

        {/* Clear */}
        <div className="mt-6 text-center">
          <button
            type="button"
            onClick={clearPlanner}
            className="text-sm font-medium text-error transition hover:underline"
          >
            Clear All
          </button>
        </div>
               
               {/* Educational Content */}
<section className="mt-8 rounded-2xl border border-border bg-surface p-5 shadow-sm sm:p-8">
  <h2 className="text-2xl font-bold text-text">
    Understanding CGPA Target Planning
  </h2>

  <div className="mt-6 space-y-8 text-sm leading-7 text-text-secondary">
    {/* What is a CGPA target? */}
    <div>
      <h3 className="text-lg font-bold text-text">
        What is a CGPA target?
      </h3>

      <p className="mt-2">
        A CGPA target is the cumulative grade point average you want
        to achieve by the end of your programme or academic period.
        Setting a target can help you understand the GPA you need in
        your remaining courses.
      </p>
    </div>

    {/* How to use */}
    <div>
      <h3 className="text-lg font-bold text-text">
        How to use the CGPA Target Planner
      </h3>

      <ol className="mt-3 list-decimal space-y-2 pl-5">
        <li>Enter your current CGPA.</li>
        <li>Enter the total credit units you have already completed.</li>
        <li>Enter the CGPA you want to achieve.</li>
        <li>Enter the credit units you still have remaining.</li>
        <li>Check the required average GPA shown by the planner.</li>
        <li>Use the What-If Scenario to explore different future GPA results.</li>
      </ol>

      <p className="mt-3">
        Use the credit-unit values from your official academic records
        or course structure to make the calculation as accurate as
        possible.
      </p>
    </div>

    {/* How it works */}
    <div>
      <h3 className="text-lg font-bold text-text">
        How does CGPA target planning work?
      </h3>

      <p className="mt-2">
        The planner uses your current CGPA and completed credit units
        to determine your current quality points. It then calculates
        how many total quality points would be needed to reach your
        target CGPA after including your remaining credit units.
      </p>

      <div className="mt-4 rounded-xl bg-background p-4 font-medium text-text">
        Required GPA = Required Quality Points ÷ Remaining Credit Units
      </div>
    </div>

    {/* Why credit units matter */}
    <div>
      <h3 className="text-lg font-bold text-text">
        Why do credit units matter?
      </h3>

      <p className="mt-2">
        Credit units determine how much different courses or academic
        periods contribute to your cumulative result. More credit units
        mean a larger contribution to the overall CGPA.
      </p>

      <p className="mt-3">
        This is why the planner needs both your completed credit units
        and your remaining credit units rather than using CGPA alone.
      </p>
    </div>

    {/* What-if planning */}
    <div>
      <h3 className="text-lg font-bold text-text">
        What-If planning
      </h3>

      <p className="mt-2">
        The What-If Scenario lets you explore possible future results.
        Enter an expected GPA and the number of credits you plan to
        complete to see how those results could affect your projected
        CGPA.
      </p>

      <p className="mt-3">
        You can try different GPA and credit combinations to compare
        possible outcomes before deciding what academic target to work
        toward.
      </p>
    </div>

    {/* Simple example */}
    <div>
      <h3 className="text-lg font-bold text-text">
        Simple example
      </h3>

      <p className="mt-2">
        Suppose your current CGPA is 4.00 after completing 60 credit
        units, and you have 40 credit units remaining. If your target
        CGPA is 4.40, the planner calculates the average GPA you would
        need across those remaining credits.
      </p>

      <div className="mt-4 rounded-xl bg-background p-4 text-text">
        <p>Current quality points: 4.00 × 60 = 240</p>
        <p>Total credits after completion: 60 + 40 = 100</p>
        <p>Target quality points: 4.40 × 100 = 440</p>
        <p className="mt-2 font-semibold">
          Required GPA: (440 − 240) ÷ 40 = 5.00
        </p>
      </div>
    </div>

    {/* Understanding result */}
    <div>
      <h3 className="text-lg font-bold text-text">
        Understanding your result
      </h3>

      <p className="mt-2">
        The Required Average GPA shows the average GPA you would need
        across all of your remaining credit units to reach the target
        CGPA you entered.
      </p>

      <p className="mt-3">
        If the required GPA is above 5.00, the target cannot be reached
        using a 5.0 grading scale with the numbers entered. If the
        planner indicates that your target has already been reached,
        you do not need additional GPA to reach that particular target
        based on the information provided.
      </p>
    </div>

    {/* Important note */}
    <div className="rounded-xl bg-background p-4">
      <h3 className="font-bold text-text">
        Important note
      </h3>

      <p className="mt-2">
        The planner provides an estimate based on the CGPA, credit
        units, and future GPA values you enter. Your actual final CGPA
        depends on the grades and credit units you eventually complete.
        Always use your school's official academic records and grading
        rules when making academic decisions.
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
    Use these UniStack tools to calculate your current performance
    and organize your study preparation.
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
      to="/exam-timetable"
      className="rounded-xl border border-border bg-background p-4 transition hover:border-primary hover:bg-primary/5"
    >
      <h3 className="font-bold text-text">
        Exam Timetable Generator
      </h3>

      <p className="mt-2 text-sm leading-6 text-text-secondary">
        Create a study timetable based on your upcoming exams and available study time.
      </p>
    </Link>
  </div>
</section> 

      </div>
    </main>
    </>
  )
}

export default CGPATargetPlanner
