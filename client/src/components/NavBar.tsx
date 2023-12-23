import React from "react";
import { RiNotificationLine } from "react-icons/ri";
import { useAppSelector } from "../redux/store";
import { useNavigate } from "react-router-dom";

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
  const { user } = useAppSelector((state) => state.user);
  const navigate = useNavigate();

  const handleProfileClick = () => {
    // Navigate to the profile view
    navigate("../profile");
  };

  return (
    <nav className="flex items-center justify-between p-4 text-black sticky top-0 backdrop-filter backdrop-blur-sm z-50">
      {/* Title aligned to the flex-start */}
      <div className="flex items-center">
        <h1 className="text-3xl font-semibold">{title}</h1>
      </div>

      {/* Search box centered */}
      {searchBox && (
        <div className="flex-grow mx-4">
          <input
            type="text"
            placeholder={searchPlaceholder}
            className="p-2 w-72 bg-gray-200 rounded-full border border-gray-300 focus:outline-none focus:ring focus:border-blue-300"
          />
        </div>
      )}

      {/* Notification button and profile circle aligned to the flex-end */}
      <div className="flex items-center">
        {user && <div className="mx-2">{user.username}</div>}
        {notifications && (
          <div className="mx-2">
            <RiNotificationLine size={24} />
          </div>
        )}
        {profile && (
          <div
            className="mx-2"
            onClick={handleProfileClick}
            style={{ cursor: "pointer" }}>
            <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
