import CourseCard from "../../components/CourseCard/CourseCard";
import { CoursesList, t } from "../../data";

// style
import "./Courses.style.scss";

const Courses = () => {
  return (
    <div className="courses-list">
      <h1 className="courses-list__header">Courses</h1>
      <ul className="courses-list__items">
        {CoursesList.map((course) => (
          <CourseCard key={course.key} data={course} />
        ))}

        {/* {Object.keys(CoursesList)} */}
      </ul>
    </div>
  );
};

export default Courses;
