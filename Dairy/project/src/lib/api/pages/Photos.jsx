import React, { useState } from 'react';
import { photosApi } from '../photos';

const Photos = () => {
  const [photos, setPhotos] = useState([]);
  const [file, setFile] = useState(null);
  const [error, setError] = useState(null);
  const [diaryEntryId, setDiaryEntryId] = useState(''); // Optional: Link photo to a specific diary entry

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUploadPhoto = async () => {
    if (!file) {
      alert('Please select a file to upload.');
      return;
    }

    try {
      const uploadedPhoto = await photosApi.uploadPhoto(file, diaryEntryId);
      setPhotos([...photos, uploadedPhoto]);
      setFile(null);
      alert('Photo uploaded successfully!');
    } catch (err) {
      setError(err.message);
    }
  };

  const handleDeletePhoto = async (id) => {
    try {
      await photosApi.deletePhoto(id);
      setPhotos(photos.filter((photo) => photo.id !== id));
      alert('Photo deleted successfully!');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div>
      <h1>Photos</h1>

      <div>
        <input type='file' accept='image/*' onChange={handleFileChange} />
        <input
          type='text'
          placeholder='Diary Entry ID (optional)'
          value={diaryEntryId}
          onChange={(e) => setDiaryEntryId(e.target.value)}
        />
        <button onClick={handleUploadPhoto}>Upload Photo</button>
      </div>

      {error && <div style={{ color: 'red' }}>Error: {error}</div>}

      <ul>
        {photos.map((photo) => (
          <li key={photo.id}>
            <img src={photo.url} alt='Uploaded' style={{ maxWidth: '200px' }} />
            <button onClick={() => handleDeletePhoto(photo.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Photos;
