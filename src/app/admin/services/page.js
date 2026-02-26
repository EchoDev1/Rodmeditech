'use client';

import { useState, useEffect } from 'react';

export default function ServicesAdmin() {
    const [services, setServices] = useState([]);
    const [loading, setLoading] = useState(true);
    const [message, setMessage] = useState('');
    const [editingService, setEditingService] = useState(null);

    useEffect(() => {
        fetchServices();
    }, []);

    const fetchServices = async () => {
        try {
            const response = await fetch('/api/services');
            const data = await response.json();
            setServices(data || []);
        } catch (error) {
            console.error('Error fetching services:', error);
        } finally {
            setLoading(false);
        }
    };

    const saveService = async () => {
        try {
            const url = editingService.id ? `/api/services/${editingService.id}` : '/api/services';
            const method = editingService.id ? 'PUT' : 'POST';

            const response = await fetch(url, {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(editingService)
            });

            if (response.ok) {
                fetchServices();
                setEditingService(null);
                setMessage('Service saved successfully!');
                setTimeout(() => setMessage(''), 3000);
            }
        } catch (error) {
            setMessage('Error saving service');
        }
    };

    const deleteService = async (id) => {
        if (!confirm('Are you sure you want to delete this service?')) return;

        try {
            await fetch(`/api/services/${id}`, { method: 'DELETE' });
            fetchServices();
            setMessage('Service deleted successfully!');
            setTimeout(() => setMessage(''), 3000);
        } catch (error) {
            setMessage('Error deleting service');
        }
    };

    const addBullet = () => {
        const bullets = editingService.bullets || [];
        setEditingService({ ...editingService, bullets: [...bullets, ''] });
    };

    const updateBullet = (index, value) => {
        const bullets = [...(editingService.bullets || [])];
        bullets[index] = value;
        setEditingService({ ...editingService, bullets });
    };

    const removeBullet = (index) => {
        const bullets = [...(editingService.bullets || [])];
        bullets.splice(index, 1);
        setEditingService({ ...editingService, bullets });
    };

    if (loading) return <div className="p-8">Loading...</div>;

    return (
        <div className="p-8">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold">Manage Services</h1>
                <button
                    onClick={() => setEditingService({
                        title: '', description: '', icon: '', bullets: [], order: services.length
                    })}
                    className="bg-sky-600 text-white px-6 py-2 rounded-lg hover:bg-sky-700"
                >
                    Add Service
                </button>
            </div>

            {message && (
                <div className="mb-6 bg-green-50 text-green-600 p-4 rounded-lg">
                    {message}
                </div>
            )}

            {editingService && (
                <div className="bg-white rounded-lg shadow-lg p-6 mb-8 border border-slate-200">
                    <h2 className="text-2xl font-semibold mb-6">
                        {editingService.id ? 'Edit Service' : 'New Service'}
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-2">Title *</label>
                                <input
                                    type="text"
                                    value={editingService.title}
                                    onChange={(e) => setEditingService({ ...editingService, title: e.target.value })}
                                    className="w-full px-4 py-2 border border-slate-300 rounded-lg"
                                    placeholder="Service Name"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-2">Description *</label>
                                <textarea
                                    value={editingService.description}
                                    onChange={(e) => setEditingService({ ...editingService, description: e.target.value })}
                                    rows={4}
                                    className="w-full px-4 py-2 border border-slate-300 rounded-lg"
                                    placeholder="Detailed description..."
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-2">Icon (SVG or Emoji)</label>
                                <input
                                    type="text"
                                    value={editingService.icon}
                                    onChange={(e) => setEditingService({ ...editingService, icon: e.target.value })}
                                    className="w-full px-4 py-2 border border-slate-300 rounded-lg text-sm font-mono"
                                    placeholder="<svg>...</svg>"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-2">Display Order</label>
                                <input
                                    type="number"
                                    value={editingService.order}
                                    onChange={(e) => setEditingService({ ...editingService, order: parseInt(e.target.value) || 0 })}
                                    className="w-full px-4 py-2 border border-slate-300 rounded-lg"
                                />
                            </div>
                        </div>

                        <div className="space-y-4 bg-slate-50 p-4 rounded-lg border border-slate-200">
                            <div className="flex justify-between items-center mb-2">
                                <label className="block text-sm font-medium text-slate-700">Bullet Points</label>
                                <button type="button" onClick={addBullet} className="text-sky-600 text-sm hover:underline">+ Add Bullet</button>
                            </div>
                            {(editingService.bullets || []).map((bullet, index) => (
                                <div key={index} className="flex gap-2">
                                    <input
                                        type="text"
                                        value={bullet}
                                        onChange={(e) => updateBullet(index, e.target.value)}
                                        className="flex-1 px-3 py-2 border border-slate-300 rounded-lg text-sm"
                                    />
                                    <button type="button" onClick={() => removeBullet(index)} className="text-red-500 text-sm px-2 hover:underline">Remove</button>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="mt-6 flex gap-4">
                        <button onClick={saveService} className="bg-sky-600 text-white px-6 py-2 rounded-lg hover:bg-sky-700">Save</button>
                        <button onClick={() => setEditingService(null)} className="bg-slate-300 text-slate-700 px-6 py-2 rounded-lg hover:bg-slate-400">Cancel</button>
                    </div>
                </div>
            )}

            <div className="space-y-4">
                {services.length === 0 && !editingService && (
                    <div className="text-center py-12 text-slate-500 bg-white rounded-lg border border-slate-200">
                        No services added. Click "Add Service" to get started.
                    </div>
                )}
                {services.map((svc) => (
                    <div key={svc.id} className="bg-white rounded-lg p-6 border border-slate-200 shadow-sm flex items-start justify-between">
                        <div className="flex-1">
                            <h3 className="text-xl font-bold text-slate-900">{svc.title} <span className="text-xs text-slate-400 font-normal ml-2">Order: {svc.order}</span></h3>
                            <p className="text-slate-600 mt-2 text-sm">{svc.description}</p>
                            <ul className="list-disc pl-5 mt-3 text-sm text-slate-500 space-y-1">
                                {(typeof svc.bullets === 'string' ? JSON.parse(svc.bullets) : svc.bullets || []).slice(0, 3).map((b, i) => (
                                    <li key={i}>{b}</li>
                                ))}
                                {(typeof svc.bullets === 'string' ? JSON.parse(svc.bullets) : svc.bullets || []).length > 3 && <li>...</li>}
                            </ul>
                        </div>
                        <div className="flex gap-3 ml-4">
                            <button
                                onClick={() => setEditingService({
                                    ...svc,
                                    bullets: typeof svc.bullets === 'string' ? JSON.parse(svc.bullets) : svc.bullets || []
                                })}
                                className="text-sky-600 hover:underline"
                            >
                                Edit
                            </button>
                            <button onClick={() => deleteService(svc.id)} className="text-red-600 hover:underline">Delete</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
