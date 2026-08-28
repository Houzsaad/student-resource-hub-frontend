import { useState, useEffect } from "react";
import { getProfile, getMyResources } from "../api";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import ResourceCard from "./ResourceCard";
import "./Profile.css";
import ShimmerCard from "./ShimmerCard";


function Profile() {
  const [profile, setProfile] = useState(null);
  const [resources, setResources] = useState([]);
  const [loading, setLoading] = useState(true);
  const [resourceLoading, setResourceLoading] = useState(true);
  const [error, setError] = useState(null);

  const { isLoggedIn } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/login");
      return;
    }

    async function loadProfile() {
      try {
        const [profileData, resourcesData] = await Promise.all([
          getProfile(),
          getMyResources(),
        ]);

        setProfile(profileData);
        setResources(resourcesData.results || resourcesData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
        setResourceLoading(false);
      }
    }

    loadProfile();
  }, [isLoggedIn, navigate]);
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!profile) return <p>Profile not found</p>;

      if (loading) return (
      <div className="resource-list-page">
          <div className="resource-grid">
          {[1, 2, 3, 4, 5, 6].map(i => (
              <ShimmerCard key={i} />
          ))}
          </div>
      </div>
      ); 
      
  const initial = profile.full_name?.charAt(0).toUpperCase() || "U";

  const joined = new Date(profile.date_joined).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <div className="profile-page">

      {/* Profile information */}
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

      {/* My Resources */}
      <div className="my-resources">
        <h2>My Resources</h2>

        {resourceLoading ? (
          <p>Loading your resources...</p>
        ) : resources.length === 0 ? (
          <p>You haven't posted any resources yet.</p>
        ) : (
          <div className="resource-list">
            {resources.map((resource) => (
              <ResourceCard
                key={resource.id}
                id={resource.id}
                title={resource.title}
                description={resource.description}
                created_at={resource.created_at}
              />
            ))}
          </div>
        )}
      </div>

    </div>
  );
}

export default Profile;