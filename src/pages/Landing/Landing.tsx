import { Link } from "react-router-dom";

// style
import "./Landing.style.scss";

import HeroIllustration from "../../assets/mind-blue.svg";

const Landing = () => {
  return (
    <div className="wrap">
      <section className="hero">
        <div className="hero__illustration-container">
          <img src={HeroIllustration} alt="" className="hero__illustration" />
        </div>
        <div className="hero__content">
          <h1 className="hero__header">
            Challenge your mind, <span className="gradient-text">ignite</span>{" "}
            your knowledge!
          </h1>
          <p className="hero__text">
            Embark on a thrilling experience with Quizzer. Elevate your
            curiosity, challenge your brain, and discover the joy of learning
            through our captivating quizzes
          </p>
          <Link to="/auth/signup" className="btn btn--gradient">
            Get started
          </Link>
        </div>
      </section>
      <section className="features">
        <h2 className="visually-hidden">Why Quizzer?</h2>
        <div className="feature-list">
          <div className="feature-item">
            <div className="feature-item__img"></div>
            <div className="feature-item__text"></div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Landing;
