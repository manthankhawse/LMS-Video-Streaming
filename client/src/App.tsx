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
import Navbar from "./components/navbar";
import ExplorePage from "./pages/ExplorePage";
import { AuthProvider } from "./context/userContext";
import CourseCreationPage from "./pages/CreateCourse";
import EditCoursePage from "./pages/EditCourse";


function App() {
  return (
    <>
    <AuthProvider>
      <BrowserRouter>
      
        <Routes>
          <Route path="/login" element={<LoginPage/>}/>
          <Route path="/" element={<StudentDashboard/>}/>
          <Route path="/explore" element={<ExplorePage/>}/>
          <Route path="/signup" element={<SignUpPage/>}/>
          <Route path="/course/:courseId" element={<CourseContent/>}/>
          <Route path="/create" element={<InstructorDashboard/>}/>
          <Route path="/edit/:courseId" element={<EditCoursePage/>}/>
          <Route path="/buy/:courseId" element={<BuyCourse/>}/>
        </Routes>
      </BrowserRouter>
      </AuthProvider>
    </>
  )
}

export default App
