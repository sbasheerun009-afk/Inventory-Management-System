import "./AdminProfile.css";

function AdminProfile() {
  return (
    <div className="admin-profile-page">
      <div className="profile-card">
        <div className="profile-header">
          <div className="profile-avatar">👤</div>
          <h2>Admin Profile</h2>
          <p>Inventory Manager</p>
        </div>

        <div className="profile-details">
          <div className="profile-item">
            <label>Full Name</label>
            <p>Admin</p>
          </div>

          <div className="profile-item">
            <label>Email</label>
            <p>admin@gmail.com</p>
          </div>

          <div className="profile-item">
            <label>Phone</label>
            <p>9876543210</p>
          </div>

          <div className="profile-item">
            <label>Role</label>
            <p>Inventory Manager</p>
          </div>
        </div>

        <button className="edit-profile-btn">
          ✏️ Edit Profile
        </button>
      </div>
    </div>
  );
}

export default AdminProfile;