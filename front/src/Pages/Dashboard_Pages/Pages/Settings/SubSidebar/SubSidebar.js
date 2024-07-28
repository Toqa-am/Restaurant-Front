import "./SubSidebar.css";
import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import routesSetting from "../../../store/routesSettings";
import { IoIosArrowDown } from "react-icons/io";

export default function SubSidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const subRoutesRef = useRef(null);

  const handleSubRoutes = () => {
    setIsOpen(!isOpen);
    const subRoutes = subRoutesRef.current;
    if (isOpen) subRoutes.style.maxHeight = "0px";
    else subRoutes.style.maxHeight = subRoutes.scrollHeight + "px";
  };

  const [activeRoute, setActiveRoute] = useState("");

  useEffect(() => {
    const currentRoute = window.location.pathname.replace(
      "/admin/dashboard/settings/",
      ""
    );
    setActiveRoute(currentRoute);
  }, [window.location]);

  const handleRouteClick = (route) => {
    setActiveRoute(route.replace("/admin/dashboard/settings/", ""));
  };

  return (
    <div className="SubSidebar">
      <div className="toggleSubRoutes">
        <button className="btn btn-primary" onClick={() => handleSubRoutes()}>
          settings menu <IoIosArrowDown />
        </button>
      </div>

      <ul
        className={`subRoutes ${isOpen ? "open" : "closed"}`}
        ref={subRoutesRef}
      >
        {routesSetting.map((route, index) => (
          <li
            key={index}
            className={
              activeRoute ===
              route.path.replace("/admin/dashboard/settings/", "")
                ? "active"
                : ""
            }
            onClick={() => handleRouteClick(route.path)}
          >
            <Link to={route.path}>
              {React.createElement(route.icon)}
              <span>{route.name}</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
