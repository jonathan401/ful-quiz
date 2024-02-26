import { Link } from "react-router-dom";
import { CoursesType } from "../../data";
import { AiOutlineFieldTime } from "react-icons/ai";

// style
import "./CourseCard.style.scss";

interface CourseCardProps {
  data: CoursesType;
}

const CourseCard: React.FC<CourseCardProps> = ({ data }) => {
  const { title, code, key } = data;
  return (
    <li className="card">
      <Link to={`/courses/${key}`} className="card__link">
        <div className="card__content">
          <h2 className="card-meta__title">{code}</h2>
          <div className="card-meta">
            <h3 className="card__header">{title}</h3>
          </div>
          <p className="card__time">
            <AiOutlineFieldTime aria-hidden="true" /> 10 minutes
          </p>
          {/* <Link to={`/courses/${key}`} className="btn btn--primary card__cta">
          Take Quiz
        </Link> */}
        </div>
      </Link>
    </li>
  );
};

export default CourseCard;
