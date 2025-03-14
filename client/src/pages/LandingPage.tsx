"use client";

import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ChevronRight, PlayCircle } from "lucide-react";

export default function LandingPage() {
  return (
    <div className="bg-gray-50 text-gray-900">
      {/* Navbar */}
      <nav className="fixed top-0 left-0 w-full bg-white shadow-md py-4 px-6 flex justify-between items-center z-50">
        <h1 className="text-2xl font-bold">LMS Pro</h1>
        <ul className="hidden md:flex space-x-6">
          {["Home", "Courses", "Pricing", "Contact"].map((item) => (
            <li key={item} className="hover:text-gray-600 cursor-pointer transition">{item}</li>
          ))}
        </ul>
        <Button variant="default">Get Started</Button>
      </nav>

      {/* Hero Section */}
      <section className="h-screen flex flex-col justify-center items-center text-center px-6">
        <motion.h1
          className="text-5xl font-bold mb-4"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Learn Smarter, Not Harder
        </motion.h1>
        <motion.p
          className="text-lg text-gray-600 max-w-lg"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          Join thousands of learners in mastering new skills with engaging video courses and interactive lessons.
        </motion.p>
        <motion.div
          className="mt-6 flex space-x-4"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2 }}
        >
          <Button size="lg">Explore Courses</Button>
          <Button variant="outline" size="lg">
            <PlayCircle className="w-5 h-5 mr-2" /> Watch Demo
          </Button>
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="py-24 px-6 bg-white">
        <h2 className="text-4xl font-semibold text-center mb-12">Why Choose Us?</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {[
            { title: "Expert Instructors", desc: "Learn from industry experts with real-world experience." },
            { title: "Flexible Learning", desc: "Access courses anytime, anywhere on any device." },
            { title: "Hands-on Projects", desc: "Get practical experience with interactive projects." },
          ].map((feature, index) => (
            <motion.div
              key={index}
              className="p-6 bg-gray-100 rounded-lg shadow-md hover:shadow-lg transition cursor-pointer"
              whileHover={{ scale: 1.05 }}
            >
              <h3 className="text-2xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Course Previews */}
      <section className="py-24 px-6 bg-gray-50">
        <h2 className="text-4xl font-semibold text-center mb-12">Popular Courses</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {[
            { title: "Mastering Tailwind CSS", img: "/course1.jpg" },
            { title: "React for Beginners", img: "/course2.jpg" },
            { title: "Advanced JavaScript", img: "/course3.jpg" },
          ].map((course, index) => (
            <motion.div
              key={index}
              className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer"
              whileHover={{ scale: 1.03 }}
            >
              <img src={course.img} alt={course.title} className="w-full h-48 object-cover" />
              <div className="p-4">
                <h3 className="text-xl font-bold">{course.title}</h3>
                <Button variant="outline" size="sm" className="mt-3">
                  View Course <ChevronRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-24 px-6 bg-gradient-to-r from-blue-500 to-purple-500 text-white text-center">
        <h2 className="text-4xl font-bold">Start Learning Today</h2>
        <p className="text-lg mt-2 mb-6">Sign up now and gain access to 100+ high-quality courses.</p>
        <Button size="lg" className="bg-white text-blue-500 font-semibold">
          Get Started Now
        </Button>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-6 text-center">
        <p>© 2025 LMS Pro. All rights reserved.</p>
      </footer>
    </div>
  );
}
