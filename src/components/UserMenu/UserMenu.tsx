import React, { ReactEventHandler, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AiOutlineUser } from "react-icons/ai";
import { MdOutlineSettings, MdOutlineLogout } from "react-icons/md";
import { userAuthContext } from "../../context/AuthContext";

import "./UserMenu.style.scss";
import Avatar from "../Avatar/Avatar";
import Divider from "../Divider/Divider";

interface UserMenuProps {
  photoUrl?: string;
}

const UserMenu: React.FC<UserMenuProps> = ({ photoUrl }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const { currentUser, LogOut } = userAuthContext();

  const closeMenu = () => {
    setIsOpen(false);
  };

  useEffect(() => {
    window.addEventListener("click", closeMenu);

    return () => window.removeEventListener("click", closeMenu);
  }, []);

  return (
    <div className="user-menu">
      <Avatar
        aria-haspopup="menu"
        aria-expanded="false"
        aria-label="user menu"
        aria-controls="user-menu"
        handleClick={(e) => {
          e.stopPropagation();
          setIsOpen((isOpen) => !isOpen);
        }}
      />
      {isOpen && (
        <ul id="user-menu" className="user-menu-items" role="menu">
          <li className="user-menu__link user-menu__link--disabled">
            <Avatar />
            {currentUser?.email}
          </li>
          <Divider />
          <li className="user-menu__link-item" role="menuitem">
            <Link to="/profile" className="user-menu__link">
              <AiOutlineUser aria-hidden="true" /> Profile
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
