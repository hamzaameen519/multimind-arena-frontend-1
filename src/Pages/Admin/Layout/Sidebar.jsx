import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import Logo from "../../../../public/assets/images/logo/logo.png";
import "./Sidebar.css";
const Sidebar = () => {
  const sidebarOpen = useSelector((state) => state.sidebar.sidebarOpen);
  const location = useLocation(); // Get the current location (path)

  // Local state to hold user details
  const [userDetails, setUserDetails] = useState({
    name: "User", // default value
    email: "user@example.com", // default value
  });

  // Fetch user data from local storage when the component mounts
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user")); // Assuming user data is stored as an object in local storage
    if (user) {
      setUserDetails({
        name: user.name || "User",
        email: user.email || "user@example.com",
      });
    }
  }, []);

  // Menu items for sidebar
  // Menu items for sidebar
  const menuItems = [
    { path: "/admin/dashboard", icon: "fa-solid fa-house", label: "Dashboard" },
    {
      path: "/admin/users",
      icon: "fa-solid fa-user-group",
      label: "Manage Users",
    },
    {
      path: "/admin/system-status",
      icon: "fa-solid fa-bug",
      label: "Error Logs",
    },
    {
      path: "/admin/manage-arenas",
      icon: "fa-solid fa-gamepad",
      label: "Manage Arenas",
    },
    {
      path: "/admin/manage-ai-figures",
      icon: "fa-solid fa-robot",
      label: "Manage AI Figures",
    }, // New option added
    {
      path: "/admin/arena-types",
      icon: "fa-solid fa-info-circle",
      label: "Manage Arena Types",
    },
    {
      path: "/admin/manage-transactions",
      icon: "fa-solid fa-coins",
      label: "Manage Transactions",
    },
    {
      path: "/admin/arena-access",
      icon: "fa-solid fa-hourglass-half",
      label: "Manage Arena Access",
    },
    {
      path: "/admin/ai-figure-access",
      icon: "fa-solid fa-shield-check",
      label: "Manage AI Figure Access",
    },
    {
      path: "/admin/llm-dashboard",
      icon: "fa-solid fa-brain",
      label: "LLM Model",
    },
    {
      path: "/admin/bundles",
      icon: "fa-solid fa-box",
      label: "Bundle Package",
    },
  ];

  const isActive = (path) => {
    return location.pathname === path ? "active" : ""; // Return 'active' class if the path matches
  };
  return (
    <>
      <div className="popup-mobile-menu ">
        <div className="inner-popup">
          <div className="header-top">
            <div className="logo">
              <Link to="/dashboard">
                <img
                  className="logo-light"
                  src="/assets/images/logo/logo.png"
                  alt="ChatBot Logo"
                  onError={(e) => (e.target.src = Logo)} // Fallback to Logo if the image fails to load
                />
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div
        className={`rbt-left-panel popup-dashboardleft-section ${
          sidebarOpen ? "" : "collapsed"
        }`}
      >
        <div className="rbt-default-sidebar">
          <div className="inner">
            <div className="content-item-content">
              <div className="rbt-default-sidebar-wrapper">
                <nav className="mainmenu-nav">
                  <ul className="dashboard-mainmenu rbt-default-sidebar-list">
                    {menuItems.map((item, index) => (
                      <li
                        key={index}
                        className={`d-flex justify-content-center align-items-center ${isActive(
                          item.path
                        )}`}
                      >
                        <Link to={item.path}>
                          <i
                            className={`fa-solid ${item.icon}`}
                            style={{
                              color:
                                isActive(item.path) === "active"
                                  ? "#00ff00"
                                  : "",
                            }} // Apply the same style to the text
                          />
                          <span
                            style={{
                              color:
                                isActive(item.path) === "active"
                                  ? "#00ff00"
                                  : "",
                            }} // Apply the same style to the text
                          >
                            {item.label}
                          </span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </nav>
                <div className="rbt-sm-separator" />
              </div>
            </div>
          </div>
          {/* Rest of the sidebar content */}
          <div className="subscription-box">
            <div className="inner">
              <Link
                to="/admin/view-profile"
                className="autor-info d-flex justify-content-center align-items-center"
              >
                <div className="author-img active">
                  <img
                    className="w-100"
                    src="/assets/images/team/team-01sm.jpg"
                    alt="Author"
                  />
                </div>
                <div className="author-desc ">
                  <h6>{userDetails.name}</h6>
                </div>
              </Link>
            </div>
          </div>
          <p className="subscription-copyright copyright-text text-center b3 small-text">
            Copyright © 2024
          </p>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
