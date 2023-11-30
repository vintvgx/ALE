import React from "react";
import { RiNotificationLine } from "react-icons/ri";

interface NavbarProps {
  title: string;
  searchBox?: boolean;
  searchPlaceholder?: string;
  profile?: boolean;
  notifications?: boolean;
}

const Navbar: React.FC<NavbarProps> = ({
  title,
  searchBox,
  profile,
  notifications,
  searchPlaceholder,
}) => {
  return (
    <nav className="flex items-center justify-between p-4 bg-white text-black ">
      {/* Title aligned to the flex-start */}
      <div className="flex items-center">
        <h1 className="text-3xl font-semibold">{title}</h1>
      </div>

      {/* Search box centered */}
      {searchBox && (
        <div className="flex-grow flex-shrink mx-4">
          <input
            type="text"
            placeholder={searchPlaceholder}
            className="p-2 w-96 bg-gray-100 rounded-full border border-gray-200 focus:outline-none focus:ring focus:border-blue-300"
          />
        </div>
      )}

      {/* Notification button and profile circle aligned to the flex-end */}
      <div className="flex items-center">
        {notifications && (
          <div className="mx-2">
            <RiNotificationLine size={24} />
          </div>
        )}
        {profile && (
          <div className="mx-2">
            <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
