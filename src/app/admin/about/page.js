'use client';

import { useState, useEffect } from 'react';

export default function AboutAdmin() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');

  // About content
  const [mission, setMission] = useState('');
  const [vision, setVision] = useState('');

  // Values
  const [values, setValues] = useState([]);
  const [editingValue, setEditingValue] = useState(null);

  // Milestones
  const [milestones, setMilestones] = useState([]);
  const [editingMilestone, setEditingMilestone] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch('/api/about');
      const data = await response.json();

      if (data.about) {
        setMission(data.about.mission || '');
        setVision(data.about.vision || '');
      }
      setValues(data.values || []);
      setMilestones(data.milestones || []);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const saveAbout = async () => {
    setSaving(true);
    try {
      const response = await fetch('/api/about', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ mission, vision })
      });

      if (response.ok) {
        setMessage('About content saved successfully!');
        setTimeout(() => setMessage(''), 3000);
      }
    } catch (error) {
      setMessage('Error saving content');
    } finally {
      setSaving(false);
    }
  };

  const saveValue = async (value) => {
    try {
      const url = value.id ? `/api/values/${value.id}` : '/api/values';
      const method = value.id ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(value)
      });

      if (response.ok) {
        fetchData();
        setEditingValue(null);
        setMessage('Value saved successfully!');
        setTimeout(() => setMessage(''), 3000);
      }
    } catch (error) {
      setMessage('Error saving value');
    }
  };

  const deleteValue = async (id) => {
    if (!confirm('Are you sure you want to delete this value?')) return;

    try {
      await fetch(`/api/values/${id}`, { method: 'DELETE' });
      fetchData();
      setMessage('Value deleted successfully!');
      setTimeout(() => setMessage(''), 3000);
    } catch (error) {
      setMessage('Error deleting value');
    }
  };

  const saveMilestone = async (milestone) => {
    try {
      const url = milestone.id ? `/api/milestones/${milestone.id}` : '/api/milestones';
      const method = milestone.id ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(milestone)
      });

      if (response.ok) {
        fetchData();
        setEditingMilestone(null);
        setMessage('Milestone saved successfully!');
        setTimeout(() => setMessage(''), 3000);
      }
    } catch (error) {
      setMessage('Error saving milestone');
    }
  };

  const deleteMilestone = async (id) => {
    if (!confirm('Are you sure you want to delete this milestone?')) return;

    try {
      await fetch(`/api/milestones/${id}`, { method: 'DELETE' });
      fetchData();
      setMessage('Milestone deleted successfully!');
      setTimeout(() => setMessage(''), 3000);
    } catch (error) {
      setMessage('Error deleting milestone');
    }
  };

  if (loading) {
    return <div className="p-8">Loading...</div>;
  }

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-8">Manage About Page</h1>

      {message && (
        <div className="mb-6 bg-green-50 text-green-600 p-4 rounded-lg">
          {message}
        </div>
      )}

      {/* Mission & Vision */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <h2 className="text-2xl font-semibold mb-6">Mission & Vision</h2>

        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Mission Statement
          </label>
          <textarea
            value={mission}
            onChange={(e) => setMission(e.target.value)}
            rows={4}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Vision Statement
          </label>
          <textarea
            value={vision}
            onChange={(e) => setVision(e.target.value)}
            rows={4}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <button
          onClick={saveAbout}
          disabled={saving}
          className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50"
        >
          {saving ? 'Saving...' : 'Save Mission & Vision'}
        </button>
      </div>

      {/* Core Values */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold">Core Values</h2>
          <button
            onClick={() => setEditingValue({ title: '', description: '', icon: '✓', order: values.length })}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
          >
            Add Value
          </button>
        </div>

        {editingValue && (
          <div className="mb-6 p-4 border border-gray-300 rounded-lg bg-gray-50">
            <h3 className="font-semibold mb-4">{editingValue.id ? 'Edit Value' : 'New Value'}</h3>
            <div className="space-y-4">
              <input
                type="text"
                placeholder="Title"
                value={editingValue.title}
                onChange={(e) => setEditingValue({...editingValue, title: e.target.value})}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
              />
              <textarea
                placeholder="Description"
                value={editingValue.description}
                onChange={(e) => setEditingValue({...editingValue, description: e.target.value})}
                rows={3}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
              />
              <input
                type="text"
                placeholder="Icon (emoji or text)"
                value={editingValue.icon}
                onChange={(e) => setEditingValue({...editingValue, icon: e.target.value})}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
              />
              <input
                type="number"
                placeholder="Order"
                value={editingValue.order}
                onChange={(e) => setEditingValue({...editingValue, order: parseInt(e.target.value)})}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
              />
              <div className="flex gap-2">
                <button
                  onClick={() => saveValue(editingValue)}
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
                >
                  Save
                </button>
                <button
                  onClick={() => setEditingValue(null)}
                  className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-400"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}

        <div className="space-y-4">
          {values.map((value) => (
            <div key={value.id} className="border border-gray-200 rounded-lg p-4 flex justify-between items-start">
              <div>
                <h3 className="font-semibold text-lg">{value.icon} {value.title}</h3>
                <p className="text-gray-600">{value.description}</p>
                <p className="text-sm text-gray-400 mt-1">Order: {value.order}</p>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => setEditingValue(value)}
                  className="text-blue-600 hover:underline"
                >
                  Edit
                </button>
                <button
                  onClick={() => deleteValue(value.id)}
                  className="text-red-600 hover:underline"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Milestones */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold">Company Milestones</h2>
          <button
            onClick={() => setEditingMilestone({ year: '', title: '', description: '', order: milestones.length })}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
          >
            Add Milestone
          </button>
        </div>

        {editingMilestone && (
          <div className="mb-6 p-4 border border-gray-300 rounded-lg bg-gray-50">
            <h3 className="font-semibold mb-4">{editingMilestone.id ? 'Edit Milestone' : 'New Milestone'}</h3>
            <div className="space-y-4">
              <input
                type="text"
                placeholder="Year"
                value={editingMilestone.year}
                onChange={(e) => setEditingMilestone({...editingMilestone, year: e.target.value})}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
              />
              <input
                type="text"
                placeholder="Title"
                value={editingMilestone.title}
                onChange={(e) => setEditingMilestone({...editingMilestone, title: e.target.value})}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
              />
              <textarea
                placeholder="Description"
                value={editingMilestone.description}
                onChange={(e) => setEditingMilestone({...editingMilestone, description: e.target.value})}
                rows={3}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
              />
              <input
                type="number"
                placeholder="Order"
                value={editingMilestone.order}
                onChange={(e) => setEditingMilestone({...editingMilestone, order: parseInt(e.target.value)})}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
              />
              <div className="flex gap-2">
                <button
                  onClick={() => saveMilestone(editingMilestone)}
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
                >
                  Save
                </button>
                <button
                  onClick={() => setEditingMilestone(null)}
                  className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-400"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}

        <div className="space-y-4">
          {milestones.map((milestone) => (
            <div key={milestone.id} className="border border-gray-200 rounded-lg p-4 flex justify-between items-start">
              <div>
                <h3 className="font-semibold text-lg">{milestone.year} - {milestone.title}</h3>
                <p className="text-gray-600">{milestone.description}</p>
                <p className="text-sm text-gray-400 mt-1">Order: {milestone.order}</p>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => setEditingMilestone(milestone)}
                  className="text-blue-600 hover:underline"
                >
                  Edit
                </button>
                <button
                  onClick={() => deleteMilestone(milestone.id)}
                  className="text-red-600 hover:underline"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
