import React, { useState, useEffect } from 'react';
import { diaryApi } from '../diary';

const Diary = () => {
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [newEntry, setNewEntry] = useState('');

  // Fetch diary entries on component mount
  useEffect(() => {
    const fetchEntries = async () => {
      try {
        const data = await diaryApi.getDiaryEntries();
        setEntries(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchEntries();
  }, []);

  const handleAddEntry = async () => {
    if (!newEntry.trim()) return;

    try {
      const entry = { content: newEntry, created_at: new Date().toISOString() };
      const createdEntry = await diaryApi.createDiaryEntry(entry);
      setEntries([createdEntry, ...entries]);
      setNewEntry('');
    } catch (err) {
      setError(err.message);
    }
  };

  const handleUpdateEntry = async (id, updates) => {
    const newContent = prompt('Edit entry:', updates.content);
    if (newContent === null) return; // User cancelled the prompt

    try {
      const updatedEntry = await diaryApi.updateDiaryEntry(id, { content: newContent });
      setEntries(entries.map((entry) => (entry.id === id ? updatedEntry : entry)));
    } catch (err) {
      setError(err.message);
    }
  };

  const handleDeleteEntry = async (id) => {
    try {
      await diaryApi.deleteDiaryEntry(id);
      setEntries(entries.filter((entry) => entry.id !== id));
    } catch (err) {
      setError(err.message);
    }
  };

  if (loading) return <div>Loading diary entries...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h1>Diary</h1>

      <div>
        <textarea
          value={newEntry}
          onChange={(e) => setNewEntry(e.target.value)}
          placeholder='Write a new diary entry'
        ></textarea>
        <button onClick={handleAddEntry}>Add Entry</button>
      </div>

      <ul>
        {entries.map((entry) => (
          <li key={entry.id}>
            <p>{entry.content}</p>
            <small>{new Date(entry.created_at).toLocaleString()}</small>
            <button onClick={() => handleUpdateEntry(entry.id, { content: entry.content })}>
              Edit
            </button>
            <button onClick={() => handleDeleteEntry(entry.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Diary;
