import { Link } from "react-router-dom";
import { CoursesType } from "../../data";

// style
import "./CourseCard.style.scss";

interface CourseCardProps {
  data: CoursesType;
}

const CourseCard: React.FC<CourseCardProps> = ({ data }) => {
  const { title, code, key } = data;
  return (
    <li className="card">
      {/* <div className="card__img"></div> */}
      <div className="card__content">
        <h2 className="card__header">{title}</h2>
        <div className="card-meta">
          <h3 className="card-meta__title">{code}</h3>
          <p className="exam-duration">Time allowed: 10 minutes</p>
        </div>
        <Link to={`/courses/${key}`} className="btn btn--primary card__cta">
          Take Quiz
        </Link>
      </div>
    </li>
  );
};

export default CourseCard;
