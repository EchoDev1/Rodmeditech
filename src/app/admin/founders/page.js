'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

export default function FoundersAdmin() {
  const [founders, setFounders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');
  const [editingFounder, setEditingFounder] = useState(null);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    fetchFounders();
  }, []);

  const fetchFounders = async () => {
    try {
      const response = await fetch('/api/founders');
      const data = await response.json();
      setFounders(data);
    } catch (error) {
      console.error('Error fetching founders:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploading(true);
    try {
      const formData = new FormData();
      formData.append('file', file);

      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData
      });

      const data = await response.json();

      if (response.ok) {
        setEditingFounder({ ...editingFounder, photo: data.url });
        setMessage('Image uploaded successfully!');
        setTimeout(() => setMessage(''), 3000);
      }
    } catch (error) {
      setMessage('Error uploading image');
    } finally {
      setUploading(false);
    }
  };

  const saveFounder = async () => {
    try {
      const url = editingFounder.id ? `/api/founders/${editingFounder.id}` : '/api/founders';
      const method = editingFounder.id ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editingFounder)
      });

      if (response.ok) {
        fetchFounders();
        setEditingFounder(null);
        setMessage('Founder saved successfully!');
        setTimeout(() => setMessage(''), 3000);
      }
    } catch (error) {
      setMessage('Error saving founder');
    }
  };

  const deleteFounder = async (id) => {
    if (!confirm('Are you sure you want to delete this founder?')) return;

    try {
      await fetch(`/api/founders/${id}`, { method: 'DELETE' });
      fetchFounders();
      setMessage('Founder deleted successfully!');
      setTimeout(() => setMessage(''), 3000);
    } catch (error) {
      setMessage('Error deleting founder');
    }
  };

  const addSpecialty = () => {
    const specialties = editingFounder.specialties || [];
    setEditingFounder({
      ...editingFounder,
      specialties: [...specialties, '']
    });
  };

  const updateSpecialty = (index, value) => {
    const specialties = [...(editingFounder.specialties || [])];
    specialties[index] = value;
    setEditingFounder({ ...editingFounder, specialties });
  };

  const removeSpecialty = (index) => {
    const specialties = [...(editingFounder.specialties || [])];
    specialties.splice(index, 1);
    setEditingFounder({ ...editingFounder, specialties });
  };

  if (loading) {
    return <div className="p-8">Loading...</div>;
  }

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Manage Leadership/Founders</h1>
        <button
          onClick={() => setEditingFounder({
            name: '',
            role: '',
            bio: '',
            photo: '',
            specialties: [],
            portfolio: '',
            email: '',
            order: founders.length
          })}
          className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
        >
          Add Founder
        </button>
      </div>

      {message && (
        <div className="mb-6 bg-green-50 text-green-600 p-4 rounded-lg">
          {message}
        </div>
      )}

      {/* Editing Form */}
      {editingFounder && (
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <h2 className="text-2xl font-semibold mb-6">
            {editingFounder.id ? 'Edit Founder' : 'New Founder'}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Left Column */}
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Full Name *
                </label>
                <input
                  type="text"
                  value={editingFounder.name}
                  onChange={(e) => setEditingFounder({ ...editingFounder, name: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder="John Doe"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Role/Title *
                </label>
                <input
                  type="text"
                  value={editingFounder.role}
                  onChange={(e) => setEditingFounder({ ...editingFounder, role: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder="CEO & Co-Founder"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address *
                </label>
                <input
                  type="email"
                  value={editingFounder.email}
                  onChange={(e) => setEditingFounder({ ...editingFounder, email: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder="john@rodmeditech.com"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Portfolio/LinkedIn URL
                </label>
                <input
                  type="url"
                  value={editingFounder.portfolio || ''}
                  onChange={(e) => setEditingFounder({ ...editingFounder, portfolio: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder="https://linkedin.com/in/..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Display Order
                </label>
                <input
                  type="number"
                  value={editingFounder.order}
                  onChange={(e) => setEditingFounder({ ...editingFounder, order: parseInt(e.target.value) })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Profile Photo
                </label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-4">
                  {editingFounder.photo && (
                    <div className="mb-4 flex justify-center">
                      <Image
                        src={editingFounder.photo}
                        alt="Preview"
                        width={200}
                        height={200}
                        className="rounded-lg object-cover"
                      />
                    </div>
                  )}
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    disabled={uploading}
                    className="w-full"
                  />
                  {uploading && (
                    <p className="text-sm text-gray-600 mt-2">Uploading...</p>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Biography *
                </label>
                <textarea
                  value={editingFounder.bio}
                  onChange={(e) => setEditingFounder({ ...editingFounder, bio: e.target.value })}
                  rows={6}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder="Brief professional biography..."
                />
              </div>
            </div>
          </div>

          {/* Specialties */}
          <div className="mt-6">
            <div className="flex justify-between items-center mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Specialties/Expertise
              </label>
              <button
                onClick={addSpecialty}
                className="text-blue-600 hover:underline text-sm"
              >
                + Add Specialty
              </button>
            </div>
            <div className="space-y-2">
              {(editingFounder.specialties || []).map((specialty, index) => (
                <div key={index} className="flex gap-2">
                  <input
                    type="text"
                    value={specialty}
                    onChange={(e) => updateSpecialty(index, e.target.value)}
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    placeholder="e.g., Medical Equipment Sales"
                  />
                  <button
                    onClick={() => removeSpecialty(index)}
                    className="text-red-600 hover:text-red-700 px-4"
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div className="mt-6 flex gap-4">
            <button
              onClick={saveFounder}
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
            >
              Save Founder
            </button>
            <button
              onClick={() => setEditingFounder(null)}
              className="bg-gray-300 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-400"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Founders List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {founders.map((founder) => {
          const specialties = typeof founder.specialties === 'string'
            ? JSON.parse(founder.specialties)
            : founder.specialties || [];

          return (
            <div key={founder.id} className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-start gap-4">
                <div className="w-24 h-24 bg-gray-200 rounded-lg flex-shrink-0 overflow-hidden">
                  {founder.photo ? (
                    <Image
                      src={founder.photo}
                      alt={founder.name}
                      width={96}
                      height={96}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-2xl font-bold text-gray-400">
                      {founder.name.split(' ').map(n => n[0]).join('')}
                    </div>
                  )}
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold">{founder.name}</h3>
                  <p className="text-blue-600 mb-2">{founder.role}</p>
                  <p className="text-sm text-gray-600 mb-3">{founder.bio}</p>
                  {specialties.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-3">
                      {specialties.map((specialty, i) => (
                        <span
                          key={i}
                          className="px-2 py-1 bg-blue-50 text-blue-600 text-xs rounded"
                        >
                          {specialty}
                        </span>
                      ))}
                    </div>
                  )}
                  <div className="flex gap-2 mt-4">
                    <button
                      onClick={() => {
                        setEditingFounder({
                          ...founder,
                          specialties
                        });
                      }}
                      className="text-blue-600 hover:underline text-sm"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => deleteFounder(founder.id)}
                      className="text-red-600 hover:underline text-sm"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {founders.length === 0 && !editingFounder && (
        <div className="text-center py-12 text-gray-500">
          No founders added yet. Click "Add Founder" to get started.
        </div>
      )}
    </div>
  );
}
