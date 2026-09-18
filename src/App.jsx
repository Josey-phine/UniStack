import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home.jsx'
import CGPACalculator from './pages/calculators/CGPACalculator.jsx'
import Navbar from './components/Navbar.jsx'
import GPACalculator from './pages/calculators/GPACalculator.jsx'
import GradeCalculator from './pages/calculators/GradeCalculator.jsx'

function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/cgpa-calculator" element={<CGPACalculator />} />
        <Route path="/gpa-calculator" element={<GPACalculator />} />
        <Route path="/grade-calculator" element={<GradeCalculator />} />

        <Route path="/cgpa-planner" element={<div>CGPA Planner</div>} />
        <Route path="/exam-timetable" element={<div>Exam Timetable</div>} />

        <Route path="/study-hours" element={<div>Study Hours</div>} />
        <Route path="/pomodoro" element={<div>Pomodoro Timer</div>} />
        <Route path="/exam-countdown" element={<div>Exam Countdown</div>} />

        <Route path="/about" element={<div>About UniStack</div>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App