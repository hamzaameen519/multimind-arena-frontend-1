import React, { useState } from "react";
import { Link } from "react-router-dom";
import Logo from '../../../public/assets/images/logo/logo.png';

const Header = () => {
  const [sidebarOpen, setSideBarOpen] = useState(false);
  const handleSidebar = () => {
    setSideBarOpen(!sidebarOpen);
  };

  return (
    <>
      {/* Adding CSS in style tag for hover effects */}
      <style>
        {`
          .mainmenu a:hover,
          .dashboard-mainmenu a:hover {
            color: #00ff00 !important;
          }
        `}
      </style>

      <div className="header-top-news" style={{ backgroundColor: "#000000" }}>
        <div className="wrapper">
          <div className="container">
            <div className="row">
              <div className="col-lg-12"></div>
            </div>
          </div>
        </div>
      </div>
      {/* End Header Top Area */}
      <header
        className="rainbow-header header-default header-transparent header-sticky"
        style={{ backgroundColor: "#000000" }}
      >
        <div className="container position-relative">
          <div className="row align-items-center row--0">
            <div className="col-lg-2 col-md-6 col-6">
              <div className="">
                <Link to="/">
                  <img
                    className="logo"
                    src="/assets/images/logo/logo.png"
                    alt="ChatBot Logo"
                    style={{height: '80px', width: 'auto'}}
                    onError={(e) => e.target.src = Logo} // Fallback to Logo if the image fails to load

                  
                  />
                </Link>
              </div>
            </div>
            <div className="col-lg-8 d-none d-lg-block">
              <nav className="mainmenu-nav d-none d-lg-flex justify-content-center">
                <ul className="mainmenu">
                  <li>
                    <Link to="/" style={{ color: "#ffffff" }}>
                      Home
                    </Link>
                  </li>
                  <li className="has-dropdown has-menu-child-item position-relative">
                    <Link to="/" style={{ color: "#ffffff" }}>
                      Tools
                    </Link>
                  </li>
                  <li className="with-megamenu has-menu-child-item">
                    <Link to="/" style={{ color: "#ffffff" }}>
                      Arenas
                    </Link>
                  </li>
                  <li>
                    <Link to="/" style={{ color: "#ffffff" }}>
                      Roadmap
                    </Link>
                  </li>
                  <li>
                    <Link to="/" style={{ color: "#ffffff" }}>
                      How to use
                    </Link>
                  </li>
                </ul>
              </nav>
            </div>
            <div className="col-lg-2 col-md-6 col-6 position-static">
              <div className="header-right d-flex justify-content-end align-items-center">
                {/* Start Header Btn */}
                <div className="header-btn d-none d-lg-block">
                  <Link
                    className="rainbow-gradient-btn"
                    to="/login"
                    style={{
                      color: "#000000",
                      padding: "2px 2px",
                      // borderRadius: "2px",
                      textDecoration: "none",
                      fontWeight: "bolder",
                    }}
                  >
                    <span>Get Started </span>
                  </Link>
                </div>
                {/* End Header Btn */}
                {/* Start Mobile-Menu-Bar */}
                <div className="mobile-menu-bar ml--5 d-flex d-lg-none">
                  <div className="hamberger">
                    <button
                      className="hamberger-button border-0 bg-transparent"
                      onClick={handleSidebar}
                      style={{ color: "#00ff00" }}
                    >
                      <i
                        className="fa fa-bars fa-2x "
                        style={{ color: "#0f0" }}
                      />
                    </button>

                    {/* <div className="d-flex justify-content-between align-items-center mb-4">
          <h4 className="fw-bold" style={{ color: "#00ff00" }}>
            Menu
          </h4>

          <button className="fw-bold btn-close" onClick={handleSidebar}>
            <IoMdClose className="fw-bold" color="#00ff00" />
          </button>
        </div> */}
                  </div>
                </div>
                {/* End Mobile-Menu-Bar */}
              </div>
            </div>
          </div>
        </div>
      </header>
      {/* End Header Area */}

      <div
        className={`${
          sidebarOpen ? "d-block" : "d-none"
        } position-fixed top-0 start-0 vh-100 vw-75`}
        style={{
          backgroundColor: "#000000",
          color: "#ffffff",
          zIndex: 1050,
          overflowY: "auto",
          padding: "20px",
        }}
      >
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h4 className="fw-bold" style={{ color: "#00ff00" }}>
            Menu
          </h4>
          <button
            className="btn-close "
            onClick={handleSidebar}
            style={{  backgroundColor: "#00ff00", borderRadius: '30px', padding: '0.6rem' }}
          />
        </div>

        <ul className="mainmenu list-unstyled mb-4">
          <li>
            <Link
              to="/"
              className="d-block py-2 text-decoration-none"
              style={{ color: "#ffffff" }}
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              to="/"
              className="d-block py-2 text-decoration-none"
              style={{ color: "#ffffff" }}
            >
              Tools
            </Link>
          </li>
          <li>
            <Link
              to="/"
              className="d-block py-2 text-decoration-none"
              style={{ color: "#ffffff" }}
            >
              Arenas
            </Link>
          </li>
          <li>
            <Link
              to="/"
              className="d-block py-2 text-decoration-none"
              style={{ color: "#ffffff" }}
            >
              How to Use
            </Link>
          </li>
          <li>
            <Link
              to="/"
              className="d-block py-2 text-decoration-none"
              style={{ color: "#ffffff" }}
            >
              Roadmap
            </Link>
          </li>
        </ul>

        <div className="rbt-default-sidebar-wrapper mb-4">
          <nav className="mainmenu-nav">
            <ul className="dashboard-mainmenu rbt-default-sidebar-list list-unstyled">
              <li>
                <Link
                  to="plans-billing.html"
                  className="d-block py-2 text-decoration-none"
                  style={{ color: "#ffffff" }}
                >
                  <i className="fa fa-briefcase me-2" />
                  Manage Subscription
                </Link>
              </li>
            </ul>
          </nav>
        </div>

        <nav className="mainmenu-nav mb-4">
          <ul className="dashboard-mainmenu rbt-default-sidebar-list list-unstyled">
            <li className="has-submenu">
              <Link
                className="d-block py-2 text-decoration-none"
                data-bs-toggle="collapse"
                to="#collapseExampleMenu"
                role="button"
                aria-expanded="false"
                aria-controls="collapseExampleMenu"
                style={{ color: "#ffffff" }}
              >
                <i className="fa fa-circle-plus me-2" />
                Setting
              </Link>
            </li>
          </ul>
        </nav>

        <nav className="mainmenu-nav">
          <ul className="dashboard-mainmenu rbt-default-sidebar-list list-unstyled">
            <li>
              <Link
                to="terms-policy.html"
                className="d-block py-2 text-decoration-none"
                style={{ color: "#ffffff" }}
              >
                <i className="fa fa-briefcase me-2" />
                Terms & Policy
              </Link>
            </li>
          </ul>
        </nav>

        <div className="header-btn mt-4 d-flex justify-content-center d-md-none">
          <Link
            className="btn btn-default"
            to="/login"
            style={{
              backgroundColor: "#00ff00",
              color: "#000000",
              border: "none",
            }}
          >
            Get Started Free
          </Link>
        </div>
      </div>
    </>
  );
};

export default Header;
