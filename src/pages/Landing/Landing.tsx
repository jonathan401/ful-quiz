import { Link } from "react-router-dom";

// style
import "./Landing.style.scss";

import HeroIllustration from "../../assets/quiz-landing.svg";

const Landing = () => {
  return (
    <div>
      <section className="hero">
        <div className="hero__illustration-container">
          <img src={HeroIllustration} alt="" className="hero__illustration" />
        </div>
        <div className="hero__content">
          <h1 className="hero__header">
            <span className="gradient-text">Welcome</span> to Quizzer
          </h1>
          <p className="hero__text">
            Embark on a thrilling experience with Quizzer. Elevate your
            curiosity, challenge your brain, and discover the joy of learning
            through our captivating quizzes
          </p>
          <Link to="/courses" className="btn btn--primary">
            Get started
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Landing;
