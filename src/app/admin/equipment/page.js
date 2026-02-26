'use client';

import { useState, useEffect } from 'react';

export default function EquipmentAdmin() {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [message, setMessage] = useState('');

    const [editingCategory, setEditingCategory] = useState(null);
    const [editingProduct, setEditingProduct] = useState(null);

    useEffect(() => {
        fetchCategories();
    }, []);

    const fetchCategories = async () => {
        try {
            const response = await fetch('/api/equipment/categories');
            const data = await response.json();
            setCategories(data || []);
        } catch (error) {
            console.error('Error fetching categories:', error);
        } finally {
            setLoading(false);
        }
    };

    const saveCategory = async () => {
        try {
            const url = editingCategory.id ? `/api/equipment/categories/${editingCategory.id}` : '/api/equipment/categories';
            const method = editingCategory.id ? 'PUT' : 'POST';

            const response = await fetch(url, {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(editingCategory)
            });

            if (response.ok) {
                fetchCategories();
                setEditingCategory(null);
                setMessage('Category saved successfully!');
                setTimeout(() => setMessage(''), 3000);
            }
        } catch (error) {
            setMessage('Error saving category');
        }
    };

    const deleteCategory = async (id) => {
        if (!confirm('Are you sure you want to delete this category? All its products will be deleted as well.')) return;

        try {
            await fetch(`/api/equipment/categories/${id}`, { method: 'DELETE' });
            fetchCategories();
            setMessage('Category deleted successfully!');
            setTimeout(() => setMessage(''), 3000);
        } catch (error) {
            setMessage('Error deleting category');
        }
    };

    const saveProduct = async () => {
        try {
            const url = editingProduct.id ? `/api/equipment/products/${editingProduct.id}` : '/api/equipment/products';
            const method = editingProduct.id ? 'PUT' : 'POST';

            const response = await fetch(url, {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(editingProduct)
            });

            if (response.ok) {
                fetchCategories();
                setEditingProduct(null);
                setMessage('Product saved successfully!');
                setTimeout(() => setMessage(''), 3000);
            }
        } catch (error) {
            setMessage('Error saving product');
        }
    };

    const deleteProduct = async (id) => {
        if (!confirm('Are you sure you want to delete this product?')) return;

        try {
            await fetch(`/api/equipment/products/${id}`, { method: 'DELETE' });
            fetchCategories();
            setMessage('Product deleted successfully!');
            setTimeout(() => setMessage(''), 3000);
        } catch (error) {
            setMessage('Error deleting product');
        }
    };

    const addFeature = () => {
        const features = editingProduct.features || [];
        setEditingProduct({ ...editingProduct, features: [...features, ''] });
    };

    const updateFeature = (index, value) => {
        const features = [...(editingProduct.features || [])];
        features[index] = value;
        setEditingProduct({ ...editingProduct, features });
    };

    const removeFeature = (index) => {
        const features = [...(editingProduct.features || [])];
        features.splice(index, 1);
        setEditingProduct({ ...editingProduct, features });
    };

    if (loading) return <div className="p-8">Loading...</div>;

    return (
        <div className="p-8">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold">Manage Equipment</h1>
                <button
                    onClick={() => setEditingCategory({ name: '', description: '', order: categories.length })}
                    className="bg-sky-600 text-white px-6 py-2 rounded-lg hover:bg-sky-700"
                >
                    Add Category
                </button>
            </div>

            {message && (
                <div className="mb-6 bg-green-50 text-green-600 p-4 rounded-lg">
                    {message}
                </div>
            )}

            {/* Editing Category */}
            {editingCategory && (
                <div className="bg-white rounded-lg shadow-lg p-6 mb-8 border border-slate-200">
                    <h2 className="text-2xl font-semibold mb-6">{editingCategory.id ? 'Edit Category' : 'New Category'}</h2>
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-2">Category Name *</label>
                            <input type="text" value={editingCategory.name} onChange={(e) => setEditingCategory({ ...editingCategory, name: e.target.value })} className="w-full px-4 py-2 border border-slate-300 rounded-lg" placeholder="Imaging Equipment" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-2">Description</label>
                            <textarea value={editingCategory.description} onChange={(e) => setEditingCategory({ ...editingCategory, description: e.target.value })} rows={2} className="w-full px-4 py-2 border border-slate-300 rounded-lg" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-2">Order</label>
                            <input type="number" value={editingCategory.order} onChange={(e) => setEditingCategory({ ...editingCategory, order: parseInt(e.target.value) || 0 })} className="w-full px-4 py-2 border border-slate-300 rounded-lg" />
                        </div>
                    </div>
                    <div className="mt-6 flex gap-4">
                        <button onClick={saveCategory} className="bg-sky-600 text-white px-6 py-2 rounded-lg hover:bg-sky-700">Save Category</button>
                        <button onClick={() => setEditingCategory(null)} className="bg-slate-300 text-slate-700 px-6 py-2 rounded-lg hover:bg-slate-400">Cancel</button>
                    </div>
                </div>
            )}

            {/* Editing Product */}
            {editingProduct && (
                <div className="bg-white rounded-lg shadow-lg p-6 mb-8 border-2 border-sky-400">
                    <h2 className="text-2xl font-semibold mb-6 text-sky-700">{editingProduct.id ? 'Edit Product' : 'New Product'}</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-2">Category *</label>
                                <select value={editingProduct.categoryId} onChange={(e) => setEditingProduct({ ...editingProduct, categoryId: e.target.value })} className="w-full px-4 py-2 border border-slate-300 rounded-lg bg-white">
                                    <option value="">Select Category...</option>
                                    {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-2">Product Name *</label>
                                <input type="text" value={editingProduct.name} onChange={(e) => setEditingProduct({ ...editingProduct, name: e.target.value })} className="w-full px-4 py-2 border border-slate-300 rounded-lg" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-2">Description *</label>
                                <textarea value={editingProduct.description} onChange={(e) => setEditingProduct({ ...editingProduct, description: e.target.value })} rows={4} className="w-full px-4 py-2 border border-slate-300 rounded-lg" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-2">Order within category</label>
                                <input type="number" value={editingProduct.order} onChange={(e) => setEditingProduct({ ...editingProduct, order: parseInt(e.target.value) || 0 })} className="w-full px-4 py-2 border border-slate-300 rounded-lg" />
                            </div>
                        </div>

                        <div className="bg-slate-50 p-4 rounded-lg border border-slate-200">
                            <div className="flex justify-between items-center mb-4">
                                <label className="block text-sm font-medium text-slate-700">Features</label>
                                <button type="button" onClick={addFeature} className="text-sky-600 text-sm hover:underline">+ Add Feature</button>
                            </div>
                            <div className="space-y-2">
                                {(editingProduct.features || []).map((feature, index) => (
                                    <div key={index} className="flex gap-2">
                                        <input type="text" value={feature} onChange={(e) => updateFeature(index, e.target.value)} className="flex-1 px-3 py-2 border border-slate-300 rounded-lg text-sm" />
                                        <button type="button" onClick={() => removeFeature(index)} className="text-red-500 text-sm px-2 hover:underline">Remove</button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                    <div className="mt-6 flex gap-4">
                        <button onClick={saveProduct} disabled={!editingProduct.categoryId} className="bg-sky-600 text-white px-6 py-2 rounded-lg hover:bg-sky-700 disabled:opacity-50">Save Product</button>
                        <button onClick={() => setEditingProduct(null)} className="bg-slate-300 text-slate-700 px-6 py-2 rounded-lg hover:bg-slate-400">Cancel</button>
                    </div>
                </div>
            )}

            <div className="space-y-8">
                {categories.length === 0 && !editingCategory && (
                    <div className="text-center py-12 text-slate-500 bg-white rounded-lg border border-slate-200">
                        No equipment categories added yet.
                    </div>
                )}
                {categories.map((cat) => (
                    <div key={cat.id} className="bg-slate-50 rounded-lg border border-slate-200 overflow-hidden">
                        <div className="bg-white p-6 border-b border-slate-200 flex justify-between items-start">
                            <div>
                                <h2 className="text-xl font-bold text-slate-900">{cat.name}</h2>
                                <p className="text-slate-500 text-sm mt-1">{cat.description}</p>
                            </div>
                            <div className="flex gap-3">
                                <button
                                    onClick={() => setEditingProduct({ categoryId: cat.id, name: '', description: '', features: [], order: cat.products?.length || 0 })}
                                    className="bg-sky-100 text-sky-700 px-3 py-1 text-sm rounded hover:bg-sky-200 font-semibold"
                                >
                                    + Add Product
                                </button>
                                <button onClick={() => setEditingCategory(cat)} className="text-sky-600 hover:underline text-sm font-medium">Edit Category</button>
                                <button onClick={() => deleteCategory(cat.id)} className="text-red-600 hover:underline text-sm font-medium">Delete</button>
                            </div>
                        </div>

                        <div className="p-6">
                            {(!cat.products || cat.products.length === 0) ? (
                                <div className="text-sm text-slate-500 italic">No products in this category yet.</div>
                            ) : (
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {cat.products.map(prod => (
                                        <div key={prod.id} className="bg-white border border-slate-200 rounded-lg p-4 flex flex-col">
                                            <div className="flex justify-between items-start mb-2">
                                                <h4 className="font-bold text-slate-800">{prod.name}</h4>
                                                <div className="flex gap-2">
                                                    <button
                                                        onClick={() => setEditingProduct({
                                                            ...prod,
                                                            features: typeof prod.features === 'string' ? JSON.parse(prod.features) : prod.features || []
                                                        })}
                                                        className="text-sky-600 hover:underline text-xs"
                                                    >Edit</button>
                                                    <button onClick={() => deleteProduct(prod.id)} className="text-red-600 hover:underline text-xs">Delete</button>
                                                </div>
                                            </div>
                                            <p className="text-xs text-slate-500 mb-3">{prod.description}</p>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
