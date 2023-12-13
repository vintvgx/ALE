import React, { useState } from "react";
import { FiLogOut, FiMenu } from "react-icons/fi";
import { CgFeed } from "react-icons/cg";
import { IoBookmarksSharp } from "react-icons/io5";
import { IoSettingsOutline } from "react-icons/io5";
import { MdOutlinePersonOutline } from "react-icons/md";
import { FaMessage } from "react-icons/fa6";
import { Sidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";
import { Link } from "react-router-dom";

interface SidebarViewProps {
  hideSidebar?: boolean;
}

const SidebarView: React.FC<SidebarViewProps> = ({ hideSidebar = false }) => {
  const [isSidebarMinimized, setSidebarMinimized] = useState(false);

  const toggleSidebar = () => {
    setSidebarMinimized(!isSidebarMinimized);
  };

  if (hideSidebar) {
    return null; // Render nothing if hideSidebar is true
  }

  return (
    <Sidebar
      style={{
        height: "100vh",
        position: "sticky",
        top: "0",
        overflow: "hidden",
        transition: "width 0.3s ease",
        color: "black",
      }}
      collapsed={isSidebarMinimized}
      width={"250"}
      collapsedWidth={"60"}
      backgroundColor={"#ED9D00"}
      transitionDuration={500}>
      <div
        style={{
          textAlign: "center",
          padding: "20px",
        }}>
        <h3
          style={{
            width: isSidebarMinimized ? "60px" : "200px",
          }}>
          COMM
        </h3>
      </div>

      <Menu className="text-left">
        <MenuItem component={<Link to="/feed" />}>
          <div className="flex items-center  text-left justify-center">
            {isSidebarMinimized ? (
              <CgFeed className="mr-2" />
            ) : (
              <>
                <CgFeed className="mr-2" />
                <span>Feed</span>
              </>
            )}
          </div>
        </MenuItem>
        <MenuItem component={<Link to="/library" />}>
          <div className="flex items-center justify-center">
            {isSidebarMinimized ? (
              <IoBookmarksSharp className="mr-2" />
            ) : (
              <>
                <IoBookmarksSharp className="mr-2" />
                <span>Library</span>
              </>
            )}
          </div>
        </MenuItem>

        <MenuItem component={<Link to="/messenger" />}>
          <div className="flex items-center justify-center">
            {isSidebarMinimized ? (
              <FaMessage className="mr-2" />
            ) : (
              <>
                <FaMessage className="mr-2" />
                <span>Messenger</span>
              </>
            )}
          </div>
        </MenuItem>

        <MenuItem component={<Link to="/settings" />}>
          <div className="flex items-center justify-center">
            {isSidebarMinimized ? (
              <IoSettingsOutline className="mr-2" />
            ) : (
              <>
                <IoSettingsOutline className="mr-2" />
                <span>Settings</span>
              </>
            )}
          </div>
        </MenuItem>
        <MenuItem component={<Link to="/sign-up" />}>
          <div className="flex items-center justify-center">
            {isSidebarMinimized ? (
              <MdOutlinePersonOutline className="mr-2" />
            ) : (
              <>
                <MdOutlinePersonOutline className="mr-2" />
                <span>Sign Up</span>
              </>
            )}
          </div>
        </MenuItem>
        <MenuItem component={<Link to="/login" />}>
          <div className="flex items-center justify-center">
            {isSidebarMinimized ? (
              <MdOutlinePersonOutline className="mr-2" />
            ) : (
              <>
                <MdOutlinePersonOutline className="mr-2" />
                <span>Login</span>
              </>
            )}
          </div>
        </MenuItem>
        <MenuItem component={<Link to="/change-password" />}>
          <div className="flex items-center justify-center">
            {isSidebarMinimized ? (
              <MdOutlinePersonOutline className="mr-2" />
            ) : (
              <>
                <MdOutlinePersonOutline className="mr-2" />
                <span>Change Password</span>
              </>
            )}
          </div>
        </MenuItem>
        <MenuItem
          component={
            <Link to="dj-rest-auth/registration/account-confirm-email/:key/" />
          }>
          <div className="flex items-center justify-center">
            {isSidebarMinimized ? (
              <MdOutlinePersonOutline className="mr-2" />
            ) : (
              <>
                <MdOutlinePersonOutline className="mr-2" />
                <span>Email Verification</span>
              </>
            )}
          </div>
        </MenuItem>
      </Menu>
      <div>
        <button
          style={{
            padding: "10px",
            backgroundColor: "transparent",
            border: "none",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "100%",
            position: "absolute",
            bottom: "0",
          }}
          onClick={toggleSidebar}>
          <FiLogOut color="black" style={{ marginRight: "10px" }} />
          {!isSidebarMinimized && "Log Out"}
        </button>
      </div>
    </Sidebar>
  );
};

//   return (
//     <Sidebar
//       style={{
//         // backgroundColor: "lightgray",
//         height: "100vh",
//         position: "sticky",
//         top: "0",
//         overflow: "hidden",
//         transition: "width 0.3s ease",
//         color: "black",
//       }}
//       collapsed={isSidebarMinimized}
//       width={"250"}
//       collapsedWidth={"10"}
//       backgroundColor={"#ED9D00"}
//       transitionDuration={500}>
//       <div className="text-center p-20">
//         <h3 className={`${isSidebarMinimized ? "w-14" : "w-52"}`}>COMM</h3>
//       </div>

//       <Menu className="text-left">
//         <MenuItem component={<Link to="/feed" />}>
//           <div className="flex items-center  text-left justify-center">
//             {isSidebarMinimized ? (
//               <CgFeed className="mr-2" />
//             ) : (
//               <>
//                 <CgFeed className="mr-2" />
//                 <span>Feed</span>
//               </>
//             )}
//           </div>
//         </MenuItem>
//         <MenuItem component={<Link to="/library" />}>
//           <div className="flex items-center justify-center">
//             {isSidebarMinimized ? (
//               <IoBookmarksSharp className="mr-2" />
//             ) : (
//               <>
//                 <IoBookmarksSharp className="mr-2" />
//                 <span>Library</span>
//               </>
//             )}
//           </div>
//         </MenuItem>

//         <MenuItem component={<Link to="/messenger" />}>
//           <div className="flex items-center justify-center">
//             {isSidebarMinimized ? (
//               <FaMessage className="mr-2" />
//             ) : (
//               <>
//                 <FaMessage className="mr-2" />
//                 <span>Messenger</span>
//               </>
//             )}
//           </div>
//         </MenuItem>

//         <MenuItem component={<Link to="/settings" />}>
//           <div className="flex items-center justify-center">
//             {isSidebarMinimized ? (
//               <IoSettingsOutline className="mr-2" />
//             ) : (
//               <>
//                 <IoSettingsOutline className="mr-2" />
//                 <span>Settings</span>
//               </>
//             )}
//           </div>
//         </MenuItem>
//       </Menu>
//       <div>
//         <button
//           className="p-10 bg-transparent border-none flex items-center justify-center w-full absolute bottom-0"
//           onClick={toggleSidebar}>
//           <FiLogOut className="mr-10" color="black" />
//           {!isSidebarMinimized && "Log Out"}
//         </button>
//       </div>
//     </Sidebar>
//   );
// };

export default SidebarView;
