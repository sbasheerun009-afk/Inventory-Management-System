import { Link } from "react-router-dom";
import "./NotFound.css";

function NotFound() {
  return (
    <div className="notfound">
      <h1>404</h1>
      <h2>Page Not Found</h2>
      <p>Sorry! The page you are looking for does not exist.</p>

      <Link to="/dashboard">
        <button className="home-btn">
          Go to Dashboard
        </button>
      </Link>
    </div>
  );
}

export default NotFound;