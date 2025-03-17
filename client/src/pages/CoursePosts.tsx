import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Circle, Play, FileText } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import {  
  Clock, 
  BookOpen
} from 'lucide-react';
import CourseSidebar from '@/components/course-sidebar';

const CoursePosts = () => {

  const { courseId } = useParams();
  const [postsData, setPostsData] = useState([]);

  
  const [course, setCourse] = useState({});


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

    const fetchPosts = async () => {
        try {
          const token = localStorage.getItem("token");
          const response = await fetch(`http://localhost:8080/api/posts/course/${courseId}`, {
            headers: { Authorization: `Bearer ${token}` },
          });
  
          if (!response.ok) throw new Error('Failed to fetch posts');
          const postData = await response.json();
          console.log(postData);
          setPostsData(postData);
        } catch (error) {
          console.error("Error fetching course:", error);
        }
      };

    fetchPosts();

    fetchCourse();
  }, [courseId]);



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
    <div className="h-screen flex w-full bg-gray-100">
       <CourseSidebar course={course}/>
      <div className="flex-grow bg-white shadow-lg overflow-y-auto flex-shrink-0 border-r border-gray-200">
            

     

      
      
      {/* Main Content */}
      <div className="container mx-auto px-4 py-6">
        {/* Posts List */}
        <div className="space-y-4">
          {postsData.map(post => (
            <Card 
              key={post.id}
              className={`p-5`}
            >
              <div className="flex items-start gap-4">
                
                <div className="flex-grow">
                  <h2 className="text-lg font-semibold text-gray-800">{post.title}</h2>
                  <div className="flex items-center text-sm text-gray-500 mt-1">
                    <span className="font-medium">{post.course.instructor.name}</span>
                    <span className="mx-1">•</span>
                    <span>Instructor</span>
                    <span className="mx-1">•</span>
                    <Clock className="w-3 h-3 mr-1" />
                    <span>{post.createdAt}</span>
                  </div>
                  <p className="mt-3 text-gray-700">{post.content}</p>
                  
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

export default CoursePosts;