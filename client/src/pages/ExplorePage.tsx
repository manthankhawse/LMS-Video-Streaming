import { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import SidebarComponent from "@/components/sidebar";
import { Link } from 'react-router-dom';

const ExplorePage = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const token = localStorage.getItem('token'); // Get the Bearer token from localStorage
        const response = await fetch('http://localhost:8080/api/v1/courses/', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });

        if (response.ok) {
          const data = await response.json();
          setCourses(data); // Populate state with fetched courses
        } else {
          console.error('Failed to fetch courses:', response.statusText);
        }
      } catch (error) {
        console.error('Error fetching courses:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);
  
  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div>Loading courses...</div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen w-screen bg-gray-100">
      <SidebarComponent />
      <div className="flex-1 w-full p-6">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Explore Courses</h1>
            <p className="text-gray-600">Find courses that interest you!!</p>
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

        <div className="mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {courses.map(course => (
              <Link to={`/course/${course.id}`}>
              <Card key={course.id} className="overflow-hidden hover:shadow-xl transition-shadow">
                <div className="relative">
                  <img
                    src={`http://localhost:8080${course.imageUrl}`}
                    alt={course.title}
                    className="w-full h-40 object-cover"
                  />
                </div>
                <CardHeader className="pb-2">
                  <CardTitle>{course.title}</CardTitle>
                  <CardDescription className="flex justify-between items-center">
                    <span>Instructor: {course.instructor.name}</span>
                  </CardDescription>
                </CardHeader>
                <CardContent className="pb-2">
                  <p className="text-sm text-gray-600">{course.description}</p>
                </CardContent>
              </Card>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExplorePage;
