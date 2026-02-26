'use client';

import { useState, useEffect } from 'react';

export default function ContactAdmin() {
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');

  // Contact Info
  const [contactInfo, setContactInfo] = useState([]);
  const [editingContact, setEditingContact] = useState(null);

  // FAQs
  const [faqs, setFaqs] = useState([]);
  const [editingFaq, setEditingFaq] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [contactRes, faqRes] = await Promise.all([
        fetch('/api/contact'),
        fetch('/api/faqs')
      ]);

      const contactData = await contactRes.json();
      const faqData = await faqRes.json();

      setContactInfo(contactData);
      setFaqs(faqData);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const saveContact = async () => {
    try {
      const url = editingContact.id ? `/api/contact/${editingContact.id}` : '/api/contact';
      const method = editingContact.id ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editingContact)
      });

      if (response.ok) {
        fetchData();
        setEditingContact(null);
        setMessage('Contact info saved successfully!');
        setTimeout(() => setMessage(''), 3000);
      }
    } catch (error) {
      setMessage('Error saving contact info');
    }
  };

  const deleteContact = async (id) => {
    if (!confirm('Are you sure you want to delete this contact info?')) return;

    try {
      await fetch(`/api/contact/${id}`, { method: 'DELETE' });
      fetchData();
      setMessage('Contact info deleted successfully!');
      setTimeout(() => setMessage(''), 3000);
    } catch (error) {
      setMessage('Error deleting contact info');
    }
  };

  const saveFaq = async () => {
    try {
      const url = editingFaq.id ? `/api/faqs/${editingFaq.id}` : '/api/faqs';
      const method = editingFaq.id ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editingFaq)
      });

      if (response.ok) {
        fetchData();
        setEditingFaq(null);
        setMessage('FAQ saved successfully!');
        setTimeout(() => setMessage(''), 3000);
      }
    } catch (error) {
      setMessage('Error saving FAQ');
    }
  };

  const deleteFaq = async (id) => {
    if (!confirm('Are you sure you want to delete this FAQ?')) return;

    try {
      await fetch(`/api/faqs/${id}`, { method: 'DELETE' });
      fetchData();
      setMessage('FAQ deleted successfully!');
      setTimeout(() => setMessage(''), 3000);
    } catch (error) {
      setMessage('Error deleting FAQ');
    }
  };

  const addContentLine = () => {
    const content = editingContact.content || [];
    setEditingContact({
      ...editingContact,
      content: [...content, '']
    });
  };

  const updateContentLine = (index, value) => {
    const content = [...(editingContact.content || [])];
    content[index] = value;
    setEditingContact({ ...editingContact, content });
  };

  const removeContentLine = (index) => {
    const content = [...(editingContact.content || [])];
    content.splice(index, 1);
    setEditingContact({ ...editingContact, content });
  };

  if (loading) {
    return <div className="p-8">Loading...</div>;
  }

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-8">Manage Contact Page</h1>

      {message && (
        <div className="mb-6 bg-green-50 text-green-600 p-4 rounded-lg">
          {message}
        </div>
      )}

      {/* Contact Information Section */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold">Contact Information</h2>
          <button
            onClick={() => setEditingContact({
              type: 'address',
              title: '',
              content: [''],
              icon: '',
              order: contactInfo.length
            })}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
          >
            Add Contact Info
          </button>
        </div>

        {/* Editing Form */}
        {editingContact && (
          <div className="mb-6 p-4 border border-gray-300 rounded-lg bg-gray-50">
            <h3 className="font-semibold mb-4">
              {editingContact.id ? 'Edit Contact Info' : 'New Contact Info'}
            </h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Type
                </label>
                <select
                  value={editingContact.type}
                  onChange={(e) => setEditingContact({ ...editingContact, type: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                >
                  <option value="address">Address</option>
                  <option value="phone">Phone</option>
                  <option value="email">Email</option>
                  <option value="hours">Business Hours</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Title
                </label>
                <input
                  type="text"
                  value={editingContact.title}
                  onChange={(e) => setEditingContact({ ...editingContact, title: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                  placeholder="e.g., Visit Us, Call Us, Email Us"
                />
              </div>

              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Content Lines
                  </label>
                  <button
                    onClick={addContentLine}
                    className="text-blue-600 hover:underline text-sm"
                  >
                    + Add Line
                  </button>
                </div>
                <div className="space-y-2">
                  {(editingContact.content || []).map((line, index) => (
                    <div key={index} className="flex gap-2">
                      <input
                        type="text"
                        value={line}
                        onChange={(e) => updateContentLine(index, e.target.value)}
                        className="flex-1 px-4 py-2 border border-gray-300 rounded-lg"
                        placeholder="Content line..."
                      />
                      <button
                        onClick={() => removeContentLine(index)}
                        className="text-red-600 hover:text-red-700 px-4"
                      >
                        Remove
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Icon (optional)
                </label>
                <input
                  type="text"
                  value={editingContact.icon || ''}
                  onChange={(e) => setEditingContact({ ...editingContact, icon: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                  placeholder="Emoji or icon identifier"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Display Order
                </label>
                <input
                  type="number"
                  value={editingContact.order}
                  onChange={(e) => setEditingContact({ ...editingContact, order: parseInt(e.target.value) })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                />
              </div>

              <div className="flex gap-2">
                <button
                  onClick={saveContact}
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
                >
                  Save
                </button>
                <button
                  onClick={() => setEditingContact(null)}
                  className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-400"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Contact Info List */}
        <div className="space-y-4">
          {contactInfo.map((info) => {
            const content = typeof info.content === 'string'
              ? JSON.parse(info.content)
              : info.content || [];

            return (
              <div key={info.id} className="border border-gray-200 rounded-lg p-4 flex justify-between items-start">
                <div>
                  <h3 className="font-semibold text-lg">
                    {info.icon && `${info.icon} `}{info.title}
                  </h3>
                  <p className="text-sm text-gray-500 mb-2">Type: {info.type}</p>
                  <div className="text-gray-600">
                    {content.map((line, i) => (
                      <div key={i}>{line}</div>
                    ))}
                  </div>
                  <p className="text-sm text-gray-400 mt-2">Order: {info.order}</p>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => setEditingContact({ ...info, content })}
                    className="text-blue-600 hover:underline"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => deleteContact(info.id)}
                    className="text-red-600 hover:underline"
                  >
                    Delete
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* FAQs Section */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold">Frequently Asked Questions</h2>
          <button
            onClick={() => setEditingFaq({
              question: '',
              answer: '',
              order: faqs.length,
              isActive: true
            })}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
          >
            Add FAQ
          </button>
        </div>

        {/* Editing Form */}
        {editingFaq && (
          <div className="mb-6 p-4 border border-gray-300 rounded-lg bg-gray-50">
            <h3 className="font-semibold mb-4">
              {editingFaq.id ? 'Edit FAQ' : 'New FAQ'}
            </h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Question
                </label>
                <input
                  type="text"
                  value={editingFaq.question}
                  onChange={(e) => setEditingFaq({ ...editingFaq, question: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                  placeholder="What is your question?"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Answer
                </label>
                <textarea
                  value={editingFaq.answer}
                  onChange={(e) => setEditingFaq({ ...editingFaq, answer: e.target.value })}
                  rows={4}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                  placeholder="Provide a detailed answer..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Display Order
                </label>
                <input
                  type="number"
                  value={editingFaq.order}
                  onChange={(e) => setEditingFaq({ ...editingFaq, order: parseInt(e.target.value) })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                />
              </div>

              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="isActive"
                  checked={editingFaq.isActive}
                  onChange={(e) => setEditingFaq({ ...editingFaq, isActive: e.target.checked })}
                  className="w-4 h-4 text-blue-600 rounded"
                />
                <label htmlFor="isActive" className="ml-2 text-sm text-gray-700">
                  Active (visible on website)
                </label>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={saveFaq}
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
                >
                  Save
                </button>
                <button
                  onClick={() => setEditingFaq(null)}
                  className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-400"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}

        {/* FAQs List */}
        <div className="space-y-4">
          {faqs.map((faq) => (
            <div key={faq.id} className="border border-gray-200 rounded-lg p-4 flex justify-between items-start">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <h3 className="font-semibold text-lg">{faq.question}</h3>
                  {!faq.isActive && (
                    <span className="px-2 py-1 bg-gray-200 text-gray-600 text-xs rounded">
                      Inactive
                    </span>
                  )}
                </div>
                <p className="text-gray-600">{faq.answer}</p>
                <p className="text-sm text-gray-400 mt-2">Order: {faq.order}</p>
              </div>
              <div className="flex gap-2 ml-4">
                <button
                  onClick={() => setEditingFaq(faq)}
                  className="text-blue-600 hover:underline"
                >
                  Edit
                </button>
                <button
                  onClick={() => deleteFaq(faq.id)}
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
