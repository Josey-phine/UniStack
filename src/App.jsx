import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home.jsx'
import Navbar from './components/Navbar.jsx'

function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/cgpa-calculator" element={<div>CGPA Calculator</div>} />
        <Route path="/gpa-calculator" element={<div>GPA Calculator</div>} />
        <Route path="/grade-calculator" element={<div>Grade Calculator</div>} />

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