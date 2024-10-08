import { Link } from "react-router-dom";

// image imports
import NotFoundImage from "../../assets/not-found-blue.svg";
import EmptyImage from "../../assets/empty-blue.svg";

// styles
import "./NotFoundEmptyState.style.scss";

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
    <div className="redirect container-padded">
      <img
        src={type === "empty" ? EmptyImage : NotFoundImage}
        alt="not found"
        className="redirect__illustration"
      />
      <h1 className="redirect__header">{title}</h1>
      <p className="redirect__text">
        {type === "not found"
          ? "Oops! can't find the page you're looking for"
          : "Oops! The questions are not available at the moment"}
      </p>
      <Link to={redirectUrl} className="btn btn--primary">
        {redirectText}
      </Link>
    </div>
  );
};

export default NotFound;
