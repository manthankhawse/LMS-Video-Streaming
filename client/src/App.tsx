import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Button } from "@/components/ui/button"
import StudentDashboard from "./pages/StudentDashboard"
import LoginPage from "./pages/LoginPage"
import SignUpPage from "./pages/SignupPage"
import BuyCourse from "./pages/BuyCourse"
import CourseContent from "./pages/CourseContents"
import CoursePosts from "./pages/CoursePosts"
import LandingPage from "./pages/LandingPage"
import InstructorDashboard from "./pages/InstructorDashboard"


function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<LoginPage/>}/>
          <Route path="/" element={<StudentDashboard/>}/>
          <Route path="/signup" element={<SignUpPage/>}/>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
