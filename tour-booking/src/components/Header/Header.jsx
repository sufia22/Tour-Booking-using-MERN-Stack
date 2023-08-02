import "./Header.scss";
import logo from "../../assets/images/logo.png";
import { Link, NavLink } from "react-router-dom";
import { useEffect, useRef } from "react";

const nav__links = [
  {
    path: "/",
    display: "Home",
  },
  {
    path: "/about",
    display: "About",
  },
  {
    path: "/tours",
    display: "Tours",
  },
];

const Header = () => {
  const headerRef = useRef(null);

  const stickyHeaderFunc = () => {
    window.addEventListener("scroll", () => {
      if (
        document.body.scrollTop > 80 ||
        document.documentElement.scrollTop > 80
      ) {
        headerRef.current.classList.add("sticky-header");
      } else {
        headerRef.current.classList.remove("sticky-header");
      }
    });
  };

  useEffect(() => {
    stickyHeaderFunc();

    return window.removeEventListener("scroll", stickyHeaderFunc);
  });

  return (
    <>
      <div className="header" ref={headerRef}>
        <div className="container">
          <div className="row">
            <div className="nav_wrapper d-flex align-items-center justify-content-between">
              {/* -------- logo start -------- */}
              <div className="logo">
                <img src={logo} alt="" />
              </div>
              {/* -------- logo end -------- */}

              {/* -------- menu start -------- */}
              <div className="navigation ">
                <ul>
                  {nav__links.map((item, index) => {
                    return (
                      <li className="nav__item" key={index}>
                        <NavLink
                          to={item.path}
                          className={(navClass) =>
                            navClass.isActive ? "active__link" : ""
                          }
                        >
                          {item.display}
                        </NavLink>
                      </li>
                    );
                  })}
                </ul>
              </div>
              {/* -------- menu end -------- */}

              {/* -------- nav right start -------- */}
              <div className="nav__right">
                <div className="nav__btns">
                  <button className="btn secondary__btn">
                    <Link to={"/login"}>Login</Link>
                  </button>
                  <button className="btn primary__btn">
                    <Link to={"/register"}>Register</Link>
                  </button>
                </div>
                <span className="mobile__menu">
                  <i className="ri-menu-line"></i>
                </span>
              </div>
              {/* -------- nav right end -------- */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
