// src/components/Sidebar.jsx
import React from "react";
import Alert from "../assets/warning.png"
import Report from "../assets/list.png"
import Map from "../assets/india.png"
import User from "../assets/user.png";
import Logo from "../assets/Logo Black.png";
import { Link } from "react-router-dom";
import { MoreVertical, ChevronLast, ChevronFirst } from "lucide-react"
import { useContext, createContext, useState } from "react"

// const Sidebar = () => {
//   return (
//     <aside
//       className="bg-customGray text-black w-64 flex flex-col space-y-4 py-6 items-center justify-between"
//       style={{ height: "calc(100vh - 60px)" }}
//     >
//       {/* Profile Section */}
//       <div className="flex flex-col items-center gap-12">
//         <div className="flex items-center space-x-4 px-6">
//           <img
//             src={User} // Replace with actual profile picture path
//             alt="Profile"
//             className="w-12 h-12 rounded-full border-2 border-gray-300"
//           />
//           <div>
//             <p className="text-md font-bold text-gray-800">NDRF Coordinator</p>
//           </div>
//         </div>

//         {/* Navigation */}
//         <nav className="flex flex-col space-y-4 px-6 gap-3">
//           <Link to="/dashboard">
//             <div className="py-2 px-6 text-md hover:bg-gray-700 transition-colors duration-200 flex gap-3 bg-gray-400 rounded-2xl text-white font- items-center">
//               <img src={Alert} className="h-7" />
//               Alert Overview
//             </div>
//             </Link>
         
//           <a href="#latestReport">
//             <div className="py-2 px-6 text-md hover:bg-gray-700 transition-colors duration-200 flex gap-3 bg-gray-400 rounded-2xl text-white font- items-center">
//               <img src={Report} className="h-7" />
//                Report
//             </div>
//           </a>
//           <Link to="/dashboard/map">
//             <div className="py-2 px-6 text-md hover:bg-gray-700 transition-colors duration-200 flex gap-3 bg-gray-400 rounded-2xl text-white font- items-center">
//               <img src={Map} className="h-7" />
//               Map Overview
//             </div>
//           </Link>
//         </nav>
//       </div>

//       {/* Log Out Button */}
//       <div className="mt-auto px-6">
//         <button className="bg-red-500 py-2 px-6 w-full text-white text-left hover:bg-red-600 shadow-md rounded-sm">
//           Log Out
//         </button>
//       </div>
//     </aside>
//   );
// };

// export default Sidebar;

  const SidebarContext = createContext()

  export default function Sidebar({ children }) {
    const [expanded, setExpanded] = useState(true);
  
    return (
      <aside className="h-screen">
        <nav className="h-full flex flex-col bg-white border-r shadow-sm">
          <div className="p-4 pb-2 flex justify-between items-center">
            <img
              src={Logo}
              className={`overflow-hidden transition-all ${
                expanded ? "w-24" : "w-0"
              }`} // Reduced width here
              alt=""
            />
            <button
              onClick={() => setExpanded((curr) => !curr)}
              className="p-1.5 rounded-lg bg-gray-50 hover:bg-gray-100"
            >
              {expanded ? <ChevronFirst /> : <ChevronLast />}
            </button>
          </div>
  
          <SidebarContext.Provider value={{ expanded }}>
            <ul className="flex-1 px-3">{children}</ul>
          </SidebarContext.Provider>
  
          <div className="border-t flex p-3 shadow-lg box-border m-2 rounded-xl">
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTondX9KIW_5SQ0uDP36-SOgoxE3tLYCFQb_A&s"
            alt=""
            className={`w-10 h-10 rounded-md ${expanded ? "ml-3" : "mx-auto"}`} // Center image when collapsed
          />
          <div
            className={`flex justify-between items-center overflow-hidden transition-all ${expanded ? "w-44 ml-3" : "w-0"}`}
          >
            <div className={`leading-4 ${expanded ? "" : "hidden"}`}>
              <h4 className="font-semibold">NDRF Co-ordinator</h4>
              <span className="text-xs text-gray-600">NDRF@gmail.com</span>
            </div>
          </div>
        </div>

        </nav>
      </aside>
    );
  }
  
  export function SidebarItem({ icon, text, active, alert }) {
    const { expanded } = useContext(SidebarContext);
  
    return (
      <li
        className={`relative flex items-center py-4 px-5 my-2 font-medium rounded-lg cursor-pointer transition-colors group ${
          active
            ? "bg-gradient-to-tr from-indigo-200 to-indigo-100 text-indigo-800"
            : "hover:bg-indigo-50 text-gray-600"
        }`}
      >
        {/* Icon */}
        <div className="text-xl">{icon}</div>
  
        {/* Text */}
        <span
          className={`overflow-hidden transition-all text-lg font-semibold ${
            expanded ? "w-48 ml-4" : "w-0" // Adjusted width here
          }`}
        >
          {text}
        </span>
  
        {/* Alert Indicator */}
        {alert && (
          <div
            className={`absolute right-3 w-3 h-3 rounded-full bg-indigo-400 ${
              expanded ? "" : "top-4"
            }`}
          />
        )}
  
        {/* Tooltip for collapsed state */}
        {!expanded && (
          <div
            className={`absolute left-full rounded-md px-3 py-2 ml-6 bg-indigo-100 text-indigo-800 text-md font-medium invisible opacity-0 -translate-x-3 transition-all group-hover:visible group-hover:opacity-100 group-hover:translate-x-0`}
          >
            {text}
          </div>
        )}
      </li>
    );
  }
  