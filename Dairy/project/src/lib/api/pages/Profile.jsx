import React, { useState, useEffect } from 'react';
import { profileApi } from '../profileApi';

const Profile = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [avatarFile, setAvatarFile] = useState(null);
  const [updates, setUpdates] = useState({});

  // Fetch user profile on component mount
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const data = await profileApi.getProfile();
        setProfile(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const handleUpdateProfile = async () => {
    try {
      const updatedProfile = await profileApi.updateProfile(updates);
      setProfile(updatedProfile);
      setUpdates({});
      alert('Profile updated successfully!');
    } catch (err) {
      setError(err.message);
    }
  };

  const handleAvatarUpload = async () => {
    if (!avatarFile) {
      alert('Please select an avatar to upload.');
      return;
    }

    try {
      const updatedProfile = await profileApi.uploadAvatar(avatarFile);
      setProfile(updatedProfile);
      setAvatarFile(null);
      alert('Avatar uploaded successfully!');
    } catch (err) {
      setError(err.message);
    }
  };

  if (loading) return <div>Loading profile...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h1>Profile</h1>

      {profile && (
        <div>
          <img
            src={profile.avatar_url || 'https://via.placeholder.com/150'}
            alt='Avatar'
            style={{ maxWidth: '150px', borderRadius: '50%' }}
          />

          <div>
            <label>
              Name:
              <input
                type='text'
                defaultValue={profile.name || ''}
                onChange={(e) => setUpdates({ ...updates, name: e.target.value })}
              />
            </label>
          </div>

          <div>
            <label>
              Bio:
              <textarea
                defaultValue={profile.bio || ''}
                onChange={(e) => setUpdates({ ...updates, bio: e.target.value })}
              ></textarea>
            </label>
          </div>

          <button onClick={handleUpdateProfile}>Update Profile</button>
        </div>
      )}

      <div>
        <h2>Change Avatar</h2>
        <input type='file' accept='image/*' onChange={(e) => setAvatarFile(e.target.files[0])} />
        <button onClick={handleAvatarUpload}>Upload Avatar</button>
      </div>
    </div>
  );
};

export default Profile;
