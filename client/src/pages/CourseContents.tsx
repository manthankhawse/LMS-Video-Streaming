// import { useState, useEffect } from 'react';
// import { useParams } from 'react-router-dom';
// import { Button } from "@/components/ui/button";
// import { Card } from "@/components/ui/card";
// import { CheckCircle, Circle, ChevronDown, ChevronRight, FileText, Play, Lock } from 'lucide-react';

// export default function CourseContent() {
//   const { courseId } = useParams();
//   const [course, setCourse] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
  
//   const [activeModule, setActiveModule] = useState(0);
//   const [activeLesson, setActiveLesson] = useState(0);
//   const [isVideoPlaying, setIsVideoPlaying] = useState(true);

//   useEffect(() => {
//     const fetchCourseData = async () => {
//       try {
//         setLoading(true);
//         const token = localStorage.getItem("token");
//         const response = await fetch(`http://localhost:8080/api/v1/courses/${courseId}`, {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         });
        
//         if (!response.ok) {
//           throw new Error(`Failed to fetch course data: ${response.status}`);
//         }
        
//         const data = await response.json();
//         setCourse(data);
//         setLoading(false);
//       } catch (err) {
//         console.error("Error fetching course data:", err);
//         setError(err.message);
//         setLoading(false);
//       }
//     };

//     if (courseId) {
//       fetchCourseData();
//     }
//   }, [courseId]);

//   // Toggle between video and PDF for demo purposes
//   const toggleContent = () => {
//     setIsVideoPlaying(!isVideoPlaying);
//   };

//   // Calculate the overall course progress based on completed lessons
//   const calculateProgress = () => {
//     if (!course || !course.sections) return 0;
    
//     let totalLessons = 0;
//     let completedLessons = 0;
    
//     course.sections.forEach(section => {
//       totalLessons += section.contents.length;
//       // In a real app, you would track completed lessons in user progress data
//       // For now, we'll assume none are completed (0%)
//     });
    
//     return totalLessons > 0 ? (completedLessons / totalLessons) * 100 : 0;
//   };

//   if (loading) {
//     return (
//       <div className="flex h-screen w-full bg-gray-100 items-center justify-center">
//         <div className="text-teal-600 text-xl">Loading course content...</div>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="flex h-screen w-full bg-gray-100 items-center justify-center">
//         <Card className="p-6 max-w-md">
//           <h3 className="text-xl font-bold text-red-600 mb-2">Error Loading Course</h3>
//           <p className="text-gray-700">{error}</p>
//           <Button className="mt-4 bg-teal-500 hover:bg-teal-600" onClick={() => window.location.reload()}>
//             Try Again
//           </Button>
//         </Card>
//       </div>
//     );
//   }

//   if (!course) {
//     return (
//       <div className="flex h-screen w-full bg-gray-100 items-center justify-center">
//         <Card className="p-6 max-w-md">
//           <h3 className="text-xl font-bold text-gray-800 mb-2">Course Not Found</h3>
//           <p className="text-gray-700">We couldn't find the course you're looking for.</p>
//           <Button className="mt-4 bg-teal-500 hover:bg-teal-600" onClick={() => window.history.back()}>
//             Go Back
//           </Button>
//         </Card>
//       </div>
//     );
//   }

//   const progress = calculateProgress();
//   const currentSection = course.sections[activeModule] || course.sections[0];
//   const currentLesson = currentSection?.contents[activeLesson] || currentSection?.contents[0];

//   return (
//     <div className="flex h-screen w-full bg-gray-100">
//       {/* Left Sidebar - Course Contents */}
//       <div className="w-80 bg-white shadow-lg overflow-y-auto flex-shrink-0 border-r border-gray-200">
//         <div className="p-4 border-b border-gray-200 bg-gradient-to-r from-teal-500 to-cyan-500">
//           <h1 className="text-lg font-bold text-white">{course.title}</h1>
//           <div className="mt-2 text-teal-50 text-sm">Your progress: {progress.toFixed(0)}% complete</div>
//           <div className="w-full bg-teal-200 rounded-full h-2.5 mt-2">
//             <div className="bg-white h-2.5 rounded-full" style={{ width: `${progress}%` }}></div>
//           </div>
//         </div>

