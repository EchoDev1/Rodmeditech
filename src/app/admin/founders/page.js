'use client';

import { useState, useEffect } from 'react';

export default function FoundersAdmin() {
  const [founders, setFounders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState({ text: '', type: 'success' });
  const [editingFounder, setEditingFounder] = useState(null);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    fetchFounders();
  }, []);

  const showMessage = (text, type = 'success') => {
    setMessage({ text, type });
    setTimeout(() => setMessage({ text: '', type: 'success' }), 4000);
  };

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

    if (file.size > 2 * 1024 * 1024) {
      showMessage('Image must be under 2MB. Please compress it first.', 'error');
      return;
    }

    setUploading(true);
    try {
      const formData = new FormData();
      formData.append('file', file);

      // If the founder already exists in DB, send founderId so the photo
      // is written directly to the DB without going through the JSON PUT body.
      if (editingFounder?.id) {
        formData.append('founderId', editingFounder.id);
      }

      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        showMessage(data.error || 'Upload failed', 'error');
        return;
      }

      // Update local state to show the preview
      setEditingFounder(prev => ({ ...prev, photo: data.url }));

      if (data.saved) {
        showMessage('✅ Photo uploaded and saved successfully!');
        fetchFounders(); // refresh list to show new photo
      } else {
        showMessage('Photo ready — click "Save Founder" to finish creating this founder.');
      }
    } catch (error) {
      showMessage('Error uploading image. Try again.', 'error');
    } finally {
      setUploading(false);
    }
  };

  const saveFounder = async () => {
    if (!editingFounder.name || !editingFounder.role || !editingFounder.email) {
      showMessage('Name, Role, and Email are required.', 'error');
      return;
    }

    try {
      const isNew = !editingFounder.id;
      const url = isNew ? '/api/founders' : `/api/founders/${editingFounder.id}`;
      const method = isNew ? 'POST' : 'PUT';

      // Build the payload — for existing founders the photo was already
      // saved by the upload endpoint, so we only include it for new founders.
      const payload = {
        name: editingFounder.name,
        role: editingFounder.role,
        bio: editingFounder.bio,
        specialties: editingFounder.specialties || [],
        portfolio: editingFounder.portfolio || '',
        email: editingFounder.email,
        order: editingFounder.order || 0,
        // For new founders include the photo in the initial creation payload.
        // For existing founders the upload already wrote it to the DB directly.
        ...(isNew && { photo: editingFounder.photo || null }),
      };

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        fetchFounders();
        setEditingFounder(null);
        showMessage('Founder saved successfully!');
      } else {
        const err = await response.json();
        showMessage(err.error || 'Error saving founder', 'error');
      }
    } catch (error) {
      showMessage('Error saving founder. Try again.', 'error');
    }
  };

  const deleteFounder = async (id) => {
    if (!confirm('Are you sure you want to delete this founder?')) return;
    try {
      await fetch(`/api/founders/${id}`, { method: 'DELETE' });
      fetchFounders();
      showMessage('Founder deleted.');
    } catch (error) {
      showMessage('Error deleting founder.', 'error');
    }
  };

  const addSpecialty = () => {
    setEditingFounder(prev => ({
      ...prev,
      specialties: [...(prev.specialties || []), ''],
    }));
  };

  const updateSpecialty = (index, value) => {
    const specialties = [...(editingFounder.specialties || [])];
    specialties[index] = value;
    setEditingFounder(prev => ({ ...prev, specialties }));
  };

  const removeSpecialty = (index) => {
    const specialties = [...(editingFounder.specialties || [])];
    specialties.splice(index, 1);
    setEditingFounder(prev => ({ ...prev, specialties }));
  };

  if (loading) return <div className="p-8 text-slate-500">Loading...</div>;

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Manage Leadership / Founders</h1>
        <button
          onClick={() => setEditingFounder({
            name: '', role: '', bio: '', photo: null,
            specialties: [], portfolio: '', email: '', order: founders.length,
          })}
          className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
        >
          Add Founder
        </button>
      </div>

      {/* Message banner */}
      {message.text && (
        <div className={`mb-6 p-4 rounded-lg text-sm font-medium ${message.type === 'error'
            ? 'bg-red-50 text-red-700 border border-red-200'
            : 'bg-green-50 text-green-700 border border-green-200'
          }`}>
          {message.text}
        </div>
      )}

      {/* Edit / Create Form */}
      {editingFounder && (
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8 border border-slate-200">
          <h2 className="text-2xl font-semibold mb-6">
            {editingFounder.id ? 'Edit Founder' : 'New Founder'}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Left column */}
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Full Name *</label>
                <input type="text" value={editingFounder.name}
                  onChange={e => setEditingFounder(p => ({ ...p, name: e.target.value }))}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder="Dr. Jane Smith" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Role / Title *</label>
                <input type="text" value={editingFounder.role}
                  onChange={e => setEditingFounder(p => ({ ...p, role: e.target.value }))}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder="Co-Founder & CEO" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email Address *</label>
                <input type="email" value={editingFounder.email}
                  onChange={e => setEditingFounder(p => ({ ...p, email: e.target.value }))}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder="jane@rodmeditech.com" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Portfolio / LinkedIn URL</label>
                <input type="url" value={editingFounder.portfolio || ''}
                  onChange={e => setEditingFounder(p => ({ ...p, portfolio: e.target.value }))}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder="https://linkedin.com/in/..." />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Display Order</label>
                <input type="number" value={editingFounder.order}
                  onChange={e => setEditingFounder(p => ({ ...p, order: parseInt(e.target.value) || 0 }))}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" />
              </div>
            </div>

            {/* Right column */}
            <div className="space-y-4">
              {/* Photo upload */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Profile Photo
                  {editingFounder.id && (
                    <span className="ml-2 text-xs text-blue-600 font-normal">
                      (saves instantly when you pick a file)
                    </span>
                  )}
                </label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 bg-gray-50">
                  {/* Preview */}
                  {editingFounder.photo && (
                    <div className="mb-3 flex justify-center">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={editingFounder.photo}
                        alt="Preview"
                        className="w-32 h-32 rounded-lg object-cover border border-gray-200 shadow"
                      />
                    </div>
                  )}
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    disabled={uploading}
                    className="w-full text-sm"
                  />
                  {uploading && (
                    <p className="text-sm text-blue-600 mt-2 font-medium">⏳ Uploading photo...</p>
                  )}
                  <p className="text-xs text-gray-400 mt-2">Max size: 2MB. Use JPEG/PNG for best results.</p>
                </div>
              </div>

              {/* Biography */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Biography *</label>
                <textarea value={editingFounder.bio}
                  onChange={e => setEditingFounder(p => ({ ...p, bio: e.target.value }))}
                  rows={6}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder="Brief professional biography..." />
              </div>
            </div>
          </div>

          {/* Specialties */}
          <div className="mt-6">
            <div className="flex justify-between items-center mb-3">
              <label className="text-sm font-medium text-gray-700">Specialties / Expertise</label>
              <button onClick={addSpecialty} className="text-blue-600 hover:underline text-sm">
                + Add Specialty
              </button>
            </div>
            <div className="space-y-2">
              {(editingFounder.specialties || []).map((specialty, index) => (
                <div key={index} className="flex gap-2">
                  <input
                    type="text"
                    value={specialty}
                    onChange={e => updateSpecialty(index, e.target.value)}
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    placeholder="e.g., Medical Equipment Sales"
                  />
                  <button onClick={() => removeSpecialty(index)} className="text-red-600 hover:text-red-700 px-3">
                    Remove
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Action buttons */}
          <div className="mt-6 flex gap-4">
            <button onClick={saveFounder}
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700">
              Save Founder
            </button>
            <button onClick={() => setEditingFounder(null)}
              className="bg-gray-200 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-300">
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Founders List */}
      {founders.length === 0 && !editingFounder ? (
        <div className="text-center py-12 text-gray-500 bg-white rounded-lg border border-slate-200">
          No founders added yet. Click &quot;Add Founder&quot; to get started.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {founders.map((founder) => {
            const specialties = typeof founder.specialties === 'string'
              ? JSON.parse(founder.specialties)
              : founder.specialties || [];

            return (
              <div key={founder.id} className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
                <div className="flex items-start gap-4">
                  {/* Avatar */}
                  <div className="w-20 h-20 rounded-lg flex-shrink-0 overflow-hidden bg-gradient-to-br from-blue-500 to-blue-800 flex items-center justify-center">
                    {founder.photo ? (
                      /* eslint-disable-next-line @next/next/no-img-element */
                      <img src={founder.photo} alt={founder.name} className="w-full h-full object-cover" />
                    ) : (
                      <span className="text-2xl font-bold text-white">
                        {founder.name.split(' ').map(n => n[0]).join('')}
                      </span>
                    )}
                  </div>

                  <div className="flex-1 min-w-0">
                    <h3 className="text-lg font-semibold text-slate-900 truncate">{founder.name}</h3>
                    <p className="text-blue-600 text-sm mb-2">{founder.role}</p>
                    <p className="text-sm text-gray-500 line-clamp-2 mb-2">{founder.bio}</p>
                    {specialties.length > 0 && (
                      <div className="flex flex-wrap gap-1 mb-3">
                        {specialties.slice(0, 3).map((s, i) => (
                          <span key={i} className="px-2 py-0.5 bg-blue-50 text-blue-600 text-xs rounded-full">{s}</span>
                        ))}
                        {specialties.length > 3 && (
                          <span className="px-2 py-0.5 bg-slate-100 text-slate-500 text-xs rounded-full">+{specialties.length - 3} more</span>
                        )}
                      </div>
                    )}
                    {/* Photo status indicator */}
                    <p className={`text-xs mb-2 ${founder.photo ? 'text-green-600' : 'text-amber-600'}`}>
                      {founder.photo ? '✅ Photo uploaded' : '⚠️ No photo — edit to add one'}
                    </p>
                    <div className="flex gap-3">
                      <button
                        onClick={() => setEditingFounder({ ...founder, specialties })}
                        className="text-blue-600 hover:underline text-sm font-medium"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => deleteFounder(founder.id)}
                        className="text-red-600 hover:underline text-sm font-medium"
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
      )}
    </div>
  );
}
