import React, { useState } from "react";
import { 
  Bell, 
  Search, 
  ChevronDown, 
  Menu,
  X,
  BookOpen,
  MessageSquare,
  Calendar,
  User
} from "lucide-react";
import { 
  Avatar, 
  AvatarFallback, 
  AvatarImage 
} from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  return (
    <nav className="bg-white border-b border-gray-200 shadow-sm sticky top-0 z-50">
      <div className="w-screen mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo and main nav */}
          <div className="flex items-center">
            {/* Mobile menu button */}
            <div className="flex items-center md:hidden">
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="text-gray-600 hover:text-teal-500"
              >
                {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
              </Button>
            </div>
            
            {/* Logo */}
            <div className="flex-shrink-0 flex items-center">
              <BookOpen className="h-8 w-8 text-teal-500" />
              <span className="ml-2 text-xl font-bold text-gray-800">LearnWise</span>
            </div>
            
            {/* Main Navigation - Desktop */}
            <div className="hidden md:ml-8 md:flex md:space-x-6">
              <a href="#" className="flex items-center border-b-2 border-teal-500 px-1 pt-1 text-sm font-medium text-teal-600">
                Dashboard
              </a>
              <a href="#" className="flex items-center border-b-2 border-transparent px-1 pt-1 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700">
                My Courses
              </a>
              <a href="#" className="flex items-center border-b-2 border-transparent px-1 pt-1 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700">
                Calendar
              </a>
              <a href="#" className="flex items-center border-b-2 border-transparent px-1 pt-1 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700">
                Resources
              </a>
              <DropdownMenu>
                <DropdownMenuTrigger className="flex items-center border-b-2 border-transparent px-1 pt-1 text-sm font-medium text-gray-500 hover:text-gray-700 hover:border-gray-300 outline-none">
                  <span>Community</span>
                  <ChevronDown className="ml-1 h-4 w-4" />
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start">
                  <DropdownMenuItem>Discussion Forums</DropdownMenuItem>
                  <DropdownMenuItem>Study Groups</DropdownMenuItem>
                  <DropdownMenuItem>Live Events</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>

          {/* Search bar - desktop */}
          <div className="hidden md:flex md:flex-1 md:justify-center md:px-6">
            <div className="w-full max-w-lg relative">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                <Search className="h-4 w-4 text-gray-400" />
              </div>
              <Input
                type="text"
                placeholder="Search for courses, resources..."
                className="w-full pl-10 pr-3 py-2 border border-gray-200 rounded-full text-sm focus-visible:ring-teal-500"
              />
            </div>
          </div>
          
          {/* Right side items */}
          <div className="flex items-center">
            {/* Mobile search button */}
            <Button 
              variant="ghost" 
              size="icon" 
              className="md:hidden text-gray-600 hover:text-teal-500"
              onClick={() => setSearchOpen(!searchOpen)}
            >
              <Search size={20} />
            </Button>
            
            {/* Notifications */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="relative text-gray-600 hover:text-teal-500">
                  <Bell size={20} />
                  <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 bg-teal-500 text-white text-xs">
                    3
                  </Badge>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-80">
                <DropdownMenuLabel>Notifications</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <div className="max-h-64 overflow-y-auto">
                  <DropdownMenuItem className="flex flex-col items-start py-2">
                    <div className="flex items-start gap-2 w-full">
                      <div className="bg-blue-100 p-2 rounded-full">
                        <MessageSquare size={14} className="text-blue-600" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium">New comment on your discussion post</p>
                        <p className="text-xs text-gray-500">Jane Smith replied to your question about Tailwind CSS</p>
                        <p className="text-xs text-gray-400 mt-1">10 minutes ago</p>
                      </div>
                    </div>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="flex flex-col items-start py-2">
                    <div className="flex items-start gap-2 w-full">
                      <div className="bg-green-100 p-2 rounded-full">
                        <Calendar size={14} className="text-green-600" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium">Upcoming lesson reminder</p>
                        <p className="text-xs text-gray-500">Advanced React Patterns starts in 1 hour</p>
                        <p className="text-xs text-gray-400 mt-1">50 minutes ago</p>
                      </div>
                    </div>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="flex flex-col items-start py-2">
                    <div className="flex items-start gap-2 w-full">
                      <div className="bg-purple-100 p-2 rounded-full">
                        <BookOpen size={14} className="text-purple-600" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium">New course available</p>
                        <p className="text-xs text-gray-500">Introduction to GraphQL is now available</p>
                        <p className="text-xs text-gray-400 mt-1">2 hours ago</p>
                      </div>
                    </div>
                  </DropdownMenuItem>
                </div>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="text-center text-sm text-teal-600 hover:text-teal-700 cursor-pointer">
                  View all notifications
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            
            {/* User menu */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="ml-2 flex items-center space-x-2 text-gray-700 hover:text-teal-600">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src="/api/placeholder/32/32" alt="User avatar" />
                    <AvatarFallback className="bg-teal-100 text-teal-700">JS</AvatarFallback>
                  </Avatar>
                  <span className="hidden lg:block text-sm font-medium">John Smith</span>
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <User className="mr-2 h-4 w-4" />
                  <span>Profile</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <BookOpen className="mr-2 h-4 w-4" />
                  <span>My Learning</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <MessageSquare className="mr-2 h-4 w-4" />
                  <span>Messages</span>
                  <Badge className="ml-auto bg-teal-500">5</Badge>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="mr-2 h-4 w-4"
                  >
                    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                    <polyline points="16 17 21 12 16 7" />
                    <line x1="21" y1="12" x2="9" y2="12" />
                  </svg>
                  <span>Sign out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
      
      {/* Mobile search - conditional */}
      {searchOpen && (
        <div className="px-2 py-3 md:hidden">
          <div className="relative">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
              <Search className="h-4 w-4 text-gray-400" />
            </div>
            <Input
              type="text"
              placeholder="Search for courses, resources..."
              className="w-full pl-10 pr-3 py-2 text-sm"
              autoFocus
            />
          </div>
        </div>
      )}
      
      {/* Mobile menu - conditional */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white">
          <div className="pt-2 pb-4 space-y-1">
            <a href="#" className="block pl-3 pr-4 py-2 border-l-4 border-teal-500 text-base font-medium text-teal-700 bg-teal-50">
              Dashboard
            </a>
            <a href="#" className="block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800">
              My Courses
            </a>
            <a href="#" className="block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800">
              Calendar
            </a>
            <a href="#" className="block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800">
              Resources
            </a>
            <div className="block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-gray-600">
              <details>
                <summary className="list-none flex justify-between items-center cursor-pointer">
                  <span>Community</span>
                  <ChevronDown className="h-4 w-4" />
                </summary>
                <div className="pl-4 mt-2 space-y-1">
                  <a href="#" className="block py-2 text-sm text-gray-500 hover:text-gray-700">
                    Discussion Forums
                  </a>
                  <a href="#" className="block py-2 text-sm text-gray-500 hover:text-gray-700">
                    Study Groups
                  </a>
                  <a href="#" className="block py-2 text-sm text-gray-500 hover:text-gray-700">
                    Live Events
                  </a>
                </div>
              </details>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;