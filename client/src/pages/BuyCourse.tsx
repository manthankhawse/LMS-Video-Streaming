import { Button } from "@/components/ui/button"
import React from "react"

export default function BuyCourse() {
  return (
    <React.Fragment>
      <div className="bg-gradient-to-r from-slate-50 to-gray-100 py-8 lg:py-16 w-4/5 mx-auto rounded-xl shadow-lg">
        <div className="container px-4 md:px-6">
          <div className="grid items-center gap-8 lg:grid-cols-2 lg:gap-12">
            <div className="space-y-6 p-6 bg-white rounded-lg shadow-md border border-slate-200 transition-all duration-300 hover:shadow-xl">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl text-slate-800">
                Mastering Tailwind CSS
              </h1>
              <p className="max-w-[600px] text-slate-600 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Learn how to build modern, responsive web applications using utility-first CSS with Tailwind CSS. This
                course covers the fundamentals of Tailwind CSS, customizing your design system, and integrating Tailwind
                CSS with popular frontend frameworks.
              </p>
              <div className="flex items-center space-x-4">
                <div className="text-3xl font-bold text-slate-700">$99</div>
                <Button 
                  className="bg-slate-700 hover:bg-slate-800 text-white shadow-md transition-all duration-300 hover:shadow-lg transform hover:-translate-y-1" 
                  size="lg"
                >
                  Enroll in Course
                </Button>
              </div>
            </div>
            <div className="flex justify-center">
              <img
                src="/placeholder.svg"
                width="400"
                height="225"
                alt="Course Image"
                className="aspect-video overflow-hidden rounded-xl object-cover object-center shadow-xl border-2 border-slate-200 transition-all duration-300 hover:shadow-2xl hover:scale-105"
              />
            </div>
          </div>
        </div>
      </div>
      <section className="w-4/5 mx-auto py-12 md:py-24 lg:py-32 bg-white rounded-xl shadow-lg mt-8 border border-slate-100">
        <div className="container px-4 md:px-6">
          <div className="prose max-w-none">
            <h2 className="text-4xl font-semibold text-slate-700 pb-4 border-b-2 border-slate-200">Course Curriculum</h2>
            <ul className="grid gap-4 my-6">
              <li className="border border-slate-200 max-w-full px-4 py-6 rounded-lg shadow-md hover:shadow-xl transition-all duration-300 bg-white hover:bg-slate-50 cursor-pointer">
                <div className="font-medium text-lg text-slate-700">Module 1: Introduction to Tailwind CSS</div>
                <p className="text-slate-600">
                  Learn the basics of Tailwind CSS and the utility-first workflow.
                </p>
              </li>
              <li className="border border-slate-200 max-w-full px-4 py-6 rounded-lg shadow-md hover:shadow-xl transition-all duration-300 bg-white hover:bg-slate-50 cursor-pointer">
                <div className="font-medium text-lg text-slate-700">Module 2: Customizing Tailwind CSS</div>
                <p className="text-slate-600">
                  Explore how to customize your design system with Tailwind CSS configuration.
                </p>
              </li>
              <li className="border border-slate-200 max-w-full px-4 py-6 rounded-lg shadow-md hover:shadow-xl transition-all duration-300 bg-white hover:bg-slate-50 cursor-pointer">
                <div className="font-medium text-lg text-slate-700">Module 3: Integrating Tailwind CSS with Frameworks</div>
                <p className="text-slate-600">
                  Learn how to integrate Tailwind CSS with popular frontend frameworks like React, Vue.js, and Svelte.
                </p>
              </li>
              <li className="border border-slate-200 max-w-full px-4 py-6 rounded-lg shadow-md hover:shadow-xl transition-all duration-300 bg-white hover:bg-slate-50 cursor-pointer">
                <div className="font-medium text-lg text-slate-700">Module 4: Advanced Styling Techniques</div>
                <p className="text-slate-600">
                  Dive into advanced styling techniques and component-based design with Tailwind CSS.
                </p>
              </li>
            </ul>
          </div>
        </div>
      </section>
    </React.Fragment>
  )
}