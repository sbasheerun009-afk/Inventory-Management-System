import { useNavigate } from "react-router-dom";
import imsImage from "../../assets/ims.jpeg";
import "./HomePage.css";
function HomePage() {
const navigate = useNavigate();
return (
    <div
      className="home-page"
      style={{
        backgroundImage: `url(${imsImage})`
      }}
    >

      <div className="home-content">

        <h1>📦 Smart Inventory Management System</h1>
        <h3>Manage Your Business Inventory Easily</h3>
        <p>
          Track products, control stock, manage orders,
          handle suppliers and generate reports
          from one powerful platform.
        </p>
      <button
          onClick={() => navigate("/login")}
        >
          🔐 Login to Continue
        </button>
      </div>
      </div>
      );
}
export default HomePage;