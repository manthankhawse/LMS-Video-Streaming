import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { CheckCircle, Circle, ChevronDown, ChevronRight, FileText, Play, Lock } from 'lucide-react';

export default function CourseContent() {
  const [activeModule, setActiveModule] = useState(0);
  const [activeLesson, setActiveLesson] = useState(0);
  const [isVideoPlaying, setIsVideoPlaying] = useState(true);

  const courseModules = [
    {
      title: "Module 1: Introduction to Tailwind CSS",
      completed: true,
      lessons: [
        { title: "Welcome to the Course", type: "video", duration: "5:22", completed: true },
        { title: "Setting Up Your Environment", type: "video", duration: "8:45", completed: true },
        { title: "Understanding Utility-First CSS", type: "video", duration: "12:30", completed: true },
        { title: "Module 1 Resources", type: "pdf", pages: 5, completed: true },
        { title: "Quiz: Tailwind Basics", type: "quiz", questions: 10, completed: true }
      ]
    },
    {
      title: "Module 2: Customizing Tailwind CSS",
      completed: false,
      lessons: [
        { title: "Customizing Your Tailwind Config", type: "video", duration: "10:15", completed: true },
        { title: "Creating Custom Utilities", type: "video", duration: "14:20", completed: false },
        { title: "Working with Colors and Themes", type: "video", duration: "11:50", completed: false },
        { title: "Module 2 Workbook", type: "pdf", pages: 8, completed: false },
        { title: "Assignment: Custom Theme Creation", type: "assignment", completed: false }
      ]
    },
    {
      title: "Module 3: Integrating Tailwind CSS with Frameworks",
      completed: false,
      locked: false,
      lessons: [
        { title: "Tailwind CSS with React", type: "video", duration: "18:25", completed: false },
        { title: "Tailwind CSS with Vue.js", type: "video", duration: "16:10", completed: false },
        { title: "Tailwind CSS with Svelte", type: "video", duration: "14:05", completed: false },
        { title: "Framework Integration Guide", type: "pdf", pages: 12, completed: false }
      ]
    },
    {
      title: "Module 4: Advanced Styling Techniques",
      completed: false,
      locked: true,
      lessons: [
        { title: "Component Design Patterns", type: "video", duration: "20:30", completed: false },
        { title: "Responsive Design Mastery", type: "video", duration: "17:45", completed: false },
        { title: "Dark Mode Implementation", type: "video", duration: "15:20", completed: false },
        { title: "Advanced Techniques Handbook", type: "pdf", pages: 15, completed: false },
        { title: "Final Project", type: "assignment", completed: false }
      ]
    }
  ];

  // Toggle between video and PDF for demo purposes
  const toggleContent = () => {
    setIsVideoPlaying(!isVideoPlaying);
  };

  const currentModule = courseModules[activeModule];
  const currentLesson = currentModule.lessons[activeLesson];

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Left Sidebar - Course Contents */}
      <div className="w-80 bg-white shadow-lg overflow-y-auto flex-shrink-0 border-r border-gray-200">
        <div className="p-4 border-b border-gray-200 bg-gradient-to-r from-teal-500 to-cyan-500">
          <h1 className="text-lg font-bold text-white">Mastering Tailwind CSS</h1>
          <div className="mt-2 text-teal-50 text-sm">Your progress: 35% complete</div>
          <div className="w-full bg-teal-200 rounded-full h-2.5 mt-2">
            <div className="bg-white h-2.5 rounded-full" style={{ width: '35%' }}></div>
          </div>
        </div>

        <div className="p-2">
          {courseModules.map((module, moduleIndex) => (
            <div key={moduleIndex} className="mb-2">
              <button
                onClick={() => setActiveModule(moduleIndex)}
                className={`flex items-center justify-between w-full p-3 text-left rounded-lg ${
                  activeModule === moduleIndex ? 'bg-teal-50 text-teal-700' : 'hover:bg-gray-50'
                } ${module.locked ? 'opacity-70' : ''}`}
              >
                <div className="flex items-center">
                  {module.completed ? (
                    <CheckCircle className="w-5 h-5 text-teal-500 mr-2" />
                  ) : module.locked ? (
                    <Lock className="w-5 h-5 text-gray-400 mr-2" />
                  ) : (
                    <Circle className="w-5 h-5 text-gray-400 mr-2" />
                  )}
                  <span className={`text-sm font-medium ${module.locked ? 'text-gray-400' : ''}`}>
                    {module.title}
                  </span>
                </div>
                {activeModule === moduleIndex ? (
                  <ChevronDown className="w-5 h-5" />
                ) : (
                  <ChevronRight className="w-5 h-5" />
                )}
              </button>

              {activeModule === moduleIndex && (
                <div className="ml-6 mt-1 border-l-2 border-gray-200 pl-2">
                  {module.lessons.map((lesson, lessonIndex) => (
                    <button
                      key={lessonIndex}
                      onClick={() => !module.locked && setActiveLesson(lessonIndex)}
                      className={`flex items-center w-full p-2 text-left text-sm rounded-lg ${
                        activeModule === moduleIndex && activeLesson === lessonIndex
                          ? 'bg-cyan-50 text-cyan-700'
                          : 'hover:bg-gray-50'
                      } ${module.locked ? 'cursor-not-allowed opacity-70' : ''}`}
                    >
                      {lesson.completed ? (
                        <CheckCircle className="w-4 h-4 text-teal-500 mr-2" />
                      ) : (
                        <Circle className="w-4 h-4 text-gray-400 mr-2" />
                      )}
                      <div className="flex-grow">
                        <span>{lesson.title}</span>
                        <div className="text-xs text-gray-500 flex items-center mt-1">
                          {lesson.type === 'video' && <Play className="w-3 h-3 mr-1" />}
                          {lesson.type === 'pdf' && <FileText className="w-3 h-3 mr-1" />}
                          {lesson.type === 'video' && `Video • ${lesson.duration}`}
                          {lesson.type === 'pdf' && `PDF • ${lesson.pages} pages`}
                          {/* {lesson.type === 'quiz' && `Quiz • ${lesson.questions} questions`} */}
                          {lesson.type === 'assignment' && 'Assignment'}
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

      {/* Main Content Area */}
      <div className="flex-grow overflow-y-auto">
        {/* Top Navigation */}
        <div className="bg-white shadow-sm border-b border-gray-200 p-4 flex justify-between items-center">
          <div>
            <div className="text-sm text-gray-500">Module {activeModule + 1}, Lesson {activeLesson + 1}</div>
            <h2 className="text-xl font-bold text-gray-800">{currentLesson.title}</h2>
          </div>
          <div className="flex gap-2">
            <Button 
              variant="outline" 
              size="sm" 
              onClick={toggleContent}
              className="text-teal-600 border-teal-200 hover:bg-teal-50"
            >
              Toggle Content Type
            </Button>
            <Button 
              variant="outline" 
              size="sm"
              className="text-gray-600 border-gray-200 hover:bg-gray-50"
              disabled={activeLesson === 0}
              onClick={() => activeLesson > 0 && setActiveLesson(activeLesson - 1)}
            >
              Previous
            </Button>
            <Button 
              size="sm"
              className="bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-600 hover:to-cyan-600 text-white"
              disabled={activeLesson === currentModule.lessons.length - 1}
              onClick={() => activeLesson < currentModule.lessons.length - 1 && setActiveLesson(activeLesson + 1)}
            >
              Next
            </Button>
          </div>
        </div>

        {/* Content Area */}
        <div className="p-6">
          <Card className="overflow-hidden">
            {isVideoPlaying ? (
              <div className="aspect-video bg-black flex items-center justify-center">
                <div className="text-center p-8">
                  <div className="w-16 h-16 rounded-full bg-teal-500 flex items-center justify-center mx-auto">
                    <Play className="w-8 h-8 text-white" />
                  </div>
                  <p className="text-white mt-4 text-lg">
                    {currentLesson.title}
                    <span className="block text-sm text-gray-400 mt-1">
                      {currentLesson.type === "video" && `Duration: ${currentLesson.duration}`}
                    </span>
                  </p>
                </div>
              </div>
            ) : (
              <div className="aspect-video bg-white p-8 border flex flex-col items-center justify-center">
                <FileText className="w-16 h-16 text-teal-500 mb-4" />
                <h3 className="text-xl font-bold text-gray-800">{currentLesson.title}</h3>
                <p className="text-gray-500 mt-2">
                  {currentLesson.type === "pdf" ? `PDF Document • ${currentLesson.pages} pages` : "Document"}
                </p>
                <Button className="mt-4 bg-teal-500 hover:bg-teal-600 text-white">Open PDF</Button>
              </div>
            )}
          </Card>

          {/* Additional Resources */}
          <div className="mt-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Additional Resources</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Card className="p-4 hover:shadow-md transition-shadow cursor-pointer flex items-start">
                <FileText className="w-6 h-6 text-teal-500 mr-3 flex-shrink-0" />
                <div>
                  <h4 className="font-medium text-gray-800">Lesson Transcript</h4>
                  <p className="text-sm text-gray-500 mt-1">Download the complete transcript of this video</p>
                </div>
              </Card>
              <Card className="p-4 hover:shadow-md transition-shadow cursor-pointer flex items-start">
                <FileText className="w-6 h-6 text-cyan-500 mr-3 flex-shrink-0" />
                <div>
                  <h4 className="font-medium text-gray-800">Code Examples</h4>
                  <p className="text-sm text-gray-500 mt-1">Download the code examples used in this lesson</p>
                </div>
              </Card>
            </div>
          </div>

          {/* Discussion */}
          <div className="mt-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Discussion</h3>
            <Card className="p-4">
              <p className="text-gray-500 text-center py-6">Join the discussion about this lesson</p>
              <Button className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700">View 12 Comments</Button>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}