import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { 
  FileText, 
  MessageSquare, 
  ChevronLeft, 
  Clock, 
  Paperclip, 
  ThumbsUp, 
  BookOpen,
  Bell,
  Filter,
  Search
} from 'lucide-react';

export default function CoursePosts() {
  const [activeFilter, setActiveFilter] = useState('all');
  
  const filters = [
    { id: 'all', label: 'All Posts' },
    { id: 'announcements', label: 'Announcements' },
    { id: 'materials', label: 'Course Materials' },
    { id: 'questions', label: 'Q&A' }
  ];
  
  const posts = [
    {
      id: 1,
      type: 'announcement',
      pinned: true,
      title: 'Welcome to Module 2!',
      content: 'I hope you enjoyed Module 1. We\'re now ready to dive deeper into customizing Tailwind CSS. This module will cover configuration options, creating custom utilities, and working with themes. Make sure to check out the additional resources I\'ve attached below.',
      author: {
        name: 'Dr. Sarah Johnson',
        role: 'Instructor',
        avatar: '/placeholder.svg'
      },
      date: 'Mar 10, 2025',
      attachments: [
        { name: 'Module2_Overview.pdf', size: '1.2 MB', type: 'pdf' }
      ],
      likes: 24,
      comments: 8
    },
    {
      id: 2,
      type: 'material',
      title: 'Additional Resources for Tailwind Configuration',
      content: 'Here are some additional resources that will help you better understand Tailwind configuration options. I\'ve included a starter template, a cheat sheet for common utilities, and some examples of advanced configurations.',
      author: {
        name: 'Dr. Sarah Johnson',
        role: 'Instructor',
        avatar: '/placeholder.svg'
      },
      date: 'Mar 8, 2025',
      attachments: [
        { name: 'tailwind-starter.zip', size: '3.4 MB', type: 'zip' },
        { name: 'tailwind-cheatsheet.pdf', size: '842 KB', type: 'pdf' },
        { name: 'advanced-config-examples.js', size: '15 KB', type: 'js' }
      ],
      likes: 32,
      comments: 5
    },
    {
      id: 3,
      type: 'question',
      title: 'Common Questions About Custom Utilities',
      content: 'I\'ve noticed several students asking similar questions about creating custom utilities. Let me address the most common ones here. Remember that the Tailwind documentation is also an excellent resource for these topics.',
      author: {
        name: 'Dr. Sarah Johnson',
        role: 'Instructor',
        avatar: '/placeholder.svg'
      },
      date: 'Mar 5, 2025',
      attachments: [],
      likes: 18,
      comments: 12
    },
    {
      id: 4,
      type: 'announcement',
      title: 'Live Q&A Session - Friday, March 14',
      content: 'I\'ll be hosting a live Q&A session this Friday at 3:00 PM EST to answer your questions about the material we\'ve covered so far. Please come prepared with your questions! We\'ll be focusing on Module 1 and the first part of Module 2.',
      author: {
        name: 'Dr. Sarah Johnson',
        role: 'Instructor',
        avatar: '/placeholder.svg'
      },
      date: 'Mar 3, 2025',
      attachments: [
        { name: 'QA_Session_Details.pdf', size: '520 KB', type: 'pdf' }
      ],
      likes: 42,
      comments: 16
    },
    {
      id: 5,
      type: 'material',
      title: 'Code Examples from Today\'s Lecture',
      content: 'As promised, here are the code examples we worked through in today\'s lecture. I\'ve also included the completed project for those who want to see the final result. Remember to try implementing these concepts in your own projects!',
      author: {
        name: 'Dr. Sarah Johnson',
        role: 'Instructor',
        avatar: '/placeholder.svg'
      },
      date: 'Feb 28, 2025',
      attachments: [
        { name: 'lecture-examples.zip', size: '5.7 MB', type: 'zip' },
        { name: 'completed-project.zip', size: '8.2 MB', type: 'zip' }
      ],
      likes: 29,
      comments: 7
    }
  ];
  
  const filteredPosts = activeFilter === 'all' 
    ? posts 
    : posts.filter(post => post.type === activeFilter.slice(0, -1));

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="container mx-auto px-4 py-4 flex items-center">
          <Button 
            variant="outline" 
            size="sm" 
            className="mr-4"
          >
            <ChevronLeft className="w-4 h-4 mr-1" />
            Back to Course
          </Button>
          <div>
            <h1 className="text-xl font-bold text-gray-800">Mastering Tailwind CSS</h1>
            <div className="text-sm text-gray-500">Course Posts & Updates</div>
          </div>
          <div className="ml-auto flex gap-2">
            <Button 
              variant="outline" 
              size="sm"
              className="bg-white text-gray-700 border-gray-200"
            >
              <Bell className="w-4 h-4 mr-1" />
              Notifications
            </Button>
            <Button 
              size="sm"
              className="bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-600 hover:to-cyan-600 text-white"
            >
              <BookOpen className="w-4 h-4 mr-1" />
              Resume Course
            </Button>
          </div>
        </div>
      </div>
      
      {/* Main Content */}
      <div className="container mx-auto px-4 py-6">
        {/* Filters and Search */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
          <div className="flex overflow-x-auto pb-2 sm:pb-0 w-full sm:w-auto">
            {filters.map(filter => (
              <button
                key={filter.id}
                onClick={() => setActiveFilter(filter.id)}
                className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap ${
                  activeFilter === filter.id
                    ? 'bg-teal-500 text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-50'
                } mr-2 shadow-sm`}
              >
                {filter.label}
              </button>
            ))}
          </div>
          <div className="flex w-full sm:w-auto gap-2">
            <div className="relative flex-grow">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search posts..."
                className="pl-10 pr-4 py-2 border border-gray-200 rounded-lg w-full sm:w-64 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
              />
            </div>
            <Button variant="outline" size="sm" className="bg-white">
              <Filter className="w-4 h-4 mr-1" />
              Filter
            </Button>
          </div>
        </div>
        
        {/* Posts List */}
        <div className="space-y-4">
          {filteredPosts.map(post => (
            <Card 
              key={post.id}
              className={`p-5 ${post.pinned ? 'border-l-4 border-l-teal-500' : ''}`}
            >
              {post.pinned && (
                <div className="inline-block px-2 py-1 rounded-full bg-teal-50 text-teal-700 text-xs font-medium mb-2">
                  Pinned Post
                </div>
              )}
              <div className="flex items-start gap-4">
                <img 
                  src={post.author.avatar} 
                  alt={post.author.name}
                  className="w-10 h-10 rounded-full object-cover bg-gray-200"
                />
                <div className="flex-grow">
                  <h2 className="text-lg font-semibold text-gray-800">{post.title}</h2>
                  <div className="flex items-center text-sm text-gray-500 mt-1">
                    <span className="font-medium">{post.author.name}</span>
                    <span className="mx-1">•</span>
                    <span>{post.author.role}</span>
                    <span className="mx-1">•</span>
                    <Clock className="w-3 h-3 mr-1" />
                    <span>{post.date}</span>
                  </div>
                  <p className="mt-3 text-gray-700">{post.content}</p>
                  
                  {/* Attachments */}
                  {post.attachments.length > 0 && (
                    <div className="mt-4">
                      <h3 className="text-sm font-medium text-gray-700 mb-2">Attachments</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
                        {post.attachments.map((attachment, idx) => (
                          <div 
                            key={idx}
                            className="flex items-center p-3 bg-gray-50 rounded-lg border border-gray-200 hover:bg-gray-100 transition-colors cursor-pointer"
                          >
                            <FileText className={`w-5 h-5 mr-2 ${
                              attachment.type === 'pdf' ? 'text-red-500' :
                              attachment.type === 'zip' ? 'text-teal-500' :
                              'text-cyan-500'
                            }`} />
                            <div className="overflow-hidden">
                              <div className="text-sm font-medium text-gray-700 truncate">{attachment.name}</div>
                              <div className="text-xs text-gray-500">{attachment.size}</div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  {/* Actions */}
                  <div className="mt-4 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <button className="flex items-center text-gray-500 hover:text-teal-600">
                        <ThumbsUp className="w-4 h-4 mr-1" />
                        <span className="text-sm">{post.likes}</span>
                      </button>
                      <button className="flex items-center text-gray-500 hover:text-teal-600">
                        <MessageSquare className="w-4 h-4 mr-1" />
                        <span className="text-sm">{post.comments} comments</span>
                      </button>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      className="text-gray-700 bg-white hover:bg-gray-50"
                    >
                      View Details
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
      
      {/* New Post Button (Fixed) */}
      <div className="fixed bottom-6 right-6">
        <Button
          size="lg"
          className="rounded-full shadow-lg bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-600 hover:to-cyan-600 text-white h-14 w-14 flex items-center justify-center"
        >
          <Paperclip className="w-6 h-6" />
        </Button>
      </div>
    </div>
  );
}