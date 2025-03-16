import { Button } from "@/components/ui/button";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function BuyCourse() {
  const {courseId} = useParams();
  const [course, setCourse] = useState(null);

  useEffect(() => {
    async function fetchCourse() {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch(`http://localhost:8080/api/v1/courses/${courseId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await response.json();
        setCourse(data);
      } catch (error) {
        console.error("Error fetching course:", error);
      }
    }
    fetchCourse();
  }, [courseId]);

  if (!course) {
    return <div className="text-center text-lg text-gray-700">Loading...</div>;
  }

  return (
    <React.Fragment>
      <div className="py-12 lg:py-20 w-11/12 lg:w-4/5 mx-auto rounded-2xl shadow-xl">
        <div className="container px-6 md:px-8">
          {/* Course header section */}
          <div className="flex flex-col gap-10">
            {/* Title, description, and image in one section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
              <div className="space-y-6 p-8 bg-white rounded-xl shadow-md border border-cyan-100 transition-all duration-300 hover:shadow-xl">
                <h1 className="text-4xl font-bold tracking-tight sm:text-5xl text-teal-800">
                  {course.title}
                </h1>
                <p className="max-w-full text-teal-600 text-lg/relaxed">
                  {course.description}
                </p>
                <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6 pt-2">
                  <div className="text-4xl font-bold text-teal-700">${course.price}</div>
                  <Button
                    className="bg-teal-600 hover:bg-teal-700 text-white shadow-md transition-all duration-300 hover:shadow-lg transform hover:-translate-y-1 rounded-lg px-6 py-3 font-medium"
                    size="lg"
                  >
                    Enroll Now
                  </Button>
                </div>
              </div>
              <div className="flex justify-center">
                <img
                  src={`http://localhost:8080${course.imageUrl}` || "/placeholder.svg"}
                  width="500"
                  height="300"
                  alt="Course Image"
                  className="aspect-video overflow-hidden rounded-2xl object-cover object-center shadow-xl border-2 border-cyan-100 transition-all duration-300 hover:shadow-2xl hover:scale-102"
                />
              </div>
            </div>
            
            {/* Curriculum section below */}
            <div className="bg-white rounded-2xl shadow-xl border border-cyan-50 p-8">
              <h2 className="text-3xl md:text-4xl font-bold text-teal-800 pb-6 border-b border-teal-200">Course Curriculum</h2>
              <ul className="grid gap-6 my-8">
                {course.sections.map((section) => (
                  <li key={section.id} className="border border-cyan-100 max-w-full px-6 py-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 bg-white hover:bg-cyan-50 cursor-pointer">
                    <div className="font-semibold text-xl text-teal-800">{section.title}</div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}
