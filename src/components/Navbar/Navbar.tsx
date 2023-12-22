import { Link } from "react-router-dom";
// styling
import "./Navbar.style.scss";
import { useState } from "react";

const Navbar = () => {
  const [navOpen, setNavOpen] = useState(false);
  return (
    <header>
      <div className="header-container">
        <Link to="/" className="header-logo">
          <h1>Quizzer</h1>
        </Link>
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
              <Link to="/sign-up" className="nav__link btn btn--primary">
                Sign up
              </Link>
            </li>
            <li className="nav__list-item">
              <Link to="/sign-in" className="nav__link btn btn--outlined">
                Sign in
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
