import { Link } from "react-router-dom";
import Button from "../../components/Button/Button";
import { Input } from "../../components/Input";
import { userAuthContext } from "../../context/AuthContext";

// style
import "./Profile.style.scss";
import { Divider } from "../../components/Divider";

const Profile = () => {
  const { currentUser } = userAuthContext();
  return (
    <section className="container-md container-padded">
      <h1 className="page-header-2 profile-page-header">
        {currentUser?.displayName}
      </h1>
      <div className="profile-info-container">
        <div className="profile-info">
          <h2 className="profile-info__header">Name</h2>
          <form>
            <div className="form-group">
              <label htmlFor="name-field" className="form-label">
                Name
              </label>
              <Input
                autoComplete="off"
                type="text"
                placeholder="Update name"
                defaultValue={currentUser?.displayName || ""}
                id="name-field"
                className="form-control"
              />
            </div>
            <Divider />
            <Button className="btn btn--neutral" type="submit">
              Update
            </Button>
          </form>
        </div>
        <div className="profile-info">
          <h2 className="profile-info__header">Email</h2>
          <form>
            <div className="form-group">
              <label htmlFor="email-field" className="form-label">
                Email
              </label>
              <Input
                autoComplete="off"
                type="text"
                placeholder="Update email"
                defaultValue={currentUser?.email || ""}
                id="email-field"
                className="form-control"
              />
            </div>
            <Divider />
            <Button className="btn btn--neutral" type="submit">
              Update
            </Button>
          </form>
        </div>
        <div className="profile-info">
          <h2 className="profile-info__header">Password</h2>
          <p>
            Forgot your password?{" "}
            <Link to="/password-recovery" className="auth-link">
              Reset your password
            </Link>
          </p>
          <form>
            <div className="form-group">
              <label htmlFor="password-field" className="form-label">
                Old password
              </label>
              <Input
                autoComplete="off"
                type="password"
                placeholder="Enter password"
                id="password-field"
                className="form-control"
                isTypePassword
              />
            </div>
            <div className="form-group">
              <label htmlFor="password-confirm-field" className="form-label">
                New password
              </label>
              <Input
                autoComplete="off"
                type="password"
                placeholder="Enter password"
                id="password-confirm-field"
                className="form-control"
                isTypePassword
              />
            </div>
            <Divider />
            <Button className="btn btn--neutral" type="submit">
              Update
            </Button>
          </form>
        </div>
        <div className="profile-info">
          <h2 className="profile-info__header">Delete account</h2>
          <p className="profile-info__text">
            Your account will be permanently deleted and access will be lost to
            your data. This action is irreversable
          </p>
          <Divider />
          <Button type="button" className="btn btn--danger">
            Delete
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Profile;
