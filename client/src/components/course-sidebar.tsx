import { useState } from 'react';

const CourseSidebar = ({ course }) => {
  const [activeTab, setActiveTab] = useState('content'); // 'content', 'assignments', 'posts'

  return (
    <div className="w-80 bg-white shadow-lg overflow-y-auto flex-shrink-0 border-r border-gray-200">
      <div className="p-4 border-b border-gray-200 bg-gradient-to-r from-teal-500 to-cyan-500">
        <h1 className="text-lg font-bold text-white">{course.title}</h1>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200">
        {['content', 'assignments', 'posts'].map((tab) => (
          <div
            key={tab}
            className={`flex-1 p-4 text-md font-medium ${
              activeTab === tab ? 'border-b-2 bg-teal-500 text-white' : 'text-gray-500'
            }`}
            onClick={() => setActiveTab(tab)}
          >
            {tab === 'content' && 'Content'}
            {tab === 'assignments' && 'Assignments'}
            {tab === 'posts' && 'Posts'}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CourseSidebar;