//         <div className="p-2">
//           {course.sections.map((section, sectionIndex) => (
//             <div key={section.id} className="mb-2">
//               <button
//                 onClick={() => setActiveModule(sectionIndex)}
//                 className={`flex items-center justify-between w-full p-3 text-left rounded-lg ${
//                   activeModule === sectionIndex ? 'bg-teal-50 text-teal-700' : 'hover:bg-gray-50'
//                 }`}
//               >
//                 <div className="flex items-center">
//                   <Circle className="w-5 h-5 text-gray-400 mr-2" />
//                   <span className="text-sm font-medium">
//                     {section.title}
//                   </span>
//                 </div>
//                 {activeModule === sectionIndex ? (
//                   <ChevronDown className="w-5 h-5" />
//                 ) : (
//                   <ChevronRight className="w-5 h-5" />
//                 )}
//               </button>

//               {activeModule === sectionIndex && (
//                 <div className="ml-6 mt-1 border-l-2 border-gray-200 pl-2">
//                   {section.contents.map((content, contentIndex) => (
//                     <button
//                       key={content.id}
//                       onClick={() => setActiveLesson(contentIndex)}
//                       className={`flex items-center w-full p-2 text-left text-sm rounded-lg ${
//                         activeModule === sectionIndex && activeLesson === contentIndex
//                           ? 'bg-cyan-50 text-cyan-700'
//                           : 'hover:bg-gray-50'
//                       }`}
//                     >
//                       <Circle className="w-4 h-4 text-gray-400 mr-2" />
//                       <div className="flex-grow">
//                         <span>{content.title}</span>
//                         <div className="text-xs text-gray-500 flex items-center mt-1">
//                           {content.videoUrl && <Play className="w-3 h-3 mr-1" />}
//                           {content.videoUrl && 'Video'}
//                           {content.pdfUrl && <FileText className="w-3 h-3 mr-1" />}
//                           {content.pdfUrl && 'PDF'}
//                           {!content.videoUrl && !content.pdfUrl && 'Resource'}
//                         </div>
//                       </div>
//                     </button>
//                   ))}
//                 </div>
//               )}
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* Main Content Area */}
//       <div className="flex-grow overflow-y-auto">
//         {/* Top Navigation */}
//         <div className="bg-white shadow-sm border-b border-gray-200 p-4 flex justify-between items-center">
//           <div>
//             <div className="text-sm text-gray-500">Section {activeModule + 1}, Lesson {activeLesson + 1}</div>
//             <h2 className="text-xl font-bold text-gray-800">{currentLesson?.title || "No content selected"}</h2>
//           </div>
//           <div className="flex gap-2">
//             <Button 
//               variant="outline" 
//               size="sm" 
//               onClick={toggleContent}
//               className="text-teal-600 border-teal-200 hover:bg-teal-50"
//               disabled={!currentLesson?.videoUrl && !currentLesson?.pdfUrl}
//             >
//               Toggle Content Type
//             </Button>
//             <Button 
//               variant="outline" 
//               size="sm"
//               className="text-gray-600 border-gray-200 hover:bg-gray-50"
//               disabled={activeLesson === 0}
//               onClick={() => activeLesson > 0 && setActiveLesson(activeLesson - 1)}
//             >
//               Previous
//             </Button>
//             <Button 
//               size="sm"
//               className="bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-600 hover:to-cyan-600 text-white"
//               disabled={!currentSection || activeLesson === currentSection.contents.length - 1}
//               onClick={() => activeLesson < currentSection.contents.length - 1 && setActiveLesson(activeLesson + 1)}
//             >
//               Next
//             </Button>
//           </div>
//         </div>

