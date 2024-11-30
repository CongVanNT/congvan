import React from "react";
import { HomeIcon, UserIcon, SettingsIcon } from "@heroicons/react/outline";

function Sidebar() {
  return (
    <div className="h-screen bg-gray-800 text-white w-64">
      <div className="p-4">
        <h1 className="text-2xl font-bold">My App</h1>
      </div>
      <nav className="mt-10">
        <a href="#" className="flex items-center p-2 text-gray-300 hover:bg-gray-700 hover:text-white">
          <HomeIcon className="w-6 h-6 mr-3" />
          Home
        </a>
        <a href="#" className="flex items-center p-2 text-gray-300 hover:bg-gray-700 hover:text-white">
          <UserIcon className="w-6 h-6 mr-3" />
          Profile
        </a>
        <a href="#" className="flex items-center p-2 text-gray-300 hover:bg-gray-700 hover:text-white">
          <SettingsIcon className="w-6 h-6 mr-3" />
          Settings
        </a>
      </nav>
    </div>
  );
}

export default Sidebar;
