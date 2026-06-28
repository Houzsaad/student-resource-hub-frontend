import { useState, useEffect } from "react";
import { getProfile } from "../api";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

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

  return (
    <div>
      <h2>My Profile</h2>
      <p>Full Name: {profile.full_name}</p>
      <p>Email: {profile.email}</p>
      <p>Role: {profile.role}</p>
      <p>Department: {profile.department}</p>
      <p>Level: {profile.level}</p>
      <p>Date Joined: {profile.date_joined}</p>
    </div>
  );
}

export default Profile;