import { Link } from "react-router-dom";

const Landing = () => {
  return (
    <div>
      <h1>Welcome to FUL Quizzer!</h1>
      <Link to={"/courses"}>View available courses</Link>
    </div>
  );
};

export default Landing;
