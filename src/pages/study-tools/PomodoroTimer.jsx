import { useEffect, useRef, useState } from 'react'
import SEO from '../../components/SEO'

function PomodoroTimer() {
  const timerRef = useRef(null)

  const [workMinutes, setWorkMinutes] = useState(1)
  const [shortBreakMinutes, setShortBreakMinutes] = useState(1)
  const [longBreakMinutes, setLongBreakMinutes] = useState(2)
  const [sessionsBeforeLongBreak, setSessionsBeforeLongBreak] =
    useState(2)

  const [mode, setMode] = useState('work')
  const [secondsLeft, setSecondsLeft] = useState(60)
  const [isRunning, setIsRunning] = useState(false)

  const [sessionsInCycle, setSessionsInCycle] = useState(0)
  const [completedSessions, setCompletedSessions] = useState(0)

  const [notificationMessage, setNotificationMessage] =
    useState('')

  const getDurationInSeconds = (currentMode) => {
    if (currentMode === 'work') {
      return Number(workMinutes) * 60
    }

    if (currentMode === 'shortBreak') {
      return Number(shortBreakMinutes) * 60
    }

    return Number(longBreakMinutes) * 60
  }

  const sendNotification = (title, message) => {
    setNotificationMessage(message)

    if (
      'Notification' in window &&
      Notification.permission === 'granted'
    ) {
      new Notification(title, {
        body: message,
      })
    }
  }

  const requestNotificationPermission = async () => {
    if (
      'Notification' in window &&
      Notification.permission === 'default'
    ) {
      try {
        await Notification.requestPermission()
      } catch {
        // Notification permission is optional.
        // The timer should continue working even if permission fails.
      }
    }
  }

  const formatTime = (totalSeconds) => {
    const minutes = Math.floor(totalSeconds / 60)
    const seconds = totalSeconds % 60

    return `${String(minutes).padStart(2, '0')}:${String(
      seconds
    ).padStart(2, '0')}`
  }

    /*
    TIMER EFFECT

    Starts the countdown whenever the timer is running.
    When the mode changes, the old interval is cleaned up
    and a new interval starts for the new mode.
  */
  useEffect(() => {
    if (!isRunning) {
      if (timerRef.current) {
        clearInterval(timerRef.current)
        timerRef.current = null
      }

      return
    }

    timerRef.current = setInterval(() => {
      setSecondsLeft((previousSeconds) => {
        if (previousSeconds > 0) {
          return previousSeconds - 1
        }

        return 0
      })
    }, 1000)

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current)
        timerRef.current = null
      }
    }
  }, [isRunning, mode])

  /*
    TRANSITION EFFECT

    Watches for the timer reaching 00:00
    and automatically moves to the next mode.
  */
  useEffect(() => {
    if (!isRunning || secondsLeft !== 0) {
      return
    }

    // FOCUS SESSION FINISHED
    if (mode === 'work') {
      const newSessionsInCycle =
        sessionsInCycle + 1

      setCompletedSessions(
        (previousSessions) =>
          previousSessions + 1
      )

      // Time for a long break
      if (
        newSessionsInCycle >=
        Number(sessionsBeforeLongBreak)
      ) {
        sendNotification(
          'UniStack — Focus Complete',
          'Great work! You completed your focus cycle. Time for a long break.'
        )

        setMode('longBreak')
        setSessionsInCycle(0)
        setSecondsLeft(
          Number(longBreakMinutes) * 60
        )

        return
      }

      // Time for a short break
      sendNotification(
        'UniStack — Focus Complete',
        'Great work! Time for a short break.'
      )

      setMode('shortBreak')
      setSessionsInCycle(newSessionsInCycle)
      setSecondsLeft(
        Number(shortBreakMinutes) * 60
      )

      return
    }

    // SHORT BREAK FINISHED
    if (mode === 'shortBreak') {
      sendNotification(
        'UniStack — Short Break Complete',
        'Your short break is over. Time to focus again.'
      )

      setMode('work')
      setSecondsLeft(
        Number(workMinutes) * 60
      )

      return
    }

    // LONG BREAK FINISHED
    sendNotification(
      'UniStack — Long Break Complete',
      'Your long break is over. Your next focus cycle can begin.'
    )

    setMode('work')
    setSessionsInCycle(0)
    setSecondsLeft(
      Number(workMinutes) * 60
    )
  }, [
    isRunning,
    secondsLeft,
    mode,
    workMinutes,
    shortBreakMinutes,
    longBreakMinutes,
    sessionsBeforeLongBreak,
    sessionsInCycle,
  ])

  const startTimer = () => {
    setNotificationMessage('')
    setIsRunning(true)

    // Request permission without making the timer wait for it.
    requestNotificationPermission()
  }

  const pauseTimer = () => {
    setIsRunning(false)
  }

  const resetTimer = () => {
    setIsRunning(false)
    setNotificationMessage('')
    setCompletedSessions(0)
    setSessionsInCycle(0)
    setMode('work')
    setSecondsLeft(
      Number(workMinutes) * 60
    )
  }

  const changeMode = (newMode) => {
    setIsRunning(false)
    setNotificationMessage('')
    setMode(newMode)
    setSecondsLeft(
      getDurationInSeconds(newMode)
    )
  }

  const applySettings = () => {
    const validWorkMinutes =
      Math.max(1, Number(workMinutes) || 1)

    const validShortBreakMinutes =
      Math.max(
        1,
        Number(shortBreakMinutes) || 1
      )

    const validLongBreakMinutes =
      Math.max(
        1,
        Number(longBreakMinutes) || 1
      )

    const validSessions =
      Math.max(
        1,
        Number(sessionsBeforeLongBreak) || 1
      )

    setWorkMinutes(validWorkMinutes)
    setShortBreakMinutes(
      validShortBreakMinutes
    )
    setLongBreakMinutes(
      validLongBreakMinutes
    )
    setSessionsBeforeLongBreak(
      validSessions
    )

    setIsRunning(false)
    setNotificationMessage('')
    setMode('work')
    setSessionsInCycle(0)
    setSecondsLeft(
      validWorkMinutes * 60
    )
  }

  const modeLabel =
    mode === 'work'
      ? 'Focus'
      : mode === 'shortBreak'
        ? 'Short Break'
        : 'Long Break'

  return (
    <>
      <SEO
        title="Pomodoro Timer"
        description="Use a customizable Pomodoro timer with focus sessions, short breaks, long breaks, and browser notifications to stay productive while studying with UniStack."
        breadcrumbs={[
          { name: 'UniStack', url: '/' },
          { name: 'Study Tools', url: '/pomodoro' },
          { name: 'Pomodoro Timer', url: '/pomodoro' },
        ]}
      />

      <main className="min-h-screen bg-background px-4 py-10 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <div className="mb-8">
            <p className="mb-2 text-sm font-semibold text-primary">
              Study Tool
            </p>

            <h1 className="text-3xl font-bold tracking-tight text-text sm:text-4xl">
              Pomodoro Timer
            </h1>

            <p className="mt-3 max-w-2xl text-text-secondary">
              Focus on your studies in timed sessions with automatic
              breaks to help you stay productive.
            </p>
          </div>

          <div className="grid gap-6 lg:grid-cols-2">
            {/* TIMER */}
            <section className="rounded-2xl border border-border bg-surface p-6 shadow-sm">
              <div className="text-center">
                <p className="text-sm font-semibold text-primary">
                  {modeLabel}
                </p>

                <div className="mt-6 text-7xl font-bold tracking-tight text-text sm:text-8xl">
                  {formatTime(secondsLeft)}
                </div>

                <div className="mt-6 flex justify-center gap-3">
                  {!isRunning ? (
                    <button
                      type="button"
                      onClick={startTimer}
                      className="rounded-xl bg-primary px-6 py-3 font-semibold text-white transition hover:bg-primary-dark"
                    >
                      Start
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={pauseTimer}
                      className="rounded-xl bg-primary px-6 py-3 font-semibold text-white transition hover:bg-primary-dark"
                    >
                      Pause
                    </button>
                  )}

                  <button
                    type="button"
                    onClick={resetTimer}
                    className="rounded-xl border border-border bg-surface px-6 py-3 font-semibold text-text-secondary transition hover:bg-background hover:text-text"
                  >
                    Reset
                  </button>
                </div>
              </div>

              <div className="mt-8 grid grid-cols-3 gap-3">
                <button
                  type="button"
                  onClick={() => changeMode('work')}
                  className={`rounded-xl border px-3 py-3 text-sm font-semibold transition ${
                    mode === 'work'
                      ? 'border-primary bg-primary/10 text-primary'
                      : 'border-border text-text-secondary hover:bg-background'
                  }`}
                >
                  Focus
                </button>

                <button
                  type="button"
                  onClick={() =>
                    changeMode('shortBreak')
                  }
                  className={`rounded-xl border px-3 py-3 text-sm font-semibold transition ${
                    mode === 'shortBreak'
                      ? 'border-primary bg-primary/10 text-primary'
                      : 'border-border text-text-secondary hover:bg-background'
                  }`}
                >
                  Short Break
                </button>

                <button
                  type="button"
                  onClick={() =>
                    changeMode('longBreak')
                  }
                  className={`rounded-xl border px-3 py-3 text-sm font-semibold transition ${
                    mode === 'longBreak'
                      ? 'border-primary bg-primary/10 text-primary'
                      : 'border-border text-text-secondary hover:bg-background'
                  }`}
                >
                  Long Break
                </button>
              </div>

              {notificationMessage && (
                <div className="mt-6 rounded-xl border border-primary/20 bg-primary/5 p-4">
                  <p className="text-sm font-medium text-primary">
                    {notificationMessage}
                  </p>
                </div>
              )}

              <div className="mt-6 grid grid-cols-2 gap-4">
                <div className="rounded-xl border border-border bg-background p-4 text-center">
                  <p className="text-sm text-text-secondary">
                    Completed Focus Sessions
                  </p>

                  <p className="mt-1 text-2xl font-bold text-text">
                    {completedSessions}
                  </p>
                </div>

                <div className="rounded-xl border border-border bg-background p-4 text-center">
                  <p className="text-sm text-text-secondary">
                    Sessions Until Long Break
                  </p>

                  <p className="mt-1 text-2xl font-bold text-text">
                    {Math.max(
                      Number(sessionsBeforeLongBreak) -
                        sessionsInCycle,
                      0
                    )}
                  </p>
                </div>
              </div>
            </section>

            {/* SETTINGS */}
            <section className="rounded-2xl border border-border bg-surface p-6 shadow-sm">
              <h2 className="text-xl font-bold text-text">
                Timer Settings
              </h2>

              <p className="mt-2 text-sm text-text-secondary">
                Choose how long each focus session and break should
                last.
              </p>

              <div className="mt-6 space-y-5">
                <div>
                  <label
                    htmlFor="work-minutes"
                    className="mb-2 block text-sm font-semibold text-text"
                  >
                    Focus duration
                  </label>

                  <input
                    id="work-minutes"
                    type="number"
                    min="1"
                    value={workMinutes}
                    onChange={(event) =>
                      setWorkMinutes(
                        event.target.value
                      )
                    }
                    className="w-full rounded-xl border border-border bg-surface px-4 py-3 text-text outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
                  />

                  <p className="mt-1 text-xs text-text-secondary">
                    Minutes
                  </p>
                </div>

                <div>
                  <label
                    htmlFor="short-break-minutes"
                    className="mb-2 block text-sm font-semibold text-text"
                  >
                    Short break duration
                  </label>

                  <input
                    id="short-break-minutes"
                    type="number"
                    min="1"
                    value={shortBreakMinutes}
                    onChange={(event) =>
                      setShortBreakMinutes(
                        event.target.value
                      )
                    }
                    className="w-full rounded-xl border border-border bg-surface px-4 py-3 text-text outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
                  />

                  <p className="mt-1 text-xs text-text-secondary">
                    Minutes
                  </p>
                </div>

                <div>
                  <label
                    htmlFor="long-break-minutes"
                    className="mb-2 block text-sm font-semibold text-text"
                  >
                    Long break duration
                  </label>

                  <input
                    id="long-break-minutes"
                    type="number"
                    min="1"
                    value={longBreakMinutes}
                    onChange={(event) =>
                      setLongBreakMinutes(
                        event.target.value
                      )
                    }
                    className="w-full rounded-xl border border-border bg-surface px-4 py-3 text-text outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
                  />

                  <p className="mt-1 text-xs text-text-secondary">
                    Minutes
                  </p>
                </div>

                <div>
                  <label
                    htmlFor="sessions-before-long-break"
                    className="mb-2 block text-sm font-semibold text-text"
                  >
                    Focus sessions before long break
                  </label>

                  <input
                    id="sessions-before-long-break"
                    type="number"
                    min="1"
                    value={sessionsBeforeLongBreak}
                    onChange={(event) =>
                      setSessionsBeforeLongBreak(
                        event.target.value
                      )
                    }
                    className="w-full rounded-xl border border-border bg-surface px-4 py-3 text-text outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
                  />

                  <p className="mt-1 text-xs text-text-secondary">
                    Example: 4 means a long break after every 4 focus
                    sessions.
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={applySettings}
                className="mt-6 w-full rounded-xl bg-primary px-5 py-3 font-semibold text-white transition hover:bg-primary-dark"
              >
                Apply Settings
              </button>
            </section>
          </div>

          <div className="mt-6 rounded-2xl border border-border bg-surface p-5">
            <h2 className="font-semibold text-text">
              How the Pomodoro Timer Works
            </h2>

            <p className="mt-2 text-sm leading-6 text-text-secondary">
              Choose your focus duration, break durations, and how many
              focus sessions you want before a long break. Once you
              start the timer, UniStack automatically moves between
              focus sessions and breaks.
            </p>
          </div>

          {/* Educational Content */}
          <section className="mt-8 rounded-2xl border border-border bg-surface p-5 shadow-sm sm:p-8">
            <h2 className="text-2xl font-bold text-text">
              Understanding the Pomodoro Technique
            </h2>

            <div className="mt-6 space-y-6 text-sm leading-7 text-text-secondary">
              <div>
                <h3 className="text-lg font-bold text-text">
                  What is the Pomodoro Technique?
                </h3>

                <p className="mt-2">
                  The Pomodoro Technique is a time-management method that
                  divides work into focused sessions separated by breaks.
                  The idea is to work on one task for a set period, take
                  a break, and then return to focused work.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-bold text-text">
                  How does it work?
                </h3>

                <p className="mt-2">
                  A typical Pomodoro routine uses a focus session followed
                  by a short break. After several focus sessions, a longer
                  break is taken. You can adjust these durations in
                  UniStack to fit your study routine.
                </p>

                <div className="mt-4 rounded-xl bg-background p-4 text-text">
                  <p>Focus → Short Break → Focus → Short Break</p>
                  <p className="mt-2">
                    After several focus sessions → Long Break
                  </p>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-bold text-text">
                  How can it help with studying?
                </h3>

                <p className="mt-2">
                  Timed focus sessions can give you a clear period to
                  concentrate on one task. Knowing that a break is coming
                  can also make a long study session feel more manageable.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-bold text-text">
                  How to use the UniStack Pomodoro Timer
                </h3>

                <ol className="mt-2 list-decimal space-y-2 pl-5">
                  <li>
                    Choose how long you want each focus session to last.
                  </li>
                  <li>
                    Set your short and long break durations.
                  </li>
                  <li>
                    Choose how many focus sessions you want before a long
                    break.
                  </li>
                  <li>
                    Start the timer and focus on one study task.
                  </li>
                  <li>
                    Take the scheduled break when the focus session ends.
                  </li>
                </ol>
              </div>

              <div>
                <h3 className="text-lg font-bold text-text">
                  Tips for effective Pomodoro sessions
                </h3>

                <ul className="mt-2 list-disc space-y-2 pl-5">
                  <li>
                    Choose one clear task before starting a focus session.
                  </li>
                  <li>
                    Reduce distractions while the timer is running.
                  </li>
                  <li>
                    Use your breaks to rest instead of starting another
                    demanding task.
                  </li>
                  <li>
                    Adjust the session length if your study needs are
                    different from the default settings.
                  </li>
                  <li>
                    Use longer study sessions for tasks that require
                    extended concentration if that works better for you.
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
              Use these UniStack tools to plan your study time,
              prepare for exams, and stay organized.
            </p>

            <div className="mt-6 grid gap-4 sm:grid-cols-3">
              <a
                href="/study-hours"
                className="rounded-xl border border-border bg-background p-4 transition hover:border-primary hover:bg-primary/5"
              >
                <h3 className="font-bold text-text">
                  Study Hours Calculator
                </h3>

                <p className="mt-2 text-sm leading-6 text-text-secondary">
                  Calculate how much study time you can dedicate
                  to each course.
                </p>
              </a>

              <a
                href="/exam-timetable"
                className="rounded-xl border border-border bg-background p-4 transition hover:border-primary hover:bg-primary/5"
              >
                <h3 className="font-bold text-text">
                  Exam Timetable Generator
                </h3>

                <p className="mt-2 text-sm leading-6 text-text-secondary">
                  Create a personalized study timetable for your
                  upcoming exams.
                </p>
              </a>

              <a
                href="/exam-countdown"
                className="rounded-xl border border-border bg-background p-4 transition hover:border-primary hover:bg-primary/5"
              >
                <h3 className="font-bold text-text">
                  Exam Countdown
                </h3>

                <p className="mt-2 text-sm leading-6 text-text-secondary">
                  Track how many days you have left before each
                  exam.
                </p>
              </a>
            </div>
          </section>
        </div>
      </main>
    </>
  )
}

export default PomodoroTimer