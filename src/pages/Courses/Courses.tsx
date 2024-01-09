import CourseCard from "../../components/CourseCard/CourseCard";
import { userAuthContext } from "../../context/AuthContext";
import { CoursesList, t } from "../../data";

// style
import "./Courses.style.scss";

const Courses = () => {
  const { LogOut, currentUser } = userAuthContext();
  return (
    <div>
      <div className="courses-list">
        <h1 className="page-header">Courses</h1>
        <p>Hello {currentUser?.displayName}</p>
        <button className="btn btn--primary" onClick={LogOut}>
          Log out
        </button>
        <ul className="courses-list__items">
          {CoursesList.map((course) => (
            <CourseCard key={course.key} data={course} />
          ))}

          {/* {Object.keys(CoursesList)} */}
        </ul>
      </div>
    </div>
  );
};

export default Courses;
