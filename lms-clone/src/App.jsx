import './App.css'
import Landing from './pages/Landing.jsx'
import Login from "./pages/Login.jsx";
import { Routes, Route } from 'react-router-dom'
import StudentDashboard from './pages/StudentDashboard.jsx';
import AttendanceDashboard from './pages/AttendanceDashboard.jsx';
import CalendarDashboard from './pages/CalendarDashboard.jsx';
import ChatDashboard from './pages/ChatDashboard.jsx';
import SemesterAttendance from './pages/SemesterAttendance.jsx';
import ApplyLeave from './pages/ApplyLeave.jsx';
import Feedback from './pages/Feedback.jsx';
import WeeklySubjectFeedback from './pages/WeeklySubjectFeedback.jsx';
import Profile from './pages/Profile.jsx';
import ProtectedRoute from './components/ProtectedRoute.jsx';

function App() {

  return (
    <div className="bg-neutral-950 min-h-screen text-white">
      <Routes>
        <Route path='/' element={<Landing />} />
        <Route path='/login' element={<Login />} />
        
        {/* Protected Student Routes */}
        <Route path='/student' element={<ProtectedRoute><StudentDashboard /></ProtectedRoute>} />
        <Route path='/student/attendance' element={<ProtectedRoute><AttendanceDashboard /></ProtectedRoute>} />
        <Route path='/student/calendar' element={<ProtectedRoute><CalendarDashboard /></ProtectedRoute>} />
        <Route path='/student/chat-groups' element={<ProtectedRoute><ChatDashboard /></ProtectedRoute>} />
        <Route path='/student/semester-attendance' element={<ProtectedRoute><SemesterAttendance /></ProtectedRoute>} />
        <Route path='/student/apply-leave' element={<ProtectedRoute><ApplyLeave /></ProtectedRoute>} />
        <Route path='/student/feedback' element={<ProtectedRoute><Feedback /></ProtectedRoute>} />
        <Route path='/student/weekly-subject-feedback' element={<ProtectedRoute><WeeklySubjectFeedback /></ProtectedRoute>} />
        <Route path='/student/profile' element={<ProtectedRoute><Profile /></ProtectedRoute>} />
      </Routes>
    </div>
  )
}

export default App