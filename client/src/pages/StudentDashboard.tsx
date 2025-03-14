import SidebarComponent from "@/components/sidebar";

const courses = [
  {
    id: 1,
    title: "Introduction to Programming",
    description: "Learn the basics of programming using Python.",
    instructor: "John Doe",
    duration: "4 weeks",
    imageUrl: "https://via.placeholder.com/150",
  },
  {
    id: 2,
    title: "Data Structures and Algorithms",
    description: "Master data structures and algorithms to ace coding interviews.",
    instructor: "Jane Smith",
    duration: "6 weeks",
    imageUrl: "https://via.placeholder.com/150",
  },
  {
    id: 3,
    title: "Web Development Bootcamp",
    description: "Become a full-stack web developer with this immersive bootcamp.",
    instructor: "Robert Johnson",
    duration: "8 weeks",
    imageUrl: "https://via.placeholder.com/150",
  },
  {
    id: 1,
    title: "Introduction to Programming",
    description: "Learn the basics of programming using Python.",
    instructor: "John Doe",
    duration: "4 weeks",
    imageUrl: "https://via.placeholder.com/150",
  },
  {
    id: 2,
    title: "Data Structures and Algorithms",
    description: "Master data structures and algorithms to ace coding interviews.",
    instructor: "Jane Smith",
    duration: "6 weeks",
    imageUrl: "https://via.placeholder.com/150",
  },
  {
    id: 3,
    title: "Web Development Bootcamp",
    description: "Become a full-stack web developer with this immersive bootcamp.",
    instructor: "Robert Johnson",
    duration: "8 weeks",
    imageUrl: "https://via.placeholder.com/150",
  },
  {
    id: 1,
    title: "Introduction to Programming",
    description: "Learn the basics of programming using Python.",
    instructor: "John Doe",
    duration: "4 weeks",
    imageUrl: "https://via.placeholder.com/150",
  },
  {
    id: 2,
    title: "Data Structures and Algorithms",
    description: "Master data structures and algorithms to ace coding interviews.",
    instructor: "Jane Smith",
    duration: "6 weeks",
    imageUrl: "https://via.placeholder.com/150",
  },
  {
    id: 3,
    title: "Web Development Bootcamp",
    description: "Become a full-stack web developer with this immersive bootcamp.",
    instructor: "Robert Johnson",
    duration: "8 weeks",
    imageUrl: "https://via.placeholder.com/150",
  },
  {
    id: 1,
    title: "Introduction to Programming",
    description: "Learn the basics of programming using Python.",
    instructor: "John Doe",
    duration: "4 weeks",
    imageUrl: "https://via.placeholder.com/150",
  },
  {
    id: 2,
    title: "Data Structures and Algorithms",
    description: "Master data structures and algorithms to ace coding interviews.",
    instructor: "Jane Smith",
    duration: "6 weeks",
    imageUrl: "https://via.placeholder.com/150",
  },
  {
    id: 3,
    title: "Web Development Bootcamp",
    description: "Become a full-stack web developer with this immersive bootcamp.",
    instructor: "Robert Johnson",
    duration: "8 weeks",
    imageUrl: "https://via.placeholder.com/150",
  },
  {
    id: 1,
    title: "Introduction to Programming",
    description: "Learn the basics of programming using Python.",
    instructor: "John Doe",
    duration: "4 weeks",
    imageUrl: "https://via.placeholder.com/150",
  },
  {
    id: 2,
    title: "Data Structures and Algorithms",
    description: "Master data structures and algorithms to ace coding interviews.",
    instructor: "Jane Smith",
    duration: "6 weeks",
    imageUrl: "https://via.placeholder.com/150",
  },
  {
    id: 3,
    title: "Web Development Bootcamp",
    description: "Become a full-stack web developer with this immersive bootcamp.",
    instructor: "Robert Johnson",
    duration: "8 weeks",
    imageUrl: "https://via.placeholder.com/150",
  },
  {
    id: 1,
    title: "Introduction to Programming",
    description: "Learn the basics of programming using Python.",
    instructor: "John Doe",
    duration: "4 weeks",
    imageUrl: "https://via.placeholder.com/150",
  },
  {
    id: 2,
    title: "Data Structures and Algorithms",
    description: "Master data structures and algorithms to ace coding interviews.",
    instructor: "Jane Smith",
    duration: "6 weeks",
    imageUrl: "https://via.placeholder.com/150",
  },
  {
    id: 3,
    title: "Web Development Bootcamp",
    description: "Become a full-stack web developer with this immersive bootcamp.",
    instructor: "Robert Johnson",
    duration: "8 weeks",
    imageUrl: "https://via.placeholder.com/150",
  },
  {
    id: 1,
    title: "Introduction to Programming",
    description: "Learn the basics of programming using Python.",
    instructor: "John Doe",
    duration: "4 weeks",
    imageUrl: "https://via.placeholder.com/150",
  },
  {
    id: 2,
    title: "Data Structures and Algorithms",
    description: "Master data structures and algorithms to ace coding interviews.",
    instructor: "Jane Smith",
    duration: "6 weeks",
    imageUrl: "https://via.placeholder.com/150",
  },
  {
    id: 3,
    title: "Web Development Bootcamp",
    description: "Become a full-stack web developer with this immersive bootcamp.",
    instructor: "Robert Johnson",
    duration: "8 weeks",
    imageUrl: "https://via.placeholder.com/150",
  },
];

function StudentDashboard() {
  return (
    <>
      <div className="bg-red-400 flex h-full w-full">
        {/* <SidebarComponent /> */}
        <div className="w-full h-screen p-6 overflow-x-scroll">
          <div className="grid grid-cols-3 gap-6">
            {courses.map((course) => (
              <div
                key={course.id}
                className="bg-white p-4 rounded-lg shadow-lg"
              >
                <img
                  src={course.imageUrl}
                  alt={course.title}
                  className="w-full h-40 object-cover rounded-lg mb-4"
                />
                <h3 className="text-xl font-semibold mb-2">{course.title}</h3>
                <p className="text-sm text-gray-600">{course.description}</p>
                <div className="mt-4">
                  <p className="text-sm font-semibold">Instructor: {course.instructor}</p>
                  <p className="text-sm">Duration: {course.duration}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default StudentDashboard;
