'use client';
import { useState, useEffect } from 'react';
import { Publication } from '@/lib/publications';

interface PublicationFormData {
  title: string;
  authors: string;
  meta: string;
  image: string;
  link: string;
  tags: string[];
}

interface PublicationManagerProps {
  onSave?: () => void;
}

export default function PublicationManager({ onSave }: PublicationManagerProps) {
  const [publications, setPublications] = useState<Publication[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [editingPublication, setEditingPublication] = useState<Publication | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [saveMessage, setSaveMessage] = useState('');
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);

  const [formData, setFormData] = useState<PublicationFormData>({
    title: '',
    authors: '',
    meta: '',
    image: '',
    link: '',
    tags: []
  });

  useEffect(() => {
    fetchPublications();
  }, []);

  const fetchPublications = async () => {
    try {
      const response = await fetch('/api/publications');
      if (response.ok) {
        const data = await response.json();
        setPublications(data);
      }
    } catch (error) {
      console.error('Error fetching publications:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddNew = () => {
    setFormData({
      title: '',
      authors: '',
      meta: '',
      image: '',
      link: '',
      tags: []
    });
    setEditingPublication(null);
    setIsEditing(false);
    setShowForm(true);
  };

  const handleEdit = (publication: Publication) => {
    setFormData({
      title: publication.title,
      authors: publication.authors,
      meta: publication.meta,
      image: publication.image,
      link: publication.link,
      tags: publication.tags
    });
    setEditingPublication(publication);
    setIsEditing(true);
    setShowForm(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaveMessage('');

    try {
      const method = isEditing ? 'PUT' : 'POST';
      const body = isEditing 
        ? { slug: editingPublication?.slug, ...formData }
        : formData;

      const response = await fetch('/api/publications', {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      });

      if (response.ok) {
        setSaveMessage(`✅ Publication ${isEditing ? 'updated' : 'added'} successfully!`);
        setShowForm(false);
        fetchPublications();
        onSave?.();
      } else {
        const error = await response.json();
        setSaveMessage(`❌ ${error.error || 'Failed to save publication'}`);
      }
    } catch (error) {
      console.error('Error saving publication:', error);
      setSaveMessage('❌ Error saving publication');
    }

    setTimeout(() => setSaveMessage(''), 3000);
  };

  const handleDelete = async (slug: string) => {
    try {
      const response = await fetch('/api/publications', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ slug }),
      });

      if (response.ok) {
        setSaveMessage('✅ Publication deleted successfully!');
        fetchPublications();
        onSave?.();
      } else {
        setSaveMessage('❌ Failed to delete publication');
      }
    } catch (error) {
      console.error('Error deleting publication:', error);
      setSaveMessage('❌ Error deleting publication');
    }

    setDeleteConfirm(null);
    setTimeout(() => setSaveMessage(''), 3000);
  };

  const handleTagsChange = (tagsString: string) => {
    const tags = tagsString.split(',').map(tag => tag.trim()).filter(tag => tag.length > 0);
    setFormData(prev => ({ ...prev, tags }));
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-carolina-blue"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {saveMessage && (
        <div className={`p-4 rounded-lg ${
          saveMessage.includes('✅') ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'
        }`}>
          {saveMessage}
        </div>
      )}

      {/* Header */}
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold text-gray-900">Publications ({publications.length})</h3>
        <button
          onClick={handleAddNew}
          className="bg-carolina-blue hover:bg-unc-navy text-white px-4 py-2 rounded-lg font-medium transition-colors"
        >
          Add Publication
        </button>
      </div>

      {/* Add/Edit Form */}
      {showForm && (
        <div className="bg-white p-6 rounded-lg shadow border">
          <div className="flex justify-between items-center mb-4">
            <h4 className="text-lg font-semibold text-gray-900">
              {isEditing ? 'Edit Publication' : 'Add New Publication'}
            </h4>
            <button
              onClick={() => setShowForm(false)}
              className="text-gray-500 hover:text-gray-700"
            >
              ✕
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Title *
              </label>
              <input
                type="text"
                required
                value={formData.title}
                onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-carolina-blue focus:border-carolina-blue"
                placeholder="Publication title"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Authors *
              </label>
              <textarea
                required
                rows={2}
                value={formData.authors}
                onChange={(e) => setFormData(prev => ({ ...prev, authors: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-carolina-blue focus:border-carolina-blue"
                placeholder="Author names separated by commas"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Publication Details *
              </label>
              <input
                type="text"
                required
                value={formData.meta}
                onChange={(e) => setFormData(prev => ({ ...prev, meta: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-carolina-blue focus:border-carolina-blue"
                placeholder="e.g., SIGGRAPH 2024, Nature Communications 2025"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Image URL
              </label>
              <input
                type="url"
                value={formData.image}
                onChange={(e) => setFormData(prev => ({ ...prev, image: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-carolina-blue focus:border-carolina-blue"
                placeholder="https://example.com/image.jpg"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Publication Link
              </label>
              <input
                type="url"
                value={formData.link}
                onChange={(e) => setFormData(prev => ({ ...prev, link: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-carolina-blue focus:border-carolina-blue"
                placeholder="https://example.com/paper.pdf"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Tags
              </label>
              <input
                type="text"
                value={formData.tags.join(', ')}
                onChange={(e) => handleTagsChange(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-carolina-blue focus:border-carolina-blue"
                placeholder="Conference, SIGGRAPH, 2024"
              />
              <p className="text-sm text-gray-500 mt-1">Separate tags with commas</p>
            </div>

            <div className="flex gap-3">
              <button
                type="submit"
                className="bg-carolina-blue hover:bg-unc-navy text-white px-6 py-2 rounded-lg font-medium transition-colors"
              >
                {isEditing ? 'Update Publication' : 'Add Publication'}
              </button>
              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="bg-gray-300 hover:bg-gray-400 text-gray-700 px-6 py-2 rounded-lg font-medium transition-colors"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Publications List */}
      <div className="bg-white rounded-lg shadow">
        {publications.length === 0 ? (
          <div className="p-8 text-center text-gray-500">
            <p>No publications found.</p>
            <button
              onClick={handleAddNew}
              className="mt-2 text-carolina-blue hover:text-unc-navy font-medium"
            >
              Add your first publication
            </button>
          </div>
        ) : (
          <div className="divide-y">
            {publications.map((publication) => (
              <div key={publication.slug} className="p-6">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-900 mb-2">
                      {publication.title}
                    </h4>
                    <p className="text-sm text-gray-600 mb-1">
                      <strong>Authors:</strong> {publication.authors}
                    </p>
                    <p className="text-sm text-gray-600 mb-2">
                      <strong>Published:</strong> {publication.meta}
                    </p>
                    {publication.tags.length > 0 && (
                      <div className="flex flex-wrap gap-1 mb-3">
                        {publication.tags.map((tag, index) => (
                          <span
                            key={index}
                            className="px-2 py-1 bg-carolina-blue/10 text-carolina-blue text-xs rounded-full"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                    {publication.link && (
                      <a
                        href={publication.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-carolina-blue hover:text-unc-navy text-sm font-medium"
                      >
                        View Publication →
                      </a>
                    )}
                  </div>
                  <div className="flex gap-2 ml-4">
                    <button
                      onClick={() => handleEdit(publication)}
                      className="text-blue-600 hover:text-blue-800 px-3 py-1 text-sm font-medium"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => setDeleteConfirm(publication.slug)}
                      className="text-red-600 hover:text-red-800 px-3 py-1 text-sm font-medium"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Delete Confirmation Modal */}
      {deleteConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-xl max-w-md w-full mx-4">
            <h4 className="text-lg font-semibold text-gray-900 mb-4">
              Confirm Deletion
            </h4>
            <p className="text-gray-600 mb-6">
              Are you sure you want to delete this publication? This action cannot be undone.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => handleDelete(deleteConfirm)}
                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
              >
                Delete
              </button>
              <button
                onClick={() => setDeleteConfirm(null)}
                className="bg-gray-300 hover:bg-gray-400 text-gray-700 px-4 py-2 rounded-lg font-medium transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
