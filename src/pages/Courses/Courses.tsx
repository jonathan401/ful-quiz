import CourseCard from "../../components/CourseCard/CourseCard";
import { userAuthContext } from "../../context/AuthContext";
import { CoursesList } from "../../data";

// style
import "./Courses.style.scss";

const Courses = () => {
  const { currentUser } = userAuthContext();
  return (
    <div className="container-padded">
      <div className="courses-list">
        <h1 className="page-header-2">Courses</h1>
        <ul className="courses-list__items">
          {CoursesList.map((course) => (
            <CourseCard key={course.key} data={course} />
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Courses;
