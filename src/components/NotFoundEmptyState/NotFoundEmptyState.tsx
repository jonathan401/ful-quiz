import { Link } from "react-router-dom";

// image imports
import NotFoundImage from "../../assets/not-found.svg";
import EmptyImage from "../../assets/emtpy.svg";

// styles
import "./NotFound.style.scss";

interface NotFoundProps {
  title: string;
  redirectUrl: string;
  redirectText: string;
  type: "not found" | "empty";
}

const NotFound: React.FC<NotFoundProps> = ({
  title,
  redirectUrl,
  redirectText,
  type,
}) => {
  return (
    <div className="redirect">
      <img
        src={EmptyImage}
        alt="not found"
        className="redirect__illustration"
      />
      <h1 className="redirect__header">{title}</h1>
      <Link to={redirectUrl} className="btn btn--primary">
        {redirectText}
      </Link>
    </div>
  );
};

export default NotFound;
