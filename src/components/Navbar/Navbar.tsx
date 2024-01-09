import { Link } from "react-router-dom";
// styling
import "./Navbar.style.scss";
import { useState } from "react";
import { userAuthContext } from "../../context/AuthContext";
import UserMenu from "../UserMenu/UserMenu";

const Navbar = () => {
  const [navOpen, setNavOpen] = useState(false);
  const { currentUser } = userAuthContext();
  return (
    <header>
      <div className="header-container">
        <Link to={currentUser ? "/courses" : "/"} className="header-logo">
          <h1>Quizzer</h1>
        </Link>
        {currentUser && <UserMenu />}
        {!currentUser && (
          <>
            <button
              aria-expanded={navOpen}
              aria-label="open menu"
              aria-haspopup="true"
              className="header-toggle-btn"
              aria-controls="nav"
              onClick={() => setNavOpen((prevState) => !prevState)}
            >
              <span></span>
            </button>
            <nav className={navOpen ? "nav nav--open" : "nav"} id="nav">
              <ul className="nav__list">
                <li className="nav__list-item">
                  <Link
                    to="/auth/register"
                    className="nav__link btn btn--primary"
                  >
                    Sign up
                  </Link>
                </li>
                <li className="nav__list-item">
                  <Link
                    to="/auth/signin"
                    className="nav__link btn btn--outlined"
                  >
                    Sign in
                  </Link>
                </li>
              </ul>
            </nav>
          </>
        )}
      </div>
    </header>
  );
};

export default Navbar;
