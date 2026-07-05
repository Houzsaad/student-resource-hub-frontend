import { useState, useEffect } from "react";
import { getProfile } from "../api";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "./Profile.css";

function Profile() {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { isLoggedIn } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/login");
      return;
    }
    getProfile()
      .then(data => setProfile(data))
      .catch(err => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!profile) return <p>Profile not found</p>;

  // Get first letter of name for avatar
  const initial = profile.full_name?.charAt(0).toUpperCase() || "U";

  // Format date
  const joined = new Date(profile.date_joined).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric"
  });

  return (
    <div className="profile-page">
      <div className="profile-card">

        <div className="profile-avatar">{initial}</div>

        <h2 className="profile-name">{profile.full_name}</h2>
        <span className="profile-role">{profile.role}</span>

        <div className="profile-divider" />

        <div className="profile-info">
          <div className="profile-info-item">
            <span className="profile-info-label">Level</span>
            <span className="profile-info-value">
              {profile.level || "Not set"}
            </span>
          </div>
          <div className="profile-info-item">
            <span className="profile-info-label">Date Joined</span>
            <span className="profile-info-value">{joined}</span>
          </div>
        </div>

      </div>
    </div>
  );
}

export default Profile;