import { Link, useNavigate } from "react-router-dom";

// style
import "./Landing.style.scss";

import HeroIllustration from "../../assets/mind-blue.svg";
import { userAuthContext } from "../../context/AuthContext";
import { useEffect } from "react";

const Landing = () => {
  const { currentUser } = userAuthContext();
  const navigate = useNavigate();

  useEffect(() => {
    if (currentUser) {
      navigate("/courses");
    }
  }, []);
  return (
    <div className="wrap container">
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
          <Link to="/auth/signin" className="btn btn--gradient">
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
