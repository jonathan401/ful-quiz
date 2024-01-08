import React, { ReactEventHandler, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AiOutlineUser } from "react-icons/ai";
import { MdOutlineSettings, MdOutlineLogout } from "react-icons/md";
import { userAuthContext } from "../../context/AuthContext";

import "./UserMenu.style.scss";

interface UserMenuProps {
  photoUrl?: string;
}

const UserMenu: React.FC<UserMenuProps> = ({ photoUrl }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const { currentUser, LogOut } = userAuthContext();

  const closeMenu = () => {
    setIsOpen(false);
  };

  const handleClose = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") {
      console.log("hi");
    }
  };

  useEffect(() => {
    window.addEventListener("click", closeMenu);

    return () => window.removeEventListener("click", closeMenu);
  }, []);

  return (
    <div className="user-menu">
      {/* display the options here */}
      <button
        aria-haspopup="menu"
        aria-expanded="false"
        aria-label="user menu"
        aria-controls="user-menu"
        className="user-menu__toggle-btn"
        onClick={(e) => {
          e.stopPropagation();
          setIsOpen((isOpen) => !isOpen);
        }}
      >
        {photoUrl ? (
          <img
            src={photoUrl}
            aria-hidden="true"
            alt=""
            className="user-menu__avatar"
          />
        ) : (
          <span className="user-menu__name-bubble">
            {currentUser &&
              currentUser.displayName &&
              currentUser.displayName[0]}
          </span>
        )}
      </button>
      {isOpen && (
        <ul id="user-menu" className="user-menu-items" role="menu">
          <li className="user-menu__link-item" role="menuitem">
            <Link to="user/settings" className="user-menu__link">
              <AiOutlineUser aria-hidden="true" /> Profile
            </Link>
          </li>
          <li className="user-menu__link-item" role="menuitem">
            <Link to="user/settings" className="user-menu__link">
              <MdOutlineSettings aria-hidden="true" /> Settings
            </Link>
          </li>
          <li className="user-menu__link-item" role="menuitem">
            <button className="user-menu-btn" onClick={LogOut}>
              <MdOutlineLogout aria-hidden="true" />
              Log out
            </button>
          </li>
        </ul>
      )}
    </div>
  );
};

export default UserMenu;
