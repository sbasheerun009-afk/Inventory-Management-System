import { useState } from "react";
import "./Setting.css";

function Setting() {
  const [companyName, setCompanyName] = useState("Inventory Management System");
  const [adminName, setAdminName] = useState("Admin");
  const [email, setEmail] = useState("admin@gmail.com");
  const [theme, setTheme] = useState("Light");

  const handleSave = () => {
    alert("Settings Saved Successfully!");
  };

  return (
    <div className="setting-container">
      <h2>⚙️ Settings</h2>

      <div className="setting-form">

        <label>Company Name</label>
        <input
          type="text"
          value={companyName}
          onChange={(e) => setCompanyName(e.target.value)}
        />

        <label>Admin Name</label>
        <input
          type="text"
          value={adminName}
          onChange={(e) => setAdminName(e.target.value)}
        />

        <label>Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <label>Theme</label>
        <select
          value={theme}
          onChange={(e) => setTheme(e.target.value)}
        >
          <option>Light</option>
          <option>Dark</option>
        </select>

        <button onClick={handleSave}>
          💾 Save Settings
        </button>

      </div>
    </div>
  );
}

export default Setting;