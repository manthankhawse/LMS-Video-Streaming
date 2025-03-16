import { AuthContext } from "@/context/userContext";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";

const SidebarComponent = () => {

  const {user, setUser, setToken} = useContext(AuthContext);
  const navigate = useNavigate();

  console.log(user);

  const handleLogout = ()=>{

  }

  const handleLogin = ()=>{

  }

  return (
    <>
      <div className="w-64 bg-white shadow-md">
        <div className="p-4">
          <h2 className="text-xl font-bold text-teal-500 mb-4">
            Learning Portal
          </h2>

          <div className="space-y-1">
            <h3 className="font-medium text-sm text-gray-500 uppercase mb-2">
              Menu
            </h3>
            <div className="flex items-center p-2 bg-teal-100 text-teal-700 rounded-md">
              <span className="mr-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M3 9h18v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V9Z" />
                  <path d="M3 9V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v4" />
                </svg>
              </span>
              <span className="font-medium">My Courses</span>
            </div>
            <div className="flex items-center p-2 text-gray-600 hover:bg-gray-100 rounded-md">
              <span className="mr-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" />
                </svg>
              </span>
              <span onClick={()=> navigate("/explore")}>Explore</span>
            </div>
            <div className="flex items-center p-2 text-gray-600 hover:bg-gray-100 rounded-md">
              <span className="mr-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M12 20h9" />
                  <path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z" />
                </svg>
              </span>
              <span>Assignments</span>
            </div>
            <div className="flex items-center p-2 text-gray-600 hover:bg-gray-100 rounded-md">
              <span className="mr-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="12" cy="12" r="10" />
                  <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
                  <path d="M12 17h.01" />
                </svg>
              </span>
              <span>Help Center</span>
            </div>

            <div className="flex items-center p-2 text-gray-600 hover:bg-gray-100 rounded-md" onClick={user ? handleLogout : handleLogin}>
              <span className="mr-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="12" cy="12" r="10" />
                  <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
                  <path d="M12 17h.01" />
                </svg>
              </span>
              <span>{user ? "Log out" : "Sign in"}</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SidebarComponent;