//         {/* Content Area */}
//         <div className="p-6">
//           <Card className="overflow-hidden">
//             {currentLesson ? (
//               isVideoPlaying && currentLesson.videoUrl ? (
//                 <div className="aspect-video bg-black">
//                   <video 
//                     controls
//                     className="w-full h-full" 
//                     key={currentLesson.videoUrl}
//                     poster="/api/placeholder/1920/1080"
//                   >
//                     <source src={`http://localhost:8080/api/v1/course-content/stream/${currentLesson.videoUrl}`} type="application/x-mpegURL" />
//                     Your browser does not support HLS video playback.
//                   </video>
//                 </div>
//               ) : currentLesson.pdfUrl ? (
//                 <div className="aspect-video bg-white p-8 border flex flex-col items-center justify-center">
//                   <FileText className="w-16 h-16 text-teal-500 mb-4" />
//                   <h3 className="text-xl font-bold text-gray-800">{currentLesson.title}</h3>
//                   <p className="text-gray-500 mt-2">PDF Document</p>
//                   <Button 
//                     className="mt-4 bg-teal-500 hover:bg-teal-600 text-white"
//                     onClick={() => window.open(`http://localhost:8080/${currentLesson.pdfUrl}`, '_blank')}
//                   >
//                     Open PDF
//                   </Button>
//                 </div>
//               ) : (
//                 <div className="aspect-video bg-white p-8 border flex flex-col items-center justify-center">
//                   <FileText className="w-16 h-16 text-gray-400 mb-4" />
//                   <h3 className="text-xl font-bold text-gray-800">{currentLesson.title}</h3>
//                   <p className="text-gray-500 mt-2">Content not available</p>
//                 </div>
//               )
//             ) : (
//               <div className="aspect-video bg-white p-8 border flex flex-col items-center justify-center">
//                 <FileText className="w-16 h-16 text-gray-400 mb-4" />
//                 <h3 className="text-xl font-bold text-gray-800">No Content Selected</h3>
//                 <p className="text-gray-500 mt-2">Please select a lesson from the sidebar</p>
//               </div>
//             )}
//           </Card>

//           {/* Additional Resources */}
//           <div className="mt-6">
//             <h3 className="text-lg font-semibold text-gray-800 mb-4">Additional Resources</h3>
//             <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//               <Card className="p-4 hover:shadow-md transition-shadow cursor-pointer flex items-start">
//                 <FileText className="w-6 h-6 text-teal-500 mr-3 flex-shrink-0" />
//                 <div>
//                   <h4 className="font-medium text-gray-800">Lesson Notes</h4>
//                   <p className="text-sm text-gray-500 mt-1">Download supplementary materials for this lesson</p>
//                 </div>
//               </Card>
//               <Card className="p-4 hover:shadow-md transition-shadow cursor-pointer flex items-start">
//                 <FileText className="w-6 h-6 text-cyan-500 mr-3 flex-shrink-0" />
//                 <div>
//                   <h4 className="font-medium text-gray-800">Exercise Files</h4>
//                   <p className="text-sm text-gray-500 mt-1">Practice materials related to this lesson</p>
//                 </div>
//               </Card>
//             </div>
//           </div>

//           {/* Discussion */}
//           <div className="mt-6">
//             <h3 className="text-lg font-semibold text-gray-800 mb-4">Discussion</h3>
//             <Card className="p-4">
//               <p className="text-gray-500 text-center py-6">Join the discussion about this lesson</p>
//               <Button className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700">View Comments</Button>
//             </Card>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

import { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { CheckCircle, Circle, ChevronDown, ChevronRight, FileText, Play, Lock } from 'lucide-react';
import Hls from 'hls.js';
import CourseSidebar from '@/components/course-sidebar';

export default function CourseContent() {
  const { courseId } = useParams();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const [activeModule, setActiveModule] = useState(0);
  const [activeLesson, setActiveLesson] = useState(0);
  const [isVideoPlaying, setIsVideoPlaying] = useState(true);
  const videoRef = useRef(null); // Video element reference

  useEffect(() => {
    const fetchCourseData = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem("token");
        const response = await fetch(`http://localhost:8080/api/v1/courses/${courseId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        
        if (!response.ok) {
          throw new Error(`Failed to fetch course data: ${response.status}`);
        }
        
        const data = await response.json();
        setCourse(data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching course data:", err);
        setError(err.message);
        setLoading(false);
      }
    };

    if (courseId) {
      fetchCourseData();
    }
  }, [courseId]);

  const currentSection = course?.sections[activeModule] || course?.sections[0];
  const currentLesson = currentSection?.contents[activeLesson] || currentSection?.contents[0];

  useEffect(() => {
    if (isVideoPlaying && currentLesson?.videoUrl) {
      // Initialize HLS.js if the video URL is available
      if (Hls.isSupported()) {
        const hls = new Hls();
        hls.loadSource(`http://localhost:8080/api/v1/course-content/stream/${currentLesson.videoUrl}/master.m3u8`);
        hls.attachMedia(videoRef.current);
        hls.on(Hls.Events.MANIFEST_PARSED, function () {
          videoRef.current.play();
        });
        
        return () => {
          hls.destroy();
        };
      } else if (videoRef.current.canPlayType('application/vnd.apple.mpegurl')) {
        // Native support for HLS (for browsers like Safari)
        videoRef.current.src = `http://localhost:8080/api/v1/course-content/stream/${currentLesson.videoUrl}/master.m3u8`;
        videoRef.current.play();
      }
    }
  }, [isVideoPlaying, currentLesson?.videoUrl]);

  const toggleContent = () => {
    setIsVideoPlaying(!isVideoPlaying);
  };

  const calculateProgress = () => {
    if (!course || !course.sections) return 0;
    
    let totalLessons = 0;
    let completedLessons = 0;
    
    course.sections.forEach(section => {
      totalLessons += section.contents.length;
      // In a real app, you would track completed lessons in user progress data
    });
    
    return totalLessons > 0 ? (completedLessons / totalLessons) * 100 : 0;
  };

  if (loading) {
    return (
      <div className="flex h-screen w-full bg-gray-100 items-center justify-center">
        <div className="text-teal-600 text-xl">Loading course content...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex h-screen w-full bg-gray-100 items-center justify-center">
        <Card className="p-6 max-w-md">
          <h3 className="text-xl font-bold text-red-600 mb-2">Error Loading Course</h3>
          <p className="text-gray-700">{error}</p>
          <Button className="mt-4 bg-teal-500 hover:bg-teal-600" onClick={() => window.location.reload()}>
            Try Again
          </Button>
        </Card>
      </div>
    );
  }

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

  const progress = calculateProgress();

  return (
    <div className="flex h-screen w-full bg-gray-100">
      {/* Left Sidebar - Course Contents */}
      {/* <div className="w-80 bg-white shadow-lg overflow-y-auto flex-shrink-0 border-r border-gray-200">
        <div className="p-4 border-b border-gray-200 bg-gradient-to-r from-teal-500 to-cyan-500">
          <h1 className="text-lg font-bold text-white">{course.title}</h1>
          <div className="mt-2 text-teal-50 text-sm">Your progress: {progress.toFixed(0)}% complete</div>
          <div className="w-full bg-teal-200 rounded-full h-2.5 mt-2">
            <div className="bg-white h-2.5 rounded-full" style={{ width: `${progress}%` }}></div>
          </div>
        </div>

        <div className="p-2">
          {course.sections.map((section, sectionIndex) => (
            <div key={section.id} className="mb-2">
              <button
                onClick={() => setActiveModule(sectionIndex)}
                className={`flex items-center justify-between w-full p-3 text-left rounded-lg ${
                  activeModule === sectionIndex ? 'bg-teal-50 text-teal-700' : 'hover:bg-gray-50'
                }`}
              >
                <div className="flex items-center">
                  <Circle className="w-5 h-5 text-gray-400 mr-2" />
                  <span className="text-sm font-medium">
                    {section.title}
                  </span>
                </div>
                {activeModule === sectionIndex ? (
                  <ChevronDown className="w-5 h-5" />
                ) : (
                  <ChevronRight className="w-5 h-5" />
                )}
              </button>

              {activeModule === sectionIndex && (
                <div className="ml-6 mt-1 border-l-2 border-gray-200 pl-2">
                  {section.contents.map((content, contentIndex) => (
                    <button
                      key={content.id}
                      onClick={() => setActiveLesson(contentIndex)}
                      className={`flex items-center w-full p-2 text-left text-sm rounded-lg ${
                        activeModule === sectionIndex && activeLesson === contentIndex
                          ? 'bg-cyan-50 text-cyan-700'
                          : 'hover:bg-gray-50'
                      }`}
                    >
                      <Circle className="w-4 h-4 text-gray-400 mr-2" />
                      <div className="flex-grow">
                        <span>{content.title}</span>
                        <div className="text-xs text-gray-500 flex items-center mt-1">
                          {content.videoUrl && <Play className="w-3 h-3 mr-1" />}
                          {content.videoUrl && 'Video'}
                          {content.pdfUrl && <FileText className="w-3 h-3 mr-1" />}
                          {content.pdfUrl && 'PDF'}
                          {!content.videoUrl && !content.pdfUrl && 'Resource'}
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div> */}

      <CourseSidebar course={course}/>

      {/* Main Content Area */}
      <div className="flex-grow overflow-y-auto">
        {/* Top Navigation */}
        <div className="bg-white shadow-sm border-b border-gray-200 p-4 flex justify-between items-center">
          <div>
            <div className="text-sm text-gray-500">Section {activeModule + 1}, Lesson {activeLesson + 1}</div>
            <h2 className="text-xl font-bold text-gray-800">{currentLesson?.title || "No content selected"}</h2>
          </div>
          <div>
            <Button
              onClick={toggleContent}
              className="text-teal-500 hover:bg-teal-50"
            >
              {isVideoPlaying ? 'Pause Video' : 'Play Video'}
            </Button>
          </div>
        </div>

        {/* Video Player */}
        {currentLesson?.videoUrl && (
          <div className="flex justify-center p-4">
            <video
              ref={videoRef}
              className="h-full w-full"
              controls
              onPlay={() => setIsVideoPlaying(true)}
              onPause={() => setIsVideoPlaying(false)}
            />
          </div>
        )}
      </div>
      <div className="w-80 bg-white shadow-lg overflow-y-auto flex-shrink-0 border-r border-gray-200">

        <div className="p-2">
          {course.sections.map((section, sectionIndex) => (
            <div key={section.id} className="mb-2">
              <button
                onClick={() => setActiveModule(sectionIndex)}
                className={`flex items-center justify-between w-full p-3 text-left rounded-lg ${
                  activeModule === sectionIndex ? 'bg-teal-50 text-teal-700' : 'hover:bg-gray-50'
                }`}
              >
                <div className="flex items-center">
                  <Circle className="w-5 h-5 text-gray-400 mr-2" />
                  <span className="text-sm font-medium">
                    {section.title}
                  </span>
                </div>
                {activeModule === sectionIndex ? (
                  <ChevronDown className="w-5 h-5" />
                ) : (
                  <ChevronRight className="w-5 h-5" />
                )}
              </button>

              {activeModule === sectionIndex && (
                <div className="ml-6 mt-1 border-l-2 border-gray-200 pl-2">
                  {section.contents.map((content, contentIndex) => (
                    <button
                      key={content.id}
                      onClick={() => setActiveLesson(contentIndex)}
                      className={`flex items-center w-full p-2 text-left text-sm rounded-lg ${
                        activeModule === sectionIndex && activeLesson === contentIndex
                          ? 'bg-cyan-50 text-cyan-700'
                          : 'hover:bg-gray-50'
                      }`}
                    >
                      <Circle className="w-4 h-4 text-gray-400 mr-2" />
                      <div className="flex-grow">
                        <span>{content.title}</span>
                        <div className="text-xs text-gray-500 flex items-center mt-1">
                          {content.videoUrl && <Play className="w-3 h-3 mr-1" />}
                          {content.videoUrl && 'Video'}
                          {content.pdfUrl && <FileText className="w-3 h-3 mr-1" />}
                          {content.pdfUrl && 'PDF'}
                          {!content.videoUrl && !content.pdfUrl && 'Resource'}
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
