import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Circle, Play, FileText } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';

const EditCoursePage = () => {
  const { courseId } = useParams();
  const [course, setCourse] = useState({});
  const [newSectionTitle, setNewSectionTitle] = useState('');
  const [isAddingSection, setIsAddingSection] = useState(false);

  const [selectedSection, setSelectedSection] = useState(null);
  const [newContentTitle, setNewContentTitle] = useState('');
  const [videoFile, setVideoFile] = useState(null);
  const [pdfFile, setPdfFile] = useState(null);
  const [isAddingContent, setIsAddingContent] = useState(false);

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
      } catch (error) {
        console.error("Error fetching course:", error);
      }
    };

    fetchCourse();
  }, [courseId]);


  const handleAddContent = async () => {
    if (!newContentTitle.trim() || !selectedSection) return;

    try {
      const token = localStorage.getItem("token");
      const formData = new FormData();
      formData.append("sectionId", selectedSection.id);
      formData.append("title", newContentTitle);
      if (videoFile) formData.append("video", videoFile);
      if (pdfFile) formData.append("pdf", pdfFile);

      const response = await fetch(`http://localhost:8080/api/v1/course-content/create`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      if (!response.ok) throw new Error("Failed to add content");

      const newContent = await response.json();
      setCourse((prev) => ({
        ...prev,
        sections: prev.sections.map((section) =>
          section.id === selectedSection.id
            ? { ...section, contents: [...(section.contents || []), newContent] }
            : section
        ),
      }));

      setNewContentTitle('');
      setVideoFile(null);
      setPdfFile(null);
      setIsAddingContent(false);
    } catch (error) {
      console.error("Error adding content:", error);
    }
  };

  const handleAddSection = async () => {
    if (!newSectionTitle.trim()) return;
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`http://localhost:8080/api/v1/sections/create?course_id=${courseId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ title: newSectionTitle, position: course.sections.length || 0 }),
      });

      if (!response.ok) throw new Error("Failed to add section");

      const newSection = await response.json();
      setCourse((prev) => ({
        ...prev,
        sections: [...(prev.sections || []), newSection],
      }));
      setNewSectionTitle('');
      setIsAddingSection(false);
    } catch (error) {
      console.error("Error adding section:", error);
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
    <div className="h-screen w-full bg-gray-100">
      <div>
        <h1 className='text-4xl p-8 text-semibold'>Edit Course</h1>
      </div>
      <div className="w-full mx-auto bg-white shadow-lg overflow-y-auto flex-shrink-0 border-r border-gray-200">
        <div className="flex gap-5 items-center p-4 border-b border-gray-200 bg-gradient-to-r from-teal-500 to-cyan-500">
          <h1 className="text-lg font-bold text-white">{course.title}</h1>
          <Dialog open={isAddingSection} onOpenChange={setIsAddingSection}>
            <DialogTrigger asChild>
              <Button className="bg-cyan-900 hover:bg-white hover:text-black hover:border-2">Add Section</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New Section</DialogTitle>
              </DialogHeader>
              <Input
                placeholder="Enter section title"
                value={newSectionTitle}
                onChange={(e) => setNewSectionTitle(e.target.value)}
              />
              <DialogFooter>
                <Button onClick={handleAddSection} className="bg-teal-500 hover:bg-teal-600">
                  Save
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        <div className="p-2">
          {course.sections?.map((section) => (
            <div key={section.id} className="mb-2">
              <div className="flex items-center justify-between w-full p-3 text-left rounded-lg">
                <div className="flex items-center">
                  <Circle className="w-5 h-5 text-gray-400 mr-2" />
                  <span className="text-sm font-medium mr-4">{section.title}</span>
                </div>
                <Dialog open={isAddingContent && selectedSection?.id === section.id} onOpenChange={(open) => {
                  setSelectedSection(open ? section : null);
                  setIsAddingContent(open);
                }}>
                  <DialogTrigger asChild>
                    <Button className="text-sm bg-gray-800 text-white">+ Add Content</Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Add Content to {section.title}</DialogTitle>
                    </DialogHeader>
                    <Input
                      placeholder="Content Title"
                      value={newContentTitle}
                      onChange={(e) => setNewContentTitle(e.target.value)}
                    />
                    <h1>Video File</h1>
                    <input type="file" onChange={(e) => setVideoFile(e.target.files[0])} accept="video/*" />
                    <h1>PDF File</h1>
                    <input type="file" onChange={(e) => setPdfFile(e.target.files[0])} accept=".pdf" />
                    <DialogFooter>
                      <Button onClick={handleAddContent} className="bg-teal-500 hover:bg-teal-600">
                        Save
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>
              <div className="ml-6 mt-1 border-l-2 border-gray-200 pl-2">
                {section.contents?.map((content) => (
                  <button key={content.id} className="flex items-center w-full p-2 text-left text-sm rounded-lg">
                    <Circle className="w-4 h-4 text-gray-400 mr-2" />
                    <span>{content.title}</span>
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default EditCoursePage;