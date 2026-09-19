const difficultyScore = {
  Easy: 1,
  Medium: 2,
  Hard: 3,
}

const confidenceScore = {
  High: 1,
  Medium: 2,
  Low: 3,
}

const getDateDifference = (fromDate, toDate) => {
  const start = new Date(`${fromDate}T00:00:00`)
  const end = new Date(`${toDate}T00:00:00`)

  if (
    Number.isNaN(start.getTime()) ||
    Number.isNaN(end.getTime())
  ) {
    return 0
  }

  const difference =
    end.getTime() - start.getTime()

  return Math.ceil(
    difference / (1000 * 60 * 60 * 24)
  )
}

const getNextDate = (dateString) => {
  const date = new Date(
    `${dateString}T00:00:00`
  )

  date.setDate(date.getDate() + 1)

  const year = date.getFullYear()
  const month = String(
    date.getMonth() + 1
  ).padStart(2, '0')
  const day = String(
    date.getDate()
  ).padStart(2, '0')

  return `${year}-${month}-${day}`
}

const getPriorityScore = (
  exam,
  today,
  studyCount
) => {
  const daysUntilExam = Math.max(
    getDateDifference(
      today,
      exam.examDate
    ),
    1
  )

  const difficulty =
    difficultyScore[exam.difficulty] || 2

  const confidence =
    confidenceScore[exam.confidence] || 2

  const urgency =
    12 / daysUntilExam

  const difficultyWeight =
    difficulty * 1.5

  const confidenceWeight =
    confidence * 1.5

  const repetitionPenalty =
    (studyCount[exam.id] || 0) * 0.8

  return (
    urgency +
    difficultyWeight +
    confidenceWeight -
    repetitionPenalty
  )
}

const generateTimetable = ({
  exams,
  studyHoursPerDay,
  startDate,
}) => {
  if (
    !Array.isArray(exams) ||
    exams.length === 0 ||
    Number(studyHoursPerDay) <= 0 ||
    !startDate
  ) {
    return []
  }

  const validExams = exams.filter(
    (exam) =>
      exam &&
      typeof exam.course === 'string' &&
      exam.course.trim() &&
      exam.examDate
  )

  if (validExams.length === 0) {
    return []
  }

  const latestExamDate =
    validExams.reduce(
      (latest, exam) =>
        exam.examDate > latest
          ? exam.examDate
          : latest,
      validExams[0].examDate
    )

  const timetable = []

  const studyCount = {}

  validExams.forEach((exam) => {
    studyCount[exam.id] = 0
  })

  let currentDate = startDate

  const maxDays = 365
  let daysGenerated = 0

  while (
    currentDate < latestExamDate &&
    daysGenerated < maxDays
  ) {
    const availableExams =
      validExams.filter(
        (exam) =>
          exam.examDate > currentDate
      )

    if (availableExams.length === 0) {
      break
    }

    const prioritizedExams =
      [...availableExams]
        .map((exam) => ({
          ...exam,
          priority:
            getPriorityScore(
              exam,
              currentDate,
              studyCount
            ),
        }))
        .sort((a, b) => {
          if (
            b.priority !==
            a.priority
          ) {
            return (
              b.priority -
              a.priority
            )
          }

          if (
            a.examDate !==
            b.examDate
          ) {
            return a.examDate.localeCompare(
              b.examDate
            )
          }

          return a.course.localeCompare(
            b.course
          )
        })

    let remainingHours =
      Number(studyHoursPerDay)

    const sessions = []

    for (
      const exam of prioritizedExams
    ) {
      if (remainingHours <= 0) {
        break
      }

      const daysUntilExam =
        getDateDifference(
          currentDate,
          exam.examDate
        )

      let sessionHours = 1

      if (
        exam.difficulty ===
          'Hard' ||
        exam.confidence ===
          'Low'
      ) {
        sessionHours = 1.5
      }

      if (daysUntilExam <= 2) {
        sessionHours += 0.5
      }

      sessionHours = Math.min(
        sessionHours,
        remainingHours
      )

      sessions.push({
        course: exam.course,
        hours: sessionHours,
        examDate: exam.examDate,
        difficulty:
          exam.difficulty,
        confidence:
          exam.confidence,
      })

      studyCount[exam.id] += 1

      remainingHours -=
        sessionHours
    }

    timetable.push({
      date: currentDate,
      sessions,
      unusedHours:
        remainingHours,
    })

    currentDate =
      getNextDate(currentDate)

    daysGenerated += 1
  }

  return timetable
}

export {
  generateTimetable,
}
