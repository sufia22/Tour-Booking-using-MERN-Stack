import "./Header.scss";
import logo from "../../assets/images/logo.png";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useContext, useEffect, useRef } from "react";
import { AuthContext } from "../../context/AuthContext";

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
    path: "/tour",
    display: "Tours",
  },
];

const Header = () => {
  const headerRef = useRef(null);
  const menuRef = useRef(null);
  const navigate = useNavigate();
  const { user, dispatch } = useContext(AuthContext);

  const logout = () => {
    dispatch({ type: "LOGOUT" });
    navigate("/");
  };

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

  const toggleMenu = () => menuRef.current.classList.toggle("show-menu");
  return (
    <>
      <div className="header" ref={headerRef}>
        <div className="container">
          <div className="row">
            <div className="nav_wrapper d-flex align-items-center justify-content-between">
              {/* -------- logo start -------- */}
              <div className="logo">
                <Link to={"/"}>
                  <img src={logo} alt="" />
                </Link>
              </div>
              {/* -------- logo end -------- */}

              {/* -------- menu start -------- */}
              <div className="navigation" ref={menuRef} onClick={toggleMenu}>
                <ul className="menu">
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
                <div className="nav__btns d-flex">
                  {user ? (
                    <>
                      <div className="user-box">
                        <h5 className="mb-0">{user.user.username}</h5>
                        <button className="btn btn-dark" onClick={logout}>
                          Logout
                        </button>
                      </div>
                    </>
                  ) : (
                    <>
                      <button className="btn secondary__btn">
                        <Link to={"/login"}>Login</Link>
                      </button>
                      <button className="btn primary__btn">
                        <Link to={"/register"}>Register</Link>
                      </button>
                    </>
                  )}
                </div>

                {/* mobile menu */}
                <span className="mobile__menu" onClick={toggleMenu}>
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
