import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Circle, Play, FileText } from 'lucide-react';
import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import {  
  Clock, 
  BookOpen
} from 'lucide-react';
import CourseSidebar from '@/components/course-sidebar';
import { AuthContext } from '@/context/userContext';

const CourseAssignments = () => {

  const {user} = useContext(AuthContext);
  const { courseId } = useParams();
  const [assignmentsData, setAssignmentsData] = useState([]);
  const [course, setCourse] = useState({});
  const [selectedFile, setSelectedFile] = useState(null);
  const [submitting, setSubmitting] = useState(false);


  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch(`http://localhost:8080/api/v1/courses/${courseId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!response.ok) throw new Error('Failed to fetch course');
        const courseData = await response.json();
        setCourse(courseData);
        console.log(courseData);
      } catch (error) {
        console.error("Error fetching course:", error);
      }
    };

    const fetchAssignments = async () => {
        try {
          const token = localStorage.getItem("token");
          const response = await fetch(`http://localhost:8080/api/v1/assignments/course/${courseId}/student`, {
            headers: { Authorization: `Bearer ${token}` },
          });
  
          if (!response.ok) throw new Error('Failed to fetch posts');
          const assignmentData = await response.json();
          console.log(assignmentData);
          setAssignmentsData(assignmentData);
        } catch (error) {
          console.error("Error fetching course:", error);
        }
      };

    fetchAssignments();

    fetchCourse();
  }, [courseId]);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };


  const handleSubmit = async (assignmentId) => {
    if (!selectedFile) {
      alert("Please select a file before submitting.");
      return;
    }

    setSubmitting(true);
    const formData = new FormData();
    formData.append("assignmentId", assignmentId);
    formData.append("studentId", user.id); // Assuming studentId is stored in localStorage
    formData.append("document", selectedFile);

    try {
      const token = localStorage.getItem("token");
      const response = await fetch("http://localhost:8080/api/submissions/create", {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      });

      if (!response.ok) throw new Error("Failed to submit assignment");
      alert("Submission successful!");
      setSelectedFile(null);
      window.location.reload();
    } catch (error) {
      console.error("Error submitting assignment:", error);
      alert("Submission failed.");
    } finally {
      setSubmitting(false);
    }
  };



  if (!course) {
    return (
      <div className="flex h-screen w-full bg-gray-100 items-center justify-center">
        <Card className="p-6 max-w-md">
          <h3 className="text-xl font-bold text-gray-800 mb-2">Course Not Found</h3>
          <p className="text-gray-700">We couldn't find the course you're looking for.</p>
          <Button className="mt-4 bg-teal-500 hover:bg-teal-600" onClick={() => window.history.back()}>
            Go Back
          </Button>
        </Card>
      </div>
    );
  }

  return (
    <div className="h-screen w-full flex bg-gray-100">
      <CourseSidebar course={course}/>
      <div className="flex-grow bg-white shadow-lg overflow-y-auto flex-shrink-0 border-r border-gray-200">
      
        

      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="container mx-auto px-4 py-4 flex items-center">
          <div>
            <h1 className="text-xl font-bold text-gray-800">{course.title}</h1>
            <div className="text-sm text-gray-500">Course Posts & Updates</div>
          </div>
        </div>
      </div>
      
      {/* Main Content */}
      <div className="container mx-auto px-4 py-6">
        {/* Posts List */}
        <div className="space-y-4">
          {assignmentsData.map((post, index) => (
            <Card 
              key={index}
              className={`p-5`}
            >
              <div className="flex items-start gap-4">
              <div className="ml-auto flex gap-2">
          </div>       
                <div className="flex-grow">
                  <h2 className="text-lg font-semibold text-gray-800">{post.assignment.title}</h2>
                  <div className="flex items-center text-sm text-gray-500 mt-1">
                    <span className="font-medium">{post.assignment.course.instructor.name}</span>
                    <span className="mx-1">•</span>
                    <span>Instructor</span>
                    <span className="mx-1">•</span>
                    <Clock className="w-3 h-3 mr-1" />
                    <span>{post.assignment.createdAt}</span>
                  </div>
                  <p className="mt-3 text-gray-700">{post.assignment.description}</p>
                  
                  {/* Attachments */}
                  {post.assignment.documents.length > 0 && (
                    <div className="mt-4">
                      <h3 className="text-sm font-medium text-gray-700 mb-2">Attachments</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
                        {post.assignment.documents.map((attachment, idx) => (
                          <div 
                            key={idx}
                            className="flex items-center p-3 bg-gray-50 rounded-lg border border-gray-200 hover:bg-gray-100 transition-colors cursor-pointer"
                          >
                            <FileText className={`w-5 h-5 mr-2`} />
                            <div className="overflow-hidden">
                              <a href={`http://localhost:8080${attachment}`} target='_blank'>
                                <div className="text-sm font-medium text-gray-700 truncate">Attachment {idx+1}</div>
                              </a>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {
                    post.submission ? 
                    (
                      <div className='p-4 flex items-center border border-2 rounded-md my-2'>
                    <FileText className={`w-5 h-5 mr-2`} />
                            <div className="overflow-hidden">
                              <a href={`http://localhost:8080${post.submission.filePath}`} target='_blank'>
                                <div className="text-sm font-medium text-gray-700 truncate">Submission file</div>
                              </a>
                            </div>
                  </div> 
                    )
                    :
                    (
                      <div className="p-4 border border-2 rounded-md my-2">
                      <h1 className="text-lg my-1 font-semibold">Submit File</h1>
                      <input type="file" accept=".pdf,.docx,.txt" onChange={handleFileChange} className="mb-2" />
                      <Button onClick={() => handleSubmit(post.assignment.id)} disabled={submitting} className="mt-2 bg-blue-500 hover:bg-blue-600">
                        {submitting ? "Submitting..." : "Submit"}
                      </Button>
                    </div> 
                    )
                  }
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>

      </div>
    </div>
  );
};

export default CourseAssignments;