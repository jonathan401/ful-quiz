// style
import React, { ComponentProps } from "react";
import "./Avatar.style.scss";
import { userAuthContext } from "../../context/AuthContext";

interface AvatarProps extends ComponentProps<"button"> {
  photoUrl?: string;
  handleClick?: (e: any) => void;
}
// TODO: read on margin block start property

const Avatar: React.FC<AvatarProps> = ({ photoUrl, handleClick }) => {
  const { currentUser } = userAuthContext();
  return (
    <button className="avatar" onClick={handleClick}>
      {photoUrl ? (
        <img
          src={photoUrl}
          aria-hidden="true"
          alt={currentUser?.displayName || "user"}
        />
      ) : (
        <span className="user-menu__name-bubble">
          {currentUser && currentUser.displayName && currentUser.displayName[0]}
        </span>
      )}
    </button>
  );
};

export default Avatar;
