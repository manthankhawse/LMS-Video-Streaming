import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Circle, Play, FileText } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Clock, BookOpen } from 'lucide-react';

const EditAssignments = () => {
  const { courseId } = useParams();
  const [assignmentsData, setAssignmentsData] = useState([]);
  const [course, setCourse] = useState({});
  const [submissions, setSubmissions] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentAssignmentId, setCurrentAssignmentId] = useState(null);

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
const [newAssignment, setNewAssignment] = useState({ title: '', description: '', files: [] });

const handleAddAssignment = () => {
  setIsAddModalOpen(true);
};

const closeAddModal = () => {
  setIsAddModalOpen(false);
  setNewAssignment({ title: '', description: '', files: [] });
};

const fetchAssignments = async () => {
  try {
    const token = localStorage.getItem("token");
    const response = await fetch(`http://localhost:8080/api/v1/assignments/course/${courseId}`, {
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


    fetchAssignments();
    fetchCourse();
  }, [courseId]);

  // Fetch submissions for a specific assignment
  const fetchSubmissions = async (assignmentId) => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`http://localhost:8080/api/submissions/assignment/${assignmentId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!response.ok) throw new Error('Failed to fetch submissions');
      const submissionData = await response.json();
      setSubmissions(submissionData);
    } catch (error) {
      console.error("Error fetching submissions:", error);
    }
  };

  const submitAssignment = async () => {
    const formData = new FormData();
    formData.append("courseId", courseId);
    formData.append("title", newAssignment.title);
    formData.append("description", newAssignment.description);
    for (let file of newAssignment.files) {
      formData.append("documents", file);
    }
  
    try {
      const token = localStorage.getItem("token");
      const response = await fetch("http://localhost:8080/api/v1/assignments/create", {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      });
  
      if (!response.ok) throw new Error("Failed to create assignment");
  
      // Refresh assignments list
      fetchAssignments();
      closeAddModal();
    } catch (error) {
      console.error("Error creating assignment:", error);
    }
  };
  



  // Toggle modal for submissions
  const handleViewSubmissions = (assignmentId) => {
    setCurrentAssignmentId(assignmentId);
    fetchSubmissions(assignmentId);
    setIsModalOpen(true);
  };

  // Close the modal
  const closeModal = () => {
    setIsModalOpen(false);
    setSubmissions([]);
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
    <div className="h-screen w-full bg-gray-100">
      <div>
        <h1 className="text-4xl p-8 text-semibold">Edit Course</h1>
      </div>
      <div className="w-full mx-auto bg-white shadow-lg overflow-y-auto flex-shrink-0 border-r border-gray-200">
        <div className="flex space-x-4 border-b pb-2">
          <button 
            className="px-4 py-2 text-sm font-medium">Content</button>
          <button 
            className="px-4 py-2 text-sm font-medium">Post</button>
          <button 
            className="px-4 py-2 text-sm font-medium border-b-2 border-teal-500">Assignment</button>
        </div>

        <div className="bg-white shadow-sm border-b border-gray-200">
          <div className="container mx-auto px-4 py-4 flex items-center">
            <div>
              <h1 className="text-xl font-bold text-gray-800">{course.title}</h1>
              <div className="text-sm text-gray-500">Course Posts & Updates</div>
            </div>
            <div className="ml-auto flex gap-2">
              <Button 
                size="sm"
                className="bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-600 hover:to-cyan-600 text-white"
                onClick={handleAddAssignment}
              >
                <BookOpen className="w-4 h-4 mr-1" />
                Add Assignment
              </Button>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="container mx-auto px-4 py-6">
          {/* Assignments List */}
          <div className="space-y-4">
            {assignmentsData.map(post => (
              <Card key={post.id} className={`p-5`}>
                <div className="flex items-start gap-4">
                  <div className="flex-grow">
                    <h2 className="text-lg font-semibold text-gray-800">{post.title}</h2>
                    <div className="flex items-center text-sm text-gray-500 mt-1">
                      <span className="font-medium">{post.course.instructor.name}</span>
                      <span className="mx-1">•</span>
                      <span>Instructor</span>
                      <span className="mx-1">•</span>
                      <span>{post.createdAt}</span>
                    </div>
                    <p className="mt-3 text-gray-700">{post.description}</p>

                    {/* Attachments */}
                    {post.documents.length > 0 && (
                      <div className="mt-4">
                        <h3 className="text-sm font-medium text-gray-700 mb-2">Attachments</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
                          {post.documents.map((attachment, idx) => (
                            <div 
                              key={idx}
                              className="flex items-center p-3 bg-gray-50 rounded-lg border border-gray-200 hover:bg-gray-100 transition-colors cursor-pointer"
                            >
                              <FileText className="w-5 h-5 mr-2" />
                              <div className="overflow-hidden">
                                <a href={`http://localhost:8080${attachment}`} target='_blank'>
                                  <div className="text-sm font-medium text-gray-700 truncate">Attachment {idx + 1}</div>
                                </a>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* View Submissions Button */}
                    <div className="mt-4">
                      <Button 
                        size="sm" 
                        className="bg-teal-500 text-white"
                        onClick={() => handleViewSubmissions(post.id)}
                      >
                        View Submissions
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {isAddModalOpen && (
  <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50">
    <div className="bg-white p-6 rounded-lg shadow-lg w-96">
      <h2 className="text-xl font-semibold">Add Assignment</h2>
      <input 
        type="text"
        placeholder="Title"
        className="w-full p-2 border rounded mt-2"
        value={newAssignment.title}
        onChange={(e) => setNewAssignment({ ...newAssignment, title: e.target.value })}
      />
      <textarea
        placeholder="Description"
        className="w-full p-2 border rounded mt-2"
        value={newAssignment.description}
        onChange={(e) => setNewAssignment({ ...newAssignment, description: e.target.value })}
      />
      <input 
        type="file"
        multiple
        className="w-full p-2 border rounded mt-2"
        onChange={(e) => setNewAssignment({ ...newAssignment, files: e.target.files })}
      />
      <div className="flex justify-end mt-4">
        <Button className="bg-gray-500 text-white mr-2" onClick={closeAddModal}>Cancel</Button>
        <Button className="bg-teal-500 text-white" onClick={submitAssignment} >Add</Button>
      </div>
    </div>
  </div>
)}


      {/* Modal for Submissions */}
      {isModalOpen && (
        <div className="fixed inset-0 flex justify-center items-center shadow-xl border-2">
        <div className="bg-white p-8 rounded-lg max-w-5xl w-full h-4/5 overflow-y-auto">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">Submissions for Assignment</h2>
      <div className="mt-4">
        <ul className="space-y-4">
          {submissions.map((submission, index) => (
            <li key={index} className="border-b pb-2">
              <div className="flex flex-col space-y-1">
                <span>{submission.student.name}</span>
                <span className="text-gray-600">Submitted on {submission.submission.submittedAt}</span>
                <a href={`http://localhost:8080${submission.submission.filePath}`} target='_blank' className="text-blue-500 hover:underline">
                  View Document
                </a>
              </div>
            </li>
          ))}
        </ul>
      </div>
      <div className="mt-6 flex justify-end">
        <Button size="sm" className="bg-gray-500 text-white px-4 py-2" onClick={closeModal}>
          Close
        </Button>
      </div>
    </div>
  </div>
      )}
    </div>
  );
};

export default EditAssignments;
