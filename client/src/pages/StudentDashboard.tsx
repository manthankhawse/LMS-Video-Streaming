import React from "react";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Search } from "lucide-react";
import Navbar from "@/components/navbar";
import SidebarComponent from "@/components/sidebar";

const CourseListingPage = () => {
  // Sample courses data
  const courses = [
    {
      id: 1,
      title: "Mastering Tailwind CSS",
      description: "Learn utility-first CSS with Tailwind to create responsive designs efficiently.",
      instructor: "Jane Smith",
      duration: "4 hours 30 minutes",
      progress: 35,
      modules: 4,
      imageUrl: "/api/placeholder/400/200",
      category: "Frontend"
    },
    {
      id: 1,
      title: "Mastering Tailwind CSS",
      description: "Learn utility-first CSS with Tailwind to create responsive designs efficiently.",
      instructor: "Jane Smith",
      duration: "4 hours 30 minutes",
      progress: 35,
      modules: 4,
      imageUrl: "/api/placeholder/400/200",
      category: "Frontend"
    },
    {
      id: 2,
      title: "React Fundamentals",
      description: "Master the basics of React, components, state management and hooks.",
      instructor: "John Doe",
      duration: "6 hours 15 minutes",
      progress: 68,
      modules: 5,
      imageUrl: "/api/placeholder/400/200",
      category: "Frontend"
    },
    {
      id: 3,
      title: "Node.js Essentials",
      description: "Build server-side applications with Node.js and Express.",
      instructor: "Mike Johnson",
      duration: "5 hours 45 minutes",
      progress: 12,
      modules: 6,
      imageUrl: "/api/placeholder/400/200",
      category: "Backend"
    },
    {
      id: 4,
      title: "MongoDB for Beginners",
      description: "Learn NoSQL database concepts with MongoDB.",
      instructor: "Sarah Williams",
      duration: "3 hours 20 minutes",
      progress: 0,
      modules: 3,
      imageUrl: "/api/placeholder/400/200",
      category: "Database"
    },
    {
      id: 5,
      title: "Advanced TypeScript",
      description: "Take your TypeScript skills to the next level with advanced types and patterns.",
      instructor: "David Chen",
      duration: "5 hours",
      progress: 0,
      modules: 4,
      imageUrl: "/api/placeholder/400/200",
      category: "Programming"
    },
    {
      id: 6,
      title: "UI/UX Design Principles",
      description: "Learn the fundamentals of creating user-friendly interfaces and experiences.",
      instructor: "Emily Roberts",
      duration: "4 hours 10 minutes",
      progress: 0,
      modules: 4,
      imageUrl: "/api/placeholder/400/200",
      category: "Design"
    }
  ];

  // Categories for filtering
  const categories = ["All", "Frontend", "Backend", "Database", "Programming", "Design"];
  
  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar - similar to the one in the image */}
      {/* <Navbar/> */}
      <SidebarComponent/>
      
      {/* Main content */}
      <div className="flex-1 p-6">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">My Courses</h1>
            <p className="text-gray-600">Continue learning where you left off</p>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              <input 
                type="text" 
                placeholder="Search courses..." 
                className="pl-10 pr-4 py-2 border rounded-md w-64 focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
            </div>
            <Button className="bg-teal-500 hover:bg-teal-600">
              Browse Catalog
            </Button>
          </div>
        </div>
        
        {/* Category filter */}
        <div className="flex gap-2 mb-6">
          {categories.map(category => (
            <Badge 
              key={category} 
              variant={category === "All" ? "default" : "outline"} 
              className={category === "All" ? "bg-teal-500 hover:bg-teal-600" : "hover:bg-gray-100"}
            >
              {category}
            </Badge>
          ))}
        </div>
        
        {/* In Progress section */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">In Progress</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {courses.filter(course => course.progress > 0).map(course => (
              <Card key={course.id} className="overflow-hidden hover:shadow-xl transition-shadow">
                <div className="relative">
                  <img
                    src={course.imageUrl}
                    alt={course.title}
                    className="w-full h-40 object-cover"
                  />
                  <Badge className="absolute top-2 right-2 bg-teal-500">{course.category}</Badge>
                </div>
                <CardHeader className="pb-2">
                  <CardTitle>{course.title}</CardTitle>
                  <CardDescription className="flex justify-between items-center">
                    <span>Instructor: {course.instructor}</span>
                    <Badge variant="outline">{course.modules} modules</Badge>
                  </CardDescription>
                </CardHeader>
                <CardContent className="pb-2">
                  <div className="mb-2">
                    <div className="flex justify-between text-sm mb-1">
                      <span>Progress</span>
                      <span>{course.progress}%</span>
                    </div>
                    <Progress value={course.progress} className="h-2" />
                  </div>
                  <p className="text-sm text-gray-600">{course.description}</p>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <span className="text-xs text-gray-500">Duration: {course.duration}</span>
                  <Button size="sm" className="bg-teal-500 hover:bg-teal-600">Continue</Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseListingPage;