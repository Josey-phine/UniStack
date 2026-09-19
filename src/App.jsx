import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home.jsx'
import CGPACalculator from './pages/calculators/CGPACalculator.jsx'
import Navbar from './components/Navbar.jsx'
import GPACalculator from './pages/calculators/GPACalculator.jsx'
import GradeCalculator from './pages/calculators/GradeCalculator.jsx'
import CGPATargetPlanner from './pages/planners/CGPATargetPlanner.jsx'
import ExamTimetableGenerator from './pages/planners/ExamTimetableGenerator.jsx'
import StudyHoursCalculator from './pages/study-tools/StudyHoursCalculator.jsx'
import PomodoroTimer from './pages/study-tools/PomodoroTimer.jsx'
import ExamCountdown from './pages/study-tools/ExamCountdown.jsx'

function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/cgpa-calculator" element={<CGPACalculator />} />
        <Route path="/gpa-calculator" element={<GPACalculator />} />
        <Route path="/grade-calculator" element={<GradeCalculator />} />

        <Route path="/cgpa-planner" element={<CGPATargetPlanner />} />
        <Route path="/exam-timetable" element={<ExamTimetableGenerator />} />

        <Route path="/study-hours" element={<StudyHoursCalculator />} />
        <Route path="/pomodoro" element={<PomodoroTimer />} />
        <Route path="/exam-countdown" element={<ExamCountdown />} />

        <Route path="/about" element={<div>About UniStack</div>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App