import { useState } from "react";
import "./Settings.css";

function Settings() {
  const [notifications, setNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(false);

  const handleSave = () => {
    alert("✅ Settings saved successfully!");
  };

  return (
    <div className="settings">
      <h2>⚙️ Settings</h2>

      <div className="settings-card">
        <h3>Application Settings</h3>

        <p>
          <strong>👤 Username:</strong> Admin
        </p>

        <p>
          <strong>📧 Email:</strong> admin@gmail.com
        </p>

        <p>
          <strong>🏢 Application:</strong> Inventory Management System
        </p>

        <hr />

        <h4>Preferences</h4>

        <div className="option">
          <label>
            <input
              type="checkbox"
              checked={notifications}
              onChange={() => setNotifications(!notifications)}
            />
            Enable Notifications
          </label>
        </div>

        <div className="option">
          <label>
            <input
              type="checkbox"
              checked={darkMode}
              onChange={() => setDarkMode(!darkMode)}
            />
            Dark Mode
          </label>
        </div>

        <button className="save-btn" onClick={handleSave}>
          💾 Save Changes
        </button>
      </div>
    </div>
  );
}

export default Settings;