import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

const InstructorDashboard = () => {
  const [selectedCourse, setSelectedCourse] = useState('all');
  const [dateRange, setDateRange] = useState('30days');
  
  // Sample data
  const stats = {
    courses: 4,
    students: 87,
    products: 2,
    completionRate: 68,
    earnings: {
      paid: 850,
      unpaid: 320
    }
  };
  
  const courseProgress = {
    notStarted: 65,
    inProgress: 22,
    completed: 13
  };
  
  const recentSubmissions = [
    { id: 1, title: 'Final Project', course: 'Web Development', lesson: 'Module 8', date: '2025-03-10', points: '95/100', status: 'Graded', type: 'Assignment' },
    { id: 2, title: 'Data Visualization', course: 'Data Science', lesson: 'Module 5', date: '2025-03-09', points: '88/100', status: 'Graded', type: 'Project' },
    { id: 3, title: 'User Research', course: 'UI/UX Design', lesson: 'Module 3', date: '2025-03-08', points: 'Pending', status: 'Submitted', type: 'Assignment' }
  ];

  return (
    <div className="flex min-h-screen bg-background">
      {/* Sidebar */}
      <div className="hidden md:flex w-64 flex-col bg-gradient-to-b from-teal-800 to-cyan-600 text-white p-6">
        <div className="flex items-center gap-2 mb-8">
          <div className="w-10 h-10 bg-white rounded flex items-center justify-center text-teal-600 font-bold">
            LD
          </div>
          <h2 className="font-bold text-xl">LearnDash LMS</h2>
        </div>
        
        <div className="space-y-1">
          {['Dashboard', 'Courses', 'Students', 'Lessons', 'Assignments', 'Quizzes', 'Reports', 'Settings'].map((item, index) => (
            <Button 
              key={index} 
              variant={item === 'Dashboard' ? 'secondary' : 'ghost'} 
              className={`w-full justify-start ${item === 'Dashboard' ? 'bg-white/10' : 'hover:bg-white/10 text-white'}`}
            >
              {item}
            </Button>
          ))}
        </div>
        
        <div className="mt-auto pt-6 border-t border-teal-700">
          <div className="flex items-center gap-3 mb-4">
            <Avatar>
              <AvatarFallback className="bg-teal-200 text-teal-800">JP</AvatarFallback>
            </Avatar>
            <div>
              <div className="font-medium">John Peterson</div>
              <div className="text-sm text-teal-200">Instructor</div>
            </div>
          </div>
          <Button variant="outline" className="w-full border-teal-500 text-white hover:bg-white/10 hover:text-white">
            Logout
          </Button>
        </div>
      </div>
      
      {/* Main Content */}
      <div className="flex-1 p-8 space-y-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <h1 className="text-3xl font-bold tracking-tight">Instructor Overview</h1>
          <div className="flex items-center gap-2">
            <Button variant="outline">Help Center</Button>
            <Button className="bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-600 hover:to-cyan-600">
              Add New Course
            </Button>
          </div>
        </div>
        
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="border-b-4 border-teal-500 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Courses</CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-full bg-teal-100 text-teal-600">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                </div>
                <span className="text-3xl font-bold">{stats.courses}</span>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="border-b-4 border-cyan-500 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Students</CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-full bg-cyan-100 text-cyan-600">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                </div>
                <span className="text-3xl font-bold">{stats.students}</span>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="border-b-4 border-teal-500 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Earnings</CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-full bg-teal-100 text-teal-600">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <span className="text-3xl font-bold">${stats.earnings.paid + stats.earnings.unpaid}</span>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="border-b-4 border-cyan-500 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Completion Rate</CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-full bg-cyan-100 text-cyan-600">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <span className="text-3xl font-bold">{stats.completionRate}%</span>
              </div>
            </CardContent>
          </Card>
        </div>
        
        {/* Charts and Tables Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Earnings */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle>Earnings</CardTitle>
              <Select value={dateRange} onValueChange={setDateRange}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Select Period" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="7days">Last 7 days</SelectItem>
                  <SelectItem value="30days">Last 30 days</SelectItem>
                  <SelectItem value="90days">Last 90 days</SelectItem>
                  <SelectItem value="year">This year</SelectItem>
                </SelectContent>
              </Select>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="space-y-6">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm font-medium text-green-600">Paid</span>
                    <span className="text-sm font-medium">${stats.earnings.paid}</span>
                  </div>
                  <Progress value={(stats.earnings.paid / (stats.earnings.paid + stats.earnings.unpaid)) * 100} className="h-2 bg-gray-200" indicatorClassName="bg-green-500" />
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm font-medium text-red-600">Unpaid</span>
                    <span className="text-sm font-medium">${stats.earnings.unpaid}</span>
                  </div>
                  <Progress value={(stats.earnings.unpaid / (stats.earnings.paid + stats.earnings.unpaid)) * 100} className="h-2 bg-gray-200" indicatorClassName="bg-red-500" />
                </div>
                
                <div className="pt-4 mt-4 border-t">
                  <div className="flex justify-between text-sm text-muted-foreground">
                    <span>$0</span>
                    <span>${stats.earnings.paid + stats.earnings.unpaid}</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          {/* Course Reports */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle>Course Reports</CardTitle>
              <Select value={selectedCourse} onValueChange={setSelectedCourse}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Select Course" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Courses</SelectItem>
                  <SelectItem value="web">Web Development</SelectItem>
                  <SelectItem value="data">Data Science</SelectItem>
                  <SelectItem value="marketing">Digital Marketing</SelectItem>
                  <SelectItem value="design">UI/UX Design</SelectItem>
                </SelectContent>
              </Select>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="flex flex-col items-center gap-4">
                <div className="relative w-40 h-40">
                  <svg viewBox="0 0 36 36" className="w-full h-full">
                    <path
                      d="M18 2.0845
                      a 15.9155 15.9155 0 0 1 0 31.831
                      a 15.9155 15.9155 0 0 1 0 -31.831"
                      fill="none"
                      stroke="#edf2f7"
                      strokeWidth="3"
                    />
                    <path
                      d="M18 2.0845
                      a 15.9155 15.9155 0 0 1 0 31.831
                      a 15.9155 15.9155 0 0 1 0 -31.831"
                      fill="none"
                      stroke="#3182ce"
                      strokeWidth="3"
                      strokeDasharray={`${courseProgress.notStarted}, 100`}
                      strokeDashoffset="25"
                    />
                    <path
                      d="M18 2.0845
                      a 15.9155 15.9155 0 0 1 0 31.831
                      a 15.9155 15.9155 0 0 1 0 -31.831"
                      fill="none"
                      stroke="#38b2ac"
                      strokeWidth="3"
                      strokeDasharray={`${courseProgress.inProgress}, 100`}
                      strokeDashoffset={`${100 - courseProgress.notStarted + 25}`}
                    />
                    <path
                      d="M18 2.0845
                      a 15.9155 15.9155 0 0 1 0 31.831
                      a 15.9155 15.9155 0 0 1 0 -31.831"
                      fill="none"
                      stroke="#48bb78"
                      strokeWidth="3"
                      strokeDasharray={`${courseProgress.completed}, 100`}
                      strokeDashoffset={`${100 - courseProgress.notStarted - courseProgress.inProgress + 25}`}
                    />
                  </svg>
                </div>
                <div className="flex justify-center gap-6">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                    <span className="text-sm">Not Started</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-teal-500"></div>
                    <span className="text-sm">In Progress</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                    <span className="text-sm">Completed</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        {/* Recent Submissions */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle>Recent Submissions</CardTitle>
            <Button variant="link" className="text-teal-600 hover:text-teal-800">View All</Button>
          </CardHeader>
          <CardContent className="pt-6">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Title</TableHead>
                  <TableHead>Course</TableHead>
                  <TableHead>Lesson</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Points</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Type</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {recentSubmissions.length > 0 ? (
                  recentSubmissions.map((submission) => (
                    <TableRow key={submission.id}>
                      <TableCell className="font-medium">{submission.title}</TableCell>
                      <TableCell>{submission.course}</TableCell>
                      <TableCell>{submission.lesson}</TableCell>
                      <TableCell>{submission.date}</TableCell>
                      <TableCell>{submission.points}</TableCell>
                      <TableCell>
                        <Badge variant={
                          submission.status === 'Graded' ? 'success' : 
                          submission.status === 'Submitted' ? 'warning' : 
                          'secondary'
                        } className={
                          submission.status === 'Graded' ? 'bg-green-100 text-green-800 hover:bg-green-100' : 
                          submission.status === 'Submitted' ? 'bg-yellow-100 text-yellow-800 hover:bg-yellow-100' : 
                          'bg-gray-100 text-gray-800 hover:bg-gray-100'
                        }>
                          {submission.status}
                        </Badge>
                      </TableCell>
                      <TableCell>{submission.type}</TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center py-6 text-muted-foreground">
                      No submissions recorded yet
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default InstructorDashboard;